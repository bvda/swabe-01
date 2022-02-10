import { Schema, model } from 'mongoose'

export interface User {
  name: {
    first: string,
    last: string,
  },
  email: string
}

const schema = new Schema<User>({
  name: { 
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: false },
})

export const TransactionModel = model<User>('User', schema)