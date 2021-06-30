import  "reflect-metadata";
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";

import { router } from "./routes"


import "./database";
import { response } from "express";


const app = express();

app.use(express.json());


app.use(router);

//middleware para tratativa de erro leva 4 parametros tipados
app.use((err:Error, request:Request, response:Response, next:NextFunction) => { //Os erros com "Throw new" caem aqui
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        })
    }
    return response.status(500).json({ // Os demais erros caem aqui
        status: "error",
        message: "Internal Server Error"
    })

})


app.listen(3000,() => console.log('Server is running'))



// Server -> Routes -> Constroller -> Service (throw new error)

