import express from 'express'
import mongoose from 'mongoose'

import { transactions } from './transaction-router'
import { utils } from './utils-router'

import { schema as userSchema, User } from './user'

const app = express()
const port = 3000

const transactionsConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const usersConnection = mongoose.createConnection('mongodb://localhost:27017/transactions')
const UserModel = usersConnection.model('User', userSchema)


app.use(express.json())

app.use('/transactions', transactions)
app.use('/utils', utils)

app.listen(3000, () => {
  console.log(`Server running 'hello-mongoose' on ${port}`)
})
