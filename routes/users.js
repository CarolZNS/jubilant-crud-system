const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const gameController = require("../controller/gameController");

router.get("/", userController.mostrarTodos);
router.get("/user/:id", userController.mostrarUm);
router.post("/user/add", userController.criar);
router.put("/user/:id/edit", userController.editar);
router.delete("/user/:id/delete", userController.deletar);

router.post("/user/:id/newgame", gameController.cirarJogo);
router.put("/user/:userId/editgame/:id", gameController.editarJogo);
router.delete("/user/:userId/deletegame/:id", gameController.deletarJogo);

module.exports = router;
