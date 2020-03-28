import { Router, Request, Response } from "express";

//Router es una funcion que permite crear objetos de tipo router , router será usado para crear los servicios rest
const router = Router();


router.get('/mensajes', (req: Request , res: Response) => {
    res.json({
        ok : true , 
        mensaje : 'Todo esta bien!!'
    });
});
//(url o ruta),(funcion que va a manejar esta peticion); como parametro de la funcion necesitamos el req y el resp

router.post('/mensajes', (req: Request , res: Response) => {

    const cuerpo = req.body.cuerpo; 
    const de     = req.body.de;

    res.json({
        ok : true , 
        cuerpo , 
        de 
    });
});

router.post('/mensajes/:id', (req: Request , res: Response) => {

    const cuerpo = req.body.cuerpo; 
    const de     = req.body.de;
    const id     = req.params.id;

    res.json({
        ok : true , 
        cuerpo , 
        de ,
        id
    });
});

export default router;