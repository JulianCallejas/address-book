
export default class className {
    nombre;
    apellido;
    telefono;
    direccion;
    id;

  constructor(
    {nombre ="",
    apellido ="",
    telefono ="",
    direccion ="",
    id = "0"}
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.direccion = direccion;
    this.id = id;
  }    
  
};

