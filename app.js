const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const path = require("path");
const mysql = require("mysql2");
const cors = require("cors");

const userRouter = require("./routes/users");

const app = express();

app.use(cors());

// Essas linhas configuram os middlewares que serão executados antes das rotas da aplicação.
// Aqui, estamos usando o morgan para gerar logs das requisições, express.json() e express.urlencoded()
// para tratar os dados enviados no corpo da requisição em formato JSON e URL encoded,
// respectivamente, o cookie-parser para lidar com cookies e o express-session para gerenciar as sessões da aplicação.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "palavrasecreta",
    resave: true,
    saveUninitialized: true,
  })
);

app.set('view engine', 'ejs');

app.use("/", userRouter);

//Essas linhas sincronizam o banco de dados com o modelo definido na pasta "models".
//Aqui, estamos usando o Sequelize como ORM para lidar com o banco de dados MySQL.
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "crudtesting",
});

/* Essas linhas configuram as rotas de erro da aplicação. A primeira é uma rota de erro 404, que é executada quando o usuário tenta acessar uma rota que não existe na aplicação. A segunda é uma rota de erro 500, que é executada quando ocorre um erro interno no servidor. */
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Essas linhas configuram e iniciam o servidor Express.
const PORT = process.env.PORT || 8080;
connection.connect((error) => {
  if (error) {
    console.log("A error has been occurred " + "while connecting to database.");
    throw error;
  }

  //If Everything goes correct, Then start Express Server
  app.listen(PORT, () => {
    console.log(
      "Database connection is Ready and " + "Server is Listening on Port ",
      PORT
    );
  });
});
