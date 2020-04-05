import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket ) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente : Socket) => {
    cliente.on('disconnect' , () => {
        const usuarioEliminado = usuariosConectados.borrarUsuario(cliente.id);
        console.log(`Usuario eliminado ${usuarioEliminado?.id}` )
    });
}

//Escuchar mensajes

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', ( payload: {de: string, cuerpo: string}) =>{
        console.log('Mensaje recibido', payload);
        // Se quiere enviar mensajes a todos los usuarios conectados 
        io.emit('mensaje-nuevo', payload);
    });
}

export const usuario = (cliente: Socket) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        usuariosConectados.modificarNombre(cliente.id, payload.nombre);
        callback(
            {
                ok: true, 
                mensaje: `Usuario ${ payload.nombre }, configurado`
            }
        );
    })
}