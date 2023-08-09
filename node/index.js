const express = require('express');
const app = express();

require('dotenv').config();
const db = require('./utils/db');

app.get('/api/v1.0/nutritions', async (req, res) => {
  const { food_name, research_year, maker_name, food_code } = req.query;
  if (!food_name && !research_year && !maker_name && !food_code) {
    res
      .status(400)
      .send({ message: '검색할 조건을 입력하세요!', code: 'BadRequest' });
    return;
  }

  try {
    const data = await db.findNutritions(req.query);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message, code: 'QueryException' });
  }
});

// app.use(express.json()); // body => json type converting
app.get('/', (req, res) => res.send('Hello, World!'));

app.get('/api/v1.0/emps', async (req, res, next) => {
  // console.log('query>>>', req.query);
  const { query } = req;
  try {
    const fn = query ? db.finds : db.gets;
    // const data = await fn.bind(db)('Emp', query);
    const data = await fn.call(db, 'Emp', query);
    // console.log('🚀  data:', data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ errorCode: 500, errorMessage: error.message });
  }
});

app.get('/api/v1.0/emps/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await db.get('Emp', id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ errorCode: 500, errorMessage: error.message });
  }
});

app.listen(8088, () => console.log('Server started at 8088...'));
