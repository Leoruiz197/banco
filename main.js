const express = require('express');
const app = express();
const sequelize = require('./database');
const User =  require("./usuario");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation Teste de aula',
      version: '1.0.0',
    },
  },
  apis: ['./swagger.yml'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/user/find', async (req, res) => {
    try {
      res.send(await User.findAll());
    } catch (err) {
      res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
      console.log(err.message);
    }
})

app.get('/user/findById/:id', async (req, res) => {
  try {
    res.send(await User.findAll({ where: { id: req.params.id}}));
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
})

app.post('/user/create', async (req, res) => {
    try {
        res.send(await User.create(req.body));
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
});

app.put('/user/update/:id', async (req, res) => {
  try {
      res.send(await User.update(req.body,{ where: { id: req.params.id}}));
  } catch (err) {
      res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
      console.log(err.message);
  }
});

app.delete('/user/delete/:id', async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id}})
    res.send("Deletado com sucesso");
  } catch (err) {
      res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
      console.log(err.message);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test-conection', async (req, res) => {
  try {
    // Executa uma query simples para verificar se a conexão está funcionando
    const result = await sequelize.query('SELECT 1 + 1 AS solution');
    res.send(`Conexão com o Sequelize e o banco de dados estabelecida. Resultado: ${result[0][0].solution}`);
  } catch (error) {
    console.error('Erro ao testar conexão com o Sequelize:', error);
    res.status(500).send('Erro ao testar conexão com o Sequelize');
  }
});

app.listen(port, () => {
  console.log(`Server rodando em: http://localhost:${port}`);
});