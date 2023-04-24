import React, { useEffect, useState } from 'react'
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
            if (data.channel === 'address-book') {
                console.log('Nuevo mensaje:', data);
            }
            return data;
        };
        ws.onerror = (error)=>{}

    }





    const [listaContactos, setListaContactos] = useState(new ListaContactos([]));
    const [detalleContacto, setDetalleContacto] = useState(new Contacto("", "", "", ""));

    const getDetalleContacto = (contacto) => {
        setDetalleContacto("");
        setDetalleContacto(contacto);
        console.log(detalleContacto);
    }

    const cargarContactosLocal = async () => {
        let data = await CONTACTOS_LOCALSTORAGE.LOAD();
    }

    const cargarContactosApi = async () => {
        const { data } = await CONTACTOS_ENDPOINTS.LISTAR();
        setListaContactos(new ListaContactos(data));
        CONTACTOS_LOCALSTORAGE.SAVE(new ListaContactos(data).contactos);
    }

    useEffect(() => {
        cargarContactosLocal();
        cargarContactosApi();

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
        </div>
    )
}

export default AddressBook