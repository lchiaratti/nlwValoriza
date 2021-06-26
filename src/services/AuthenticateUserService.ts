import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}:IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    // Verificar se email existe
    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect")
    }
    // verificar se senha esta correta
    const passwordMath = await compare(password, user.password)

    if(!passwordMath){
      throw new Error("Email/Password incorrect")
    }
    //gerar token
    const token = sign({
      email: user.email
    },"d6339e19f43d9e71c81aa4c1154b01cf", {
       subject: user.id, 
       expiresIn: "1d"
    } 
    );
    return token;
  }
}

export { AuthenticateUserService }