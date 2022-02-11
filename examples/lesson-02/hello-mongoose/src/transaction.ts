import { Schema } from 'mongoose'

export interface Transaction {
  src: string
  dst:string
  amnt: number
  ts: Date
}

export const schema = new Schema<Transaction>({
  src: { type: String, required: true },
  dst: { type: String, required: true },
  amnt: { type: Number, required: true },
  ts: { type: Date, required: true },
})