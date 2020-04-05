// Aqui va toda la lógica

import { Usuario } from "./usuario";
import { usuario } from '../sockets/socket';

export class UsuariosLista {
    private lista : Usuario[] = [];

    constructor( ){

    }

    //Agregar un usuario a la lista 
    public agregar (usuario : Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    //Modificar el nombre de un usuario 
    public modificarNombre (id : string , nombre: string ){
        for ( let usuario of this.lista ){
            if ( usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log(' ==== Actualizando usuario ====');
        console.log( this.lista);
    }

    //Obtener lista de usuario 
    public getLista(){
        return this.lista;
    }

    //Obtener un Usuario 
    public getUsuario( id: string ){
        return this.lista.find( usuario => {
            return usuario.id === id
        });
    }

    //Obtener usuario en una sala en particular
    public getUsuariosEnSala( sala: string){
        return this.lista.filter( usuario => {
            return usuario.sala === sala;
        });
    }

    //Borrar usuario 
    public borrarUsuario( id: string ){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter( usuario => {
            return usuario.id !== id;
        });
        return tempUsuario;
    }
}