const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/add_imagem", imageController.create);
router.delete("/delete_imagem/:id", imageController.deleteImagemById);
router.put("/update_imagem/:id", imageController.updateById);
router.get("/get_all_imagens", imageController.getImagem);
router.get("/imagem/:id", imageController.getById);

module.exports = router;