import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { schema } from './user'

const usersConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const UserModel  = usersConnection.model('User', schema)

const list = async (req: Request, res: Response) => {
  let result = await UserModel.find({}).lean().exec()
  res.json(result)
}

export const Users = {
  list
}