const { Sequelize } = require('sequelize');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors());
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


/* BANCO DE DADOS */

const Login = sequelize.define(
    "acesso",
    { usuario: Sequelize.STRING, senha: Sequelize.STRING },
    { timestamps: false }
);

const Sensores = sequelize.define(
    "sensores",
    { id_dispositivo: Sequelize.INTEGER, id_sensor: Sequelize.INTEGER, empresa: Sequelize.STRING, grandeza: Sequelize.STRING },
    { timestamps: false }
);

// createTable();

// async function createTable() {
//     Sensores.sync();
// }


/* SELECT NA TABELA ACESSOS */

async function getUsers() {
    const users = await Login.findAll();
    return users;
}


/* INSERT NA TABELA SENSORES */


/* ENDPOINT */

app.get('/', async function (req, res) {
    res.json(await getUsers());
});

app.post('/sensores', async function (req, res) {
    return req.json({
        erro: false,
        mensagem: "Sensor cadastrado com sucesso!"
    });
});

app.listen(port, () => {
    console.info("Aplicação rodando em http://localhost:3000");
});








/* async function criarUsuario(){
    const usuarioCriado = await Login.create({
        usuario: "teste1",
        senha: "teste1"
      });
      console.log(usuarioCriado)
}
*/
