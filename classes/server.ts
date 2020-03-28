import express from 'express';
import { SERVER_PORT } from '../global/environment';

//export es para que esta clase pueda ser ocupada en otro lugar, y necesitamos usarla esta clase y default porque será lo que se exportará por defecto cuando alguien importe esta clase. 
export default class Server {
    //Propiedades 
    public app: express.Application; //De tipo express
    public port : number; //Donde lo tendré corriendo. 

    //Constructor 
    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
    }

    //Metodo para levantar este servidor 
    start( callback : any ){
        this.app.listen(this.port , callback );
    }
}