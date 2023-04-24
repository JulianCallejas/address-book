import apiInstance from "./apiConnection";

const getContactos = async () => {
    try {
        const headers = {
            "method": "GET"
        };
        const response = await apiInstance.get("/contactos", headers);
        return response;
    } catch (error) {
        console.error(error);
        return error
    }
};

const postContacto = async(newContact, setSpiner=(spiner)=>{}) =>{
    setSpiner("agregar");
    try {
        const headers = {
            "method": "POST",
            "Content-Type": "application/json"
        };
        const body = {
            "nombre": newContact.nombre,
            "apellido": newContact.apellido,
            "telefono": newContact.telefono,
            "direccion": newContact.direccion,
            "email": newContact.email,
            "comentarios": newContact.comentarios
        };
        const response = await apiInstance.post("/contactos", body, headers);
        setSpiner("false");
        return response;
    } catch (error) {
        setSpiner("false");
        console.error(error);
        return error
    }
}

const putContacto = async(newContact, setSpiner=(spiner)=>{}) =>{
    setSpiner("modificar");
    try {
        const headers = {
            "method": "PUT",
            "Content-Type": "application/json"
        };
        const body = {
            "nombre": newContact.nombre,
            "apellido": newContact.apellido,
            "telefono": newContact.telefono,
            "direccion": newContact.direccion,
            "email": newContact.email,
            "comentarios": newContact.comentarios
        }
        const response = await apiInstance.put("/contactos/" + newContact.id, body, headers);
        setSpiner("false");
        return response;
    } catch (error) {
        setSpiner("false");
        console.error(error);
        return error
    }

}

const deleteContacto = async(newContact, setSpiner=(spiner)=>{}) =>{
    setSpiner("eliminar");
    try {
        const headers = {
            "method": "DELETE",
            "Content-Type": "application/json"
        };
        const response = await apiInstance.delete("/contactos/" + newContact.id, headers);
        setSpiner("false");
        return response;
    } catch (error) {
        setSpiner("false");
        console.error(error);
        return error
    }
};


const CONTACTOS_ENDPOINTS ={
    LISTAR: getContactos,
    CREAR: postContacto,
    MODIFICAR: putContacto,
    ELIMINAR: deleteContacto
}

export default CONTACTOS_ENDPOINTS

