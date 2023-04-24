import Contacto from './contacto'

export default class ListaContactos {
    contactos

    constructor(lista) {
        this.contactos = [];
        lista.map((contacto) => {
            let nuevoContacto = new Contacto(contacto);
            this.contactos.push(nuevoContacto);
        })
    }

    getListaContactosSortByName(order = 'asc') {
        let sortedList = this.contactos.sort((a, b) => {
            const nameA = a.nombre.toUpperCase() + a.apellido.toUpperCase();
            const nameB = b.nombre.toUpperCase() + b.apellido.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        if (order === 'desc') { 
            this.contactos = sortedList.reverse()
            return this 
        }
        else { 
            this.contactos = sortedList
            return this
        }
    }

    getListaContactosFilter(filter) {
        let contactosFiltrados = this.contactos.filter(contacto => (contacto.nombre.toUpperCase() + " " + contacto.apellido.toUpperCase()).includes(filter.toUpperCase()));
        return contactosFiltrados;
    }

    getContactoById(id) {
        let contacto = this.contactos.filter(contacto => contacto.id === id);
        return contacto;
    }


};
