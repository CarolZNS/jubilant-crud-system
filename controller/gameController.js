const { User, Game } = require("../models");

const gameController = {
  cirarJogo: (req, res) => {
    let { id } = req.params;
    const { console_name, qtd_jogos } = req.body;
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    Game.create({
      console_name,
      qtd_jogos,
      id_user: id,
    })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: "Could not make game" }));
  },

  editarJogo: (req, res) => {
    let { id } = req.params;
    const { console_name, qtd_jogos, id_user } = req.body;
    Game.update({ console_name, qtd_jogos, id_user }, { where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.status(200).send({ message: "Game updated" });
        } else {
          res.send({ message: "Could not update game" });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating game with id=" + id,
        });
      });
  },

  deletarJogo: async (req, res) => {
    let { userId, id } = req.params;
    await Game.destroy({ where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.status(200).send("Deleted game");
          return
        }
        res.send("Could not delete game");
      })
      .catch((err) => res.status(500).send("Failed to delete"));
  },
};

module.exports = gameController;
