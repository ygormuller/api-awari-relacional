const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/database');
const Item = require('./models/Item');

app.use(express.json());

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado.');
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

// Rota GET
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

// Rota POST
app.post('/items', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Rota PUT
app.put('/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Item.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedItem = await Item.findOne({ where: { id: id } });
      res.status(200).send(updatedItem);
    } else {
      throw new Error('Item não encontrado');
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Rota DELETE
app.delete('/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Item.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Item não encontrado');
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

