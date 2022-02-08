import express from 'express';
import mongoose from 'mongoose';

import { Transaction, TransactionModel } from './transaction';

const app = express()
app.use(express.json())

setImmediate(async () => {
  const db = await mongoose.connect('mongodb://localhost:27017')
})


app.get('', async (req, res) => {
  let result = await TransactionModel.find<Transaction>({}).exec()
  res.json(result);
})

app.post('', async (req, res) => {
  let { id } = await new TransactionModel(req.body).save()
  res.json({ id })
})

app.listen(3000, () => {
  console.log('Running on 3000')
})
