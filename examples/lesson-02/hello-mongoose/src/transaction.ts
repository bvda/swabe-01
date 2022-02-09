import { Schema, model } from 'mongoose'

export interface Transaction {
  src: string
  dst:string
  amnt: number
  ts: Date
}

const schema = new Schema<Transaction>({
  src: { type: String, required: true },
  dst: { type: String, required: true },
  amnt: { type: Number, required: true },
  ts: { type: Date, required: true },
})

export const TransactionModel = model<Transaction>('transaction', schema)