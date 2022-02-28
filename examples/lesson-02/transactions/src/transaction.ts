import { createConnection, Schema } from 'mongoose'


const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/transactions'

export interface Transaction {
  timestamp: number
  sender: string  
  recipient: string
  amount: number
}

const walletValidation = {
  validator: function validate(value: string) { 
    return value.match('^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$')
  },
  message: 'Not a valid Bitcoin address'
}

const schema = new Schema<Transaction>({
  timestamp: { type: Number, required: true },
  sender: { type: String, required: true, validate: walletValidation },
  recipient: { type: String, required: true },
  amount: { type: Number, required: true },
})

const transactionsConnection = createConnection(MONGO_DB_URL)
transactionsConnection.model<Transaction>('Transaction', schema)

export const connection = transactionsConnection