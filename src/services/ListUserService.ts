import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { classToPlain } from "class-transformer"


class ListUserService {
  async execute() {

    const usersList = getCustomRepository(UsersRepositories)

    const users = await usersList.find();

    return classToPlain(users);

  }
}

export { ListUserService }