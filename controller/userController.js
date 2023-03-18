const { User, Game } = require("../models");

const userController = {
  mostrarTodos: async (req, res) => {
    const usuarios = await User.findAll().catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
    //res.render("home", { users: usuarios });
    res.send(usuarios);
  },

  mostrarUm: async (req, res) => {
    let { id } = req.params;
    User.findOne({
      where: { id: id },
      include: Game,
    }).then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Error displaying user or user doesn't exist",
        });
      }
    });
  },

  criar: async (req, res) => {
    const { name, email, position } = req.body;
    if (!req.body.name) {
      res.status(400).send({
        message: "Cannot be empty",
      });
    }
    User.create({
      name,
      email,
      position,
    })
      .then((data) => {
        console.log(data.id);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error while creating",
        });
      });
  },

  editar: (req, res) => {
    let { id } = req.params;
    const { name, email, position } = req.body;
    User.update({ name, email, position }, { where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.status(200).send({ message: "User updated" });
        } else {
          res.send({ message: "Could not update tutorial" });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating user with id=" + id,
        });
      });
  },

  deletar: (req, res) => {
    let { id } = req.params;
    User.destroy({ where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.status(200).send({ message: "Deleted user" });
        }
        res.send({ message: "Could not delete user" });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error deleting user with id: " + id });
      });
  },
};

module.exports = userController;
