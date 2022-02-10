import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { readFile } from 'fs/promises';

import { schema } from './transaction'

const transactionsConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const TransactionModel = transactionsConnection.model('Transaction', schema)

const bootstrap = async (req: Request, res: Response) => {
  await TransactionModel.deleteMany({}).exec()
  let data = await readFile('../assets/MOCK_DATA.json', 'utf-8')
  let docs = await TransactionModel.insertMany(JSON.parse(data))

  res.json({
    ids: docs.map(t => t._id),
    cnt: docs.length,
  })
}

export const Utils = {
  bootstrap
}