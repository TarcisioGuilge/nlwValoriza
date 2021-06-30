import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest{
    email:string,
    password:string
}

class AuthenticateUserService{

    async execute({email,password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verificar se e-mail existe
        const user = await usersRepositories.findOne({
            email
        })
        if(!user) throw new Error('E-mail/Password incorrect');
 
        
        //Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) throw new Error('E-mail/Password incorrect')


        //Gerar Token
        const token  = sign({ email: user.email},"85973d5bd619d626d1ee2c56d6f05a45",{subject: user.id,expiresIn:"1d"});

        return token;
    }

}

export{AuthenticateUserService}