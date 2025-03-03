const express = require("express");
const router = express.Router();
// const userController = require("../Controller/userController");
// const imageController = require("../Controller/imageController");
const awsController = require("../Controller/awsController");

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
const S3Controller = require("../Controller/awsController");

router.post('/upload', S3Controller.uploadFile);
router.post("/download", S3Controller.downloadFile);

module.exports = router;