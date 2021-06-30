// Somente o que for relacionado À criação de usuário
/* Qual regra está sendo atendida, veja REDAME.md */ 

import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from 'bcryptjs';

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService{ /*1*/

    async execute({name,email,admin=false,password} : IUserRequest){
        const usersRepository =  getCustomRepository(UsersRepositories);

       /*b*/
        if(!email) throw new Error("E-mail não definido - E-mail undefined");


        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        /*a*/
        if(userAlreadyExists) throw new Error("Esse e-mail já está cadastrado em nosso sistema - User already exists");

        const passwordHash = await hash(password,8);
        
        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        })

        await usersRepository.save(user);

        return user;
    }

}

export{CreateUserService};