import React, { useEffect, useRef, useState } from 'react'
import { Toast, Tooltip } from 'bootstrap';

import Contacto from '../model/contacto'

//Services
import CONTACTOS_ENDPOINTS from '../services/contactListService';

//Components
import ToastMessage from './ToastMessage';

function ContactDetailsForm({ detalleContacto, getDetalleContacto, cargarContactosApi }) {

    const [registro, setRegistro] = useState(new Contacto("", "", "", "", ""));
    const [showSpiner, setShowSpiner] = useState(false);
    const [toastMessage, setToastMessage] = useState(["afkhsañsk", "dsahfkasjh"]);
    const addContact = useRef(null);

    const actualizaRegistro = (campo) => {
        setRegistro({ ...registro, ...campo });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registro.id === "0") {
            let response = await CONTACTOS_ENDPOINTS.CREAR(registro, setShowSpiner);
            if (response.status >= 200 && response.status < 203) {
                setToastMessage(["Contacto Creado", "El contacto fue agregado correctamente"]);
                showMessage();
                cargarContactosApi();
                actualizaRegistro({ id: response.data.id });
            } else {
                setToastMessage(["Error", "No se pudo guardar el contacto, intente de nuevo"]);
                showMessage();
            }
        } else {
            let response = await CONTACTOS_ENDPOINTS.MODIFICAR(registro, setShowSpiner);
            if (response.status >= 200 && response.status < 203) {
                setToastMessage(["Contacto Modificado", "Cambios guardados correctamente"]);
                showMessage();
                cargarContactosApi();
            } else {
                setToastMessage(["Error", "No se pudo guardar el contacto, intente de nuevo"]);
                showMessage();
            }
        }
    }

    const eliminarContacto = async () => {
        
        let response = await CONTACTOS_ENDPOINTS.ELIMINAR(registro, setShowSpiner);
            if (response.status >= 200 && response.status < 203) {
                setToastMessage(["Contacto Eliminado", "El contacto ha sido eliminado"]);
                showMessage();
                setRegistro(new Contacto("", "", "", "", ""));
                cargarContactosApi();
            } else {
                setToastMessage(["Error", "No se pudo eliminar el contacto, intente de nuevo"]);
                showMessage();
            }
    };

    const agregarCotactoButton=()=>{
        let nuevoContacto = new Contacto("", "", "", "", "");
        getDetalleContacto(nuevoContacto);
        setRegistro(nuevoContacto);
    };
    
    const showMessage=()=> {
        var toastEl = document.getElementById('toastMessage');
        var toast = new Toast(toastEl);
        toast.show();
    }

    useEffect(() => {
        setRegistro({ ...detalleContacto });
        // eslint-disable-next-line
        const tooltip6 = new Tooltip(addContact.current, {
            title: "Agregar Contacto",
        });
    }, [detalleContacto]);

    return (
        <div className="col-md-6 d-flex align-items-stretch contact-detail-container">
            <div className="contact-wrap w-100 p-md-5 p-4">
                <h3 className="mb-4"> Información de Contato
                    <button className="btn btn-guardar ms-5"
                        ref={addContact}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top" 
                        type="button"
                        title='addContact'
                        onClick={ agregarCotactoButton }
                    >
                        <i className="bi bi-person-plus-fill"></i>
                    </button>
                </h3>
                <form id="contactListForm" name="contactListForm" onSubmit={(e) => { handleSubmit(e) }}>
                    <ToastMessage toastMessage={toastMessage} />
                    <div className="row">
                        <div className="col-md-6 p-2">
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="nombre-addon1"><i className="bi bi-file-earmark-person"></i></span>
                                <input type="text"
                                    className="form-control"
                                    name="nombre" 
                                    id="nombre"
                                    placeholder="Nombres"
                                    maxLength={40}
                                    value={registro.nombre}
                                    onChange={(e) => { actualizaRegistro({ nombre: e.target.value })}}
                                    onBlur={(e) => { actualizaRegistro({ nombre: e.target.value.trim() })}}
                                    required />
                            </div>
                        </div>
                        <div className="col-md-6 p-2">
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="apellido-addon1"><i className="bi bi-file-earmark-person"></i></span>
                                <input type="text"
                                    className="form-control"
                                    name="apellido"
                                    id="apellido"
                                    placeholder="Apellidos"
                                    maxLength={40}
                                    value={registro.apellido}
                                    onChange={(e) => { actualizaRegistro({ apellido: e.target.value })}}
                                    onBlur={(e) => { actualizaRegistro({ apellido: e.target.value.trim() })}}
                                    required />
                            </div>
                        </div>
                        <div className="col-md-12 p-2">
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="telefono-addon1"><i className="bi bi-phone"></i></span>
                                <input type="text"
                                    className="form-control"
                                    data-mdb-input-mask="999-999-9999"
                                    name="telefono"
                                    id="telefono"
                                    placeholder="Teléfono"
                                    maxLength={20}
                                    value={registro.telefono}
                                    onChange={(e) => { actualizaRegistro({ telefono: e.target.value })}}
                                    onBlur={(e) => { actualizaRegistro({ telefono: e.target.value.trim() })}}
                                    required />
                            </div>
                        </div>
                        <div className="col-md-12 p-2 mb-2">
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="direccion-addon1"><i className="bi bi-geo-alt"></i></span>
                                <input type="text"
                                    className="form-control"
                                    name="direccion"
                                    id="direccion"
                                    placeholder="Dirección"
                                    value={registro.direccion}
                                    onChange={(e) => { actualizaRegistro({ direccion: e.target.value }) }}
                                    onBlur={(e) => { actualizaRegistro({ direccion: e.target.value.trim() }) }}
                                    required />
                            </div>
                        </div>
                        <div className="col-md-12 p-2 mb-2">
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="emailc"><i className="bi bi-envelope-at"></i></span>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={registro.email}
                                    onChange={(e) => { actualizaRegistro({ email: e.target.value }) }} />
                            </div>
                        </div>
                        <div className="col-md-12 p-2 mb-2">
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="ecomentarios"><i className="bi bi-blockquote-left"></i></span>
                                <textarea type="text"
                                    className="form-control"
                                    name="comentarios"
                                    id="comentarios"
                                    placeholder="Comentarios"
                                    value={registro.comentarios}
                                    onChange={(e) => { actualizaRegistro({ comentarios: e.target.value }) }} />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group align">
                                {registro.id === "0" ? (
                                    <button className="btn btn-guardar me-2" type="submit" disabled={showSpiner === "agregar"}>
                                        {showSpiner === "agregar" ?
                                            (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                                            :
                                            "Agregar contacto"}
                                    </button>
                                ) : (<>
                                    <button className="btn btn-guardar me-2" type="submit" disabled={showSpiner === "modificar"}>
                                        {showSpiner === "modificar" ?
                                            (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                                            :
                                            "Guardar contacto"}
                                    </button>
                                    <button className="btn btn-warning me-2"
                                        type="button"
                                        disabled={showSpiner === "eliminar"}
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirmationModal" >
                                        {showSpiner === "eliminar" ?
                                            (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                                            :
                                            "Eliminar contacto"}
                                    </button>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="modal fade" id="confirmationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">¿Eliminar Contacto?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Confirma que desea eliminar el contacto?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={eliminarContacto}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContactDetailsForm