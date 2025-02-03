import imageRepository from "../Repository/imageRepository";

class imageService {

    async createImage(image) {
        if (image.titulo.length >= 5) {
            throw new Error("Título da imagem deve ter pelo menos 5 caracteres");
        }
        return imageRepository.create(image);
    }

}

export default new imageService();