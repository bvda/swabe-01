import express from 'express'

import { transactions } from './transaction-router'
import { users } from './user-router'
import { utils } from './utils-router'

const app = express()
const port = 3000

app.use(express.json())

app.use('/transactions', transactions)
app.use('/users', users)
app.use('/utils', utils)

app.listen(3000, () => {
  console.log(`Server running 'hello-mongoose' on ${port}`)
})
