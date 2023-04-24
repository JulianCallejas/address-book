import React, { useEffect, useRef, useState } from 'react'

import Contacto from '../model/contacto'

//Services
import CONTACTOS_ENDPOINTS from '../services/contactListService'
import CONTACTOS_LOCALSTORAGE from '../services/localStorageService'

//Components
import ListaContactos from '../model/listaContactos'
import ContactListFilterBox from '../components/ContactListFilterBox';
import ContactDetailsForm from '../components/ContactDetailsForm';


function AddressBook() {

    const [listaContactos, setListaContactos] = useState(new ListaContactos([]));
    const [detalleContacto, setDetalleContacto] = useState(new Contacto("", "", "", ""));
    const [contactoSocket, setContactoSocket] = useState(false);
    const contactosRecibidos = useRef([]);

    const getDetalleContacto = (contacto) => {
        setDetalleContacto("");
        setDetalleContacto(contacto);
    }

    const cargarContactosLocal = async () => {
        let data = await CONTACTOS_LOCALSTORAGE.LOAD();
        return data;
    }

    const cargarContactosApi = async () => {
        const { data } = await CONTACTOS_ENDPOINTS.LISTAR();
        setListaContactos(new ListaContactos(data));
        CONTACTOS_LOCALSTORAGE.SAVE(new ListaContactos(data).contactos);
    }

    const listenWebsocket = async () => {
        const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
        const ws = await new WebSocket(SOCKET_URL);
        ws.onopen = () => {
            console.log('Conectado al servidor');
            console.log(ws);
            const message = {
                event: 'pusher:subscribe',
                data: {
                    channel: 'address-book'
                }
            };
            ws.send(JSON.stringify(message));
        };
        var activityTimer="";
        var msgCount = 0;
        ws.onmessage = (event) => {
            if (activityTimer!=="") {
                clearTimeout(activityTimer);
            }
            activityTimer = setTimeout(function () {
                ws.send('pusher:ping', {})
                activityTimer = setTimeout(function () {
                    ws.close();
                }, 20000)
            }, 50000);
            console.log('Mensaje recibido:', event);
            const data = JSON.parse(event.data);
            if (data.channel === 'address-book' && data.event !== "pusher_internal:subscription_succeeded") {
                contactosRecibidos.current.push(JSON.parse(data.data));
                console.log('Nuevo mensaje:', JSON.parse(data.data));
                if (msgCount%2===0 ){
                setTimeout(() => {
                    saveWbsocketContact();
                }, 800);
            }else{
                saveWbsocketContact();
                }
            }
            return data;
        };
        ws.onerror = (error) => { }
        ws.onclose = () => {console.log("Conexion cerrada")}
    }

    const saveWbsocketContact = () => {
        contactosRecibidos.current.map((data) => {
            if (!listaContactos.emailExists(data.email)) {
                let newContact = new Contacto("", "", "", "", "");
                newContact.nombre = data.name.split(" ").length > 3 ? data.name.split(" ")[0] + " " + data.name.split(" ")[1] : data.name.split(" ")[0];
                newContact.apellido = data.name.replace(newContact.nombre, '');
                newContact.telefono = data.phone;
                newContact.email = data.email;
                newContact.comentarios = data.message;
                CONTACTOS_ENDPOINTS.CREAR(newContact).then(response => {
                    if (response.status >= 200 && response.status < 203) {
                        cargarContactosApi();
                        setContactoSocket(true);
                        setTimeout(() => {
                            setContactoSocket(false);
                        }, 1500);
                    } else {
                        console.log(response);
                    }
                });
            }
            return true;
        });
        contactosRecibidos.current = [];
    }

    useEffect(() => {
        cargarContactosLocal();
        cargarContactosApi();
        listenWebsocket();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='w-100 text-center'>
            <h2 className='mb-1 mt-5'><i className="bi bi-person-vcard"></i> Address-Book</h2>
            <div className='contact-container d-flex align-items-center'>
                <div className="row justify-content-center w-100 ">
                    <div className="col-lg-10">
                        <div className="row">
                            <ContactListFilterBox listaContactos={listaContactos.getListaContactosSortByName()}
                                getDetalleContacto={getDetalleContacto} />
                            <ContactDetailsForm cargarContactosApi={cargarContactosApi} getDetalleContacto={getDetalleContacto} detalleContacto={detalleContacto} />
                        </div>
                    </div>
                </div>
            </div>
            {contactoSocket && (<div id="socketMessage" className="socket-message-container">
                <p>Contacto recibido...</p>
            </div>)}
        </div>
    )
}

export default AddressBook