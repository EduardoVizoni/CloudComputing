import express from "express";
import userController from "../Controllers/userController.js"; // Adicione a extensão .js

const router = express.Router();

router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;