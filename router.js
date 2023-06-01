const express = require("express");
const { createUser, loginUser } = require("./controllers/userController");
const { createEquipment, listEquipment, deleteEquipment } = require("./controllers/equipmentController");
const isAuth = require('./middlewares/isAuth')

const router = express.Router();

router.post("/users/register", createUser);
router.post("/users/login", loginUser)
router.post("/equipment/new", isAuth, createEquipment)
router.get("/equipment/list", isAuth, listEquipment)
router.post("/equipment/delete/:id", isAuth, deleteEquipment)


module.exports = router;