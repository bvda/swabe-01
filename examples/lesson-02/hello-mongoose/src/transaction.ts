import { Schema, model } from 'mongoose'

export interface Transaction {
  id: string
  source: string
  destination:string
  timestamp: Date
}

const schema = new Schema<Transaction>({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  timestamp: { type: Date }
})

export const transactionModel = model<Transaction>('transaction', schema)