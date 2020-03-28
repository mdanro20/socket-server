//Aqui definimos las constantes o variables que quiero que sean globales a toda mi app 

//Si queremos desplegar a un servidor como Heroku, Heroku nos da lo que es el process.environment 
export const SERVER_PORT: number = Number(process.env.PORT) || 5000;