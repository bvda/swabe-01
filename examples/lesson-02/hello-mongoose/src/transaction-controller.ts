import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { schema } from './transaction'

const transactionsConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const TransactionModel = transactionsConnection.model('Transaction', schema)

const list = async (req: Request, res: Response) => {
  const { src, dst, f, t } = req.query

  let filter = { }

  if(src) {
    filter = { src }
  }

  if(dst) {
    filter = { ...filter, dst }
  }

  if(f && t) {
    filter = { ...filter, ts: { $gt: f, $lt: t }}
  } else {
    if(f) {
      filter = { ...filter, ts: { $gt: f }}
    }
    if(t) {
      filter = { ...filter, ts: { $lt: t }}
    }
  }
  
  let result = await TransactionModel.find(filter, { __v: 0 }).lean()
  res.json(result);
}

const create =  async (req: Request, res: Response) => {
  let { id } = await new TransactionModel(req.body).save()
  res.json({ id })
}

const read = async (req: Request, res: Response) => {
  const { uid } = req.params
  let result = await TransactionModel.find({ _id: uid }, { __v: 0}).exec()
  res.json(result)
}

const overwrite = async (req: Request, res:Response) => {
  const { uid } = req.params
  const body = req.body
  let result = await TransactionModel.findOne({ _id: uid}, {__v: 0}).exec()
  if(result) {
    let resp = result.overwrite(body)
    res.json(resp)
  } else {
    res.sendStatus(404)
  }
}

const update = async (req: Request, res: Response) => {
  const { uid } = req.params
  const body = req.body
  let result = await TransactionModel.updateOne({_id: uid }, { $set: body }).exec()
  res.json({uid, result})
}

const remove = async (req: Request, res: Response) => {
const { uid } = req.params
  let result = await TransactionModel.deleteOne({ _id: uid })
  res.json(result)
}

export const Transactions = {
  list, create, read, overwrite, update, remove
}