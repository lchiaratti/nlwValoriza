import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const compliementsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await compliementsRepositories.findOne({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSender", "userReceiver", "tag"],
    });
    return compliments;
  }
}

export { ListUserReceiveComplimentsService }