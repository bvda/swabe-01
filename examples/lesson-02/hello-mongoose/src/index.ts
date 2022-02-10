import express from 'express';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';

import { transactions } from './transaction-router';

import { schema as userSchema, User } from './user';

const app = express()
const port = 3000

const transactionsConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const usersConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const UserModel = usersConnection.model('User', userSchema)


app.use(express.json())

app.use('/transactions', transactions)
// app.get('', async (req, res) => {
//   let result = await TransactionModel.find({}, { __v: 0 }).lean().exec()
//   res.json(result);
// })

// app.get('/bootstrap', async (req, res) => {
//   await TransactionModel.deleteMany({}).exec()
//   let data = await readFile('../assets/MOCK_DATA.json', 'utf-8')
//   let docs = await TransactionModel.insertMany(JSON.parse(data))

//   res.json({
//     ids: docs.map(t => t._id),
//     cnt: docs.length,
//   })
// })







// app.post('', async (req, res) => {
//   let { id } = await new TransactionModel(req.body).save()
//   res.json({ id })
// })

// app.get('/search', async (req, res) => {
//   let query = req.query;
//   let result = await TransactionModel.find<Transaction>({ src: query.src }, { __v: 0 }).lean().exec()
//   res.json(result)
// })

app.listen(3000, () => {
  console.log(`Server running 'hello-mongoose' on ${port}`)
})
