import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket'


//export es para que esta clase pueda ser ocupada en otro lugar, y necesitamos usarla esta clase y default porque será lo que se exportará por defecto cuando alguien importe esta clase. 
export default class Server {
    //Propiedades 
    private static _instance : Server;
    public app: express.Application; //De tipo express
    public port : number; //Donde lo tendré corriendo. 

    public io: socketIO.Server;//propiedad del socket.io encargada de escuchar o emitir eventos. Encargado de los eventos de los sockets
    // El io es el servidor de sockets, tiene la capacidad de conocer que personas estan conectadas 
    private httpServer : http.Server;

    //Constructor 
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        //Socket,io necesita obtener la informacion del servidor que está corriendo en este momento. Esa informacion se encuentra en app, pero como express y socket.io no son compatibles, se usa un intermediario http
        //Lo que se hará es indicar que la configuracion del servidor y todo, esta en la propiedad http y no en app, esto debido a que http y socket.io si son compatibles
        //Inicializamos el valor de httpServer con las configuraciones de la app de express

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }


    public static get instance(){
        return this._instance || (this._instance = new this() ) ; 
    }

    //Metodo para escuchar conexiones de los clientes a nuestro servidor o app
    private escucharSockets(){
        console.log('Escuchando conexiones - Sockets'); 
        //Escuchamos la conexion de clientes: 
        this.io.on('connection' , cliente => {

            //Conectar cliente 
            socket.conectarCliente(cliente, this.io);

            //Configurar Usuario 
            socket.usuario(cliente, this.io);

            //ObtenerUsuariosActivos
            socket.obtenerUsuarios(cliente, this.io);

            //Recibir mensajes
            socket.mensaje(cliente, this.io);

            //Desconeccion 
            socket.desconectar(cliente, this.io);
            
        });
    }

    //Metodo para levantar este servidor 
    start( callback : any ){
        this.httpServer.listen(this.port , callback );
    }
}