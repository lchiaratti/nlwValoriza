import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const compliementsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await compliementsRepositories.findOne({
      where: {
        user_sender: user_id,
      },
      relations: ["userSender", "userReceiver", "tag"],
    });
    return compliments;
  }
}

export { ListUserSendComplimentsService }