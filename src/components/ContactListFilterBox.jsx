import React, { useEffect, useState } from 'react'


function ContactListFilterBox({ listaContactos, getDetalleContacto }) {
    
    const [contactos, setContactos] = useState({contactos:[]});
    const [filtro, setFiltro] = useState('');

    const mostrarDetalleContacto =(contacto)=>{
        getDetalleContacto(contacto);
    }

    useEffect(() => {
        setContactos(listaContactos);
    }, [listaContactos]);

    const contactosFiltrados = () => {
        if (contactos && contactos.contactos.length > 0) {
            if (filtro) {
                let contactosFil = contactos.getListaContactosFilter(filtro);
                return (
                    <>
                        {contactosFil.map((contacto) => {
                            return (
                                <div className="contact-list-name text-start lh-1 pb-3 ps-3" key={contacto.id + '-' + contacto.nombre}
                                onClick={()=>mostrarDetalleContacto(contacto) }
                                >
                                    <p > {contacto.nombre} {contacto.apellido}</p>
                                    <p className='border-bottom border-light border-opacity-25'><i className="bi bi-phone "></i> {contacto.telefono}</p>
                                </div>
                            )
                        })}
                    </>
                )
            } else {
                return (
                    <>
                        {contactos.contactos.map((contacto) => {
                            return (
                                <div className="contact-list-name text-start lh-1 pb-3 ps-3" key={contacto.id + '-' + contacto.nombre}
                                onClick={()=>mostrarDetalleContacto(contacto) }
                                >
                                    <p > {contacto.nombre} {contacto.apellido}</p>
                                    <p className='border-bottom border-light border-opacity-25'><i className="bi bi-phone "></i> {contacto.telefono}</p>
                                </div>
                            )
                        })}
                    </>
                )
            }
        }else{
            return(
                <div className='text-center'>
                <p >Lista de contactos vacia</p>
                </div>
            )
        }
    }
    
    return (
        <div className="col-md-5 d-flex text-light">
            <div className="w-100 pt-3 ps-4 pe-3 rounded-start-5 overflow-auto contact-list-container">
                <h4 className="mb-4 mt-md-4 border-bottom text-center">Lista de Contactos </h4>
                <input className="form-control mb-3"
                    type="search"
                    placeholder="Buscar contacto"
                    aria-label="Search"
                    defaultValue={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                {contactosFiltrados()}
            </div>
        </div>
    )
}

export default ContactListFilterBox