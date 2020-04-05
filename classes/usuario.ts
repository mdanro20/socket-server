export class Usuario {
    public id: string; // Es el identificador de la conexion, esta debe ir si o si 
    public nombre: string; // NOmbre de la persona conectada, al principio no se conoce su nombre
    public sala: string; // Usuarios que pertenecen a una misma sala y pueden enviarse mensajes entre ellos

    constructor( id: string ){
        this.id = id; 
        this.nombre = "sin-nombre";
        this.sala = "sin-sala";
    }
}