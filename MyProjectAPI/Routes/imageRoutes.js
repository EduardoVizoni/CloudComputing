import express from "express";
import imageController from "../Controllers/imageController.js";

const router = express.Router();

router.get('/image', imageController.getAllImages);
router.get('/image/:id', imageController.getImageById);
router.post('/image', imageController.createImage);
router.put('/image/:id', imageController.updateImage);
router.delete('/image/:id', imageController.deleteImage);

module.exports = router;