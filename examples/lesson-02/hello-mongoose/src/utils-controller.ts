import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { readFile } from 'fs/promises';

import { schema as transactionSchema } from './transaction'
import { schema as userSchema } from './user'

const transactionsConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const TransactionModel = transactionsConnection.model('Transaction', transactionSchema)

const usersConnection = mongoose.createConnection('mongodb://localhost:27017/users')
const UserModel = usersConnection.model('User', userSchema)

const bootstrap = async (req: Request, res: Response) => {
  await TransactionModel.deleteMany({}).exec()
  await UserModel.deleteMany({}).exec()

  let transactions = await readFile('../assets/MOCK_DATA_TRANSACTION.json', 'utf-8')
  let transactionResult = await TransactionModel.insertMany(JSON.parse(transactions))

  let users = await readFile('../assets/MOCK_DATA_USER.json', 'utf-8')
  let userResult = await UserModel.insertMany(JSON.parse(users))

  res.json({
    transactions: {
      ids: transactionResult.map(t => t._id),
      cnt: transactionResult.length,
    },
    users: {
      ids: userResult.map(u => u._id),
      count: userResult.length
    }
  })
}

export const Utils = {
  bootstrap
}