
export default class className {
    nombre;
    apellido;
    telefono;
    direccion;
    id;
    email;
    comentarios;

  constructor(
    {nombre ="",
    apellido ="",
    telefono ="",
    direccion ="",
    id = "0",
    email ="",
    comentarios=""}
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.direccion = direccion;
    this.id = id;
    this.email = email;
    this.comentarios = comentarios;
  }    
  
};

