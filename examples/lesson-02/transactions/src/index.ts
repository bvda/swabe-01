import express from 'express'
import axios from 'axios'

import { connection } from './transaction'

const PORT = 3000


const app = express()

app.use(express.static('public'))

app.get('', (req, res) => {
  res.json({message: 'Hello, transactions!'})
})

app.get('/transactions', async (req, res) => {
  const { data } = await axios.get(`http://127.0.0.1:${PORT}/transactions.json`)
  await connection.models.Transaction.deleteMany({}).exec()
  await connection.models.Transaction.insertMany(data)
  res.json(data)
})

app.post('/reverse', express.json(), async (req, res) => {
  const { wallet } = req.body
  if (!wallet) {
    res.sendStatus(400)
  }
  let doc = await connection.models.Transaction.findOne({ sender: wallet }).exec()
  if(doc) {
    const { recipient, sender } = doc
    await connection.transaction(async (session) => {
      doc.recipient = sender
      doc.sender = recipient
      doc.save({ session })
    })
    res.json({ doc })
  } else {
    res.sendStatus(500)
  }
})

app.listen(3000, () => {
  console.log(`Running 'transactions' on port ${PORT}`)
})