import { createConnection, Schema } from 'mongoose'


const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/transactions'

export interface Transaction {
  timestamp: number
  sender: string
  recipient: string
  amount: number
}

const schema = new Schema<Transaction>({
  timestamp: { type: Number, required: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  amount: { type: Number, required: true },
})

const transactionsConnection = createConnection(MONGO_DB_URL)
transactionsConnection.model<Transaction>('Transaction', schema)

export const connection = transactionsConnection