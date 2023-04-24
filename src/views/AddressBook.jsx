import React, { useEffect, useRef, useState } from 'react'
import Pusher from 'pusher-js';

import Contacto from '../model/contacto'

//Services
import CONTACTOS_ENDPOINTS from '../services/contactListService'
import CONTACTOS_LOCALSTORAGE from '../services/localStorageService'

//Components
import ListaContactos from '../model/listaContactos'
import ContactListFilterBox from '../components/ContactListFilterBox';
import ContactDetailsForm from '../components/ContactDetailsForm';


function AddressBook() {

    // const pusher = new Pusher('cec9aeaaf62c27726922', {
    //     cluster: 'us2',
    //     channelAuthorization: {
    //         endpoint: 'wss://wstest.technisupport.co/app/testws'
    //       },
    //   });
    //   var channel = pusher.subscribe('address-book');
    //   channel.bind('address-book', function(data) {
    //     console.log("pusher",JSON.stringify(data));
    //   });

    //   console.log(pusher)
    //   console.log("cha",channel.event)

    const listenWebsocket = async () => {
        
        const ws = await new WebSocket('wss://wstest.technisupport.co/app/testws');

        ws.onopen =  () => {
            console.log('Conectado al servidor');
            const message = {
                event: 'pusher:subscribe',
                data: {
                    channel: 'address-book'
                }
            };
             ws.send(JSON.stringify(message));
        };
        ws.onmessage = (event) => {
            console.log('Recibido:', event);
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.channel === 'address-book' && data.event !=="pusher_internal:subscription_succeeded") {
                console.log('Nuevo mensaje:', data);
                contactosRecibidos.current.push(JSON.parse(data.data));
                setTimeout(() => {
                    saveWbsocketContact();    
                }, 200);
            }
            return data;
        };
        ws.onerror = (error)=>{}
    }

    




    const [listaContactos, setListaContactos] = useState(new ListaContactos([]));
    const [detalleContacto, setDetalleContacto] = useState(new Contacto("", "", "", ""));
    const [contactoSocket, setContactoSocket] = useState(false);
    const contactosRecibidos = useRef([])

    const getDetalleContacto = (contacto) => {
        setDetalleContacto("");
        setDetalleContacto(contacto);
        console.log(detalleContacto);
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

    const saveWbsocketContact = ()=>{
        contactosRecibidos.current.map(async (data)=>{
            console.log("save",data);
        if (!listaContactos.emailExists(data.email)){
            let newContact = new Contacto("","","","","");
            newContact.nombre = data.name.split(" ").length>3 ? data.name.split(" ")[0] + " " + data.name.split(" ")[1] :data.name.split(" ")[0];
            newContact.apellido = data.name.replace(newContact.nombre, '');
            newContact.telefono = data.phone;
            newContact.email = data.email;
            newContact.comentarios = data.message;
            let response = await CONTACTOS_ENDPOINTS.CREAR(newContact);
            if (response.status >= 200 && response.status < 203) {
                console.log(response)
                cargarContactosApi();
                setContactoSocket(true);
                let timer = setTimeout(() => {
                    setContactoSocket(false);
                }, 1500);
            } else {
                console.log(response);
            }
        }
        });
        contactosRecibidos.current = [];
    }

    useEffect(() => {
        cargarContactosLocal();
        cargarContactosApi();
        listenWebsocket();

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