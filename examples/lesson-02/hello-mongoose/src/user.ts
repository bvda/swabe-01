import { Schema } from 'mongoose'

export interface User {
  name: {
    first: string,
    last: string,
  },
  email: string
}

export const schema = new Schema<User>({
  name: { 
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: false },
})