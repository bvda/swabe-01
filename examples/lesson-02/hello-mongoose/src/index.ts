import express from 'express';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';

import { Transaction, TransactionModel } from './transaction';

const app = express()
app.use(express.json())

setImmediate(async () => {
  await mongoose.connect('mongodb://localhost:27017')
})

app.get('', async (req, res) => {
  let result = await TransactionModel.find({}, { __v: 0 }).lean().exec()
  res.json(result);
})

app.get('/bootstrap', async (req, res) => {
  await TransactionModel.deleteMany({}).exec()
  let data = await readFile('../assets/MOCK_DATA.json', 'utf-8')
  let docs = await TransactionModel.insertMany(JSON.parse(data))

  res.json({
    ids: docs.map(t => t._id),
    cnt: docs.length,
  })
})
app.get('/:uid', async (req, res) => {
  const { uid } = req.params
  let result = await TransactionModel.find({ _id: uid }, { __v: 0}).exec()
  res.json(result)
})


app.put('/:uid', async (req, res) => {
  const { uid } = req.params
  const body = req.body
  let result = await TransactionModel.findOne({ _id: uid}, {__v: 0}).exec()
  if(result) {
    let resp = result.overwrite(body)
    res.json(resp)
  } else {
    res.sendStatus(404)
  }
})

app.patch('/:uid', async (req, res) => {
  const { uid } = req.params
  console.log(uid)
  let result = await TransactionModel.updateOne({_id: uid }, { $set: { amnt: 100, src: '123', dst: '321' }}).exec()
  res.json({uid, result})
})

app.post('', async (req, res) => {
  let { id } = await new TransactionModel(req.body).save()
  res.json({ id })
})

app.get('/search', async (req, res) => {
  let query = req.query;
  let result = await TransactionModel.find<Transaction>({ src: query.src }, { __v: 0 }).lean().exec()
  res.json(result)
})

app.listen(3000, () => {
  console.log('Running on 3000')
})
