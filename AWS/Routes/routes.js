const express = require("express");
const router = express.Router();
// const userController = require("../Controller/userController");
// const imageController = require("../Controller/imageController");

// router.post("/add_user", userController.addUser);
// router.get("/get_user/:name", userController.getUser);
// router.get("/get_all_users", userController.getAllUsers);
// router.delete("/delete_user/:name", userController.deleteUser);
// router.put("/update_user/:name", userController.updateUser);

// router.post("/add_image", imageController.addImage);
// router.get("/get_image/:title", imageController.getImage);
// router.get("/get_all_images", imageController.getAllImages);
// router.delete("/delete_image/:title", imageController.deleteImage);
// router.put("update_image/:title", imageController.updateImage);
const awsController = require("../Controller/awsController");

router.post('/upload', awsController.uploadFile);
router.post("/download", awsController.downloadFile);

module.exports = router;