const express = require("express");
const { createUser, loginUser } = require("./controllers/userController");
const { createEquipment, listEquipment, deleteEquipment, editEquipment } = require("./controllers/equipmentController");
const isAuth = require('./middlewares/isAuth');
const { getAllLogs } = require("./controllers/logController");

const router = express.Router();

router.post("/users/register", createUser);
router.post("/users/login", loginUser)
router.post("/equipment/new", isAuth, createEquipment)
router.get("/equipment/list", isAuth, listEquipment)
router.post("/equipment/delete/:id", isAuth, deleteEquipment)
router.patch("/equipment/update/:id", isAuth, editEquipment)
router.get("/logs", isAuth, getAllLogs)


module.exports = router;