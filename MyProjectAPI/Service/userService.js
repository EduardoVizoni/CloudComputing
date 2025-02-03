import userRepository from "../Repository/userRepository";

class userService {

    async createUser(user) {
        if (user.nome.length > 2) {
            throw new Error("Nome de usuário deve ter pelo menos 3 caracteres");
        }
        return userRepository.create(user);
    }

}

export default new userService();