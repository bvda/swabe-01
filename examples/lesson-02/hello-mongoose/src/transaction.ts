import { Schema, model } from 'mongoose'

export interface Transaction {
  id: string
  src: string
  dst:string
  amnt: number
  ts: Date
}

const schema = new Schema<Transaction>({
  id: { type: String, required: true },
  src: { type: String, required: true },
  dst: { type: String, required: true },
  amnt: { type: Number, required: true },
  ts: { type: Date, required: true },
})

export const TransactionModel = model<Transaction>('transaction', schema)