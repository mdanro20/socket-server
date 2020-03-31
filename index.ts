import Server from "./classes/server";
import { SERVER_PORT } from "./global/environment";
import router from "./routes/router";
import  bodyParser  from "body-parser";
import cors from 'cors';

const server = Server.instance;  

//BodyParser
server.app.use(bodyParser.urlencoded({ extended : true }));
server.app.use(bodyParser.json());//Pasar la peticion de un formato json
// Las dos lineas anteriores dicen: Lo que sea que me posteen, tomalo y genereame un objeto de java script

//CORS
server.app.use(cors({origin : true , credentials : true}));


//Configuracion de las rutas 
server.app.use('/',router);


server.start( () => {
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});

