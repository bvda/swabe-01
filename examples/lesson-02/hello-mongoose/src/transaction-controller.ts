import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { schema } from './transaction'

const transactionsConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const TransactionModel = transactionsConnection.model('Transaction', schema)

const list = async (req: Request, res: Response) => {
  const { src, dst, from, to } = req.query

  let filter = { }

  if(src) {
    filter = { src }
  }

  if(dst) {
    filter = { ...filter, dst }
  }

  if(from && to) {
    filter = { ...filter, ts: { $gt: from, $lt: to }}
  } else {
    if(from) {
      filter = { ...filter, ts: { $gt: from }}
    }
    if(to) {
      filter = { ...filter, ts: { $lt: to }}
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
  console.log(uid)
  let result = await TransactionModel.updateOne({_id: uid }, { $set: { amnt: 100, src: '123', dst: '321' }}).exec()
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