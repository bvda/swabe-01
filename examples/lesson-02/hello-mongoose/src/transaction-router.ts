import { Router } from 'express'
import mongoose from 'mongoose'

import { schema } from './transaction'

const router = Router()

const transactionsConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const TransactionModel = transactionsConnection.model('Transaction', schema)

router.get('', async (req, res) => {
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
  console.log(filter)  
  let result = await TransactionModel.find(filter, { __v: 0 }).lean()
  res.json(result);
})

router.post('', async (req, res) => {
  let { id } = await new TransactionModel(req.body).save()
  res.json({ id })
})

router.get('/:uid', async (req, res) => {
  const { uid } = req.params
  let result = await TransactionModel.find({ _id: uid }, { __v: 0}).exec()
  res.json(result)
})

router.put('/:uid', async (req, res) => {
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

router.patch('/:uid', async (req, res) => {
  const { uid } = req.params
  console.log(uid)
  let result = await TransactionModel.updateOne({_id: uid }, { $set: { amnt: 100, src: '123', dst: '321' }}).exec()
  res.json({uid, result})
})

export const transactions = router