import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';


interface IPayLoad{
    sub: string;
}

export function ensureAtuhenticated(request:Request, response:Response, next:NextFunction){

 // Receber o token; 
   const authtoken = request.headers.authorization;
  
//Validar se token está preenchido;
    if(!authtoken) return response.status(401).end();

// Validar se token é válido; 
    const token = authtoken.split(" ");

    try{
        const {sub} = verify(token[1],"85973d5bd619d626d1ee2c56d6f05a45") as IPayLoad;
         
        //Recuperar informações do usuário
        request.user_id = sub;
        
        return next();
    }catch(err){
        return response.status(401).end();
    }

} 