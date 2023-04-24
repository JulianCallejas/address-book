import ListaContactos from "../model/listaContactos";

const saveConatcList = async (contactList) => {
    try {
        await localStorage.setItem('lista_contactos', JSON.stringify(contactList));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const loadConatcList = () => {
    try {
        let contactList = localStorage.getItem('lista_contactos');
        if (contactList) {
            contactList = JSON.parse(contactList);
            return new ListaContactos(contactList);
        }else{
            return new ListaContactos([]);
        }
    } catch (error) {
        console.error(error);
        return new ListaContactos([]);
    }
};


const clearConatcList = () => {
    localStorage.removeItem('lista_contactos');
};


const CONTACTOS_LOCALSTORAGE = {
    SAVE: saveConatcList,
    LOAD: loadConatcList,
    REMOVE: clearConatcList
}

export default CONTACTOS_LOCALSTORAGE;