import express from 'express';
import mongoose, { Schema, model } from 'mongoose';

import { Transaction, transactionModel } from './transaction';

const app = express();

const schema =  new Schema({
  name: String
})

setImmediate(async () => {
  const db = await mongoose.connect('mongodb://localhost:27017')
  const connection = db.connection
  connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
  connection.on('all', () => {
    console.log('test')
  })
})


app.get('', async (req, res) => {
  const t = new transactionModel({
    source: '1',
    destination: '2',
    timestamp: Date.now()
  })
  t.save((err, result) => {
    // console.log(result)
  })
  transactionModel.find<Transaction>((err, result) => {
    result.forEach(t => console.log(t.id))
  })
  res.json();
})

app.listen(3000, () => {
  console.log('Running on 3000')
})
