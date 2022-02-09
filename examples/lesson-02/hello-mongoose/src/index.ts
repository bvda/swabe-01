import express from 'express';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';

import { Transaction, TransactionModel } from './transaction';

const app = express()
app.use(express.json())

setImmediate(async () => {
  const db = await mongoose.connect('mongodb://localhost:27017')
})

app.get('', async (req, res) => {
  let result = await TransactionModel.find({}, { _id: 0, __v: 0 }).lean().exec()
  res.json(result);
})

app.post('', async (req, res) => {
  let { id } = await new TransactionModel(req.body).save()
  res.json({ id })
})

app.get('/search', async (req, res) => {
  let query = req.query;
  let result = await TransactionModel.find<Transaction>({ source: query.source }).exec()
  res.json(result)
})

app.get('/bootstrap', async (req, res) => {
  await TransactionModel.deleteMany({}).exec()
  let data = await readFile('../assets/MOCK_DATA.json', 'utf-8');
  let docs = await TransactionModel.insertMany(JSON.parse(data))
  let ids = docs.map((t: Transaction) => t.id)
  res.json({
    cnt: ids.length,
    ids
  })
})

app.listen(3000, () => {
  console.log('Running on 3000')
})
