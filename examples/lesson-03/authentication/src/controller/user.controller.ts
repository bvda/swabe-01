import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { randomBytes, pbkdf2 } from '../utils/auth-crypto'
import { userSchema } from '../model/user.model'

const usersConnection = mongoose.createConnection('mongodb://localhost:27017/users')
const userModel = usersConnection.model('User', userSchema)

export const create = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const salt = await randomBytes(32);
  let key = await pbkdf2(password, salt.toString('hex'), 1000000, 32, 'sha512')
  let user = new userModel({ email, name: {
    first: 'Brian'
  }, password: {
    hash: '',
    salt: ''
  }})
  user.password.setPassword(key.toString('hex'), salt.toString('hex'))
  await user.save()
  res.json(user)
}

export const check = async (req: Request, res: Response) => {
  const { email, password } = req.body
  console.log(req.body)
  let user = await userModel.findOne({ email }).exec()
  console.log(user, password)
  let valid = await user.password.isPasswordValid(password)
  if(valid) {
    res.json(user)
  } else {
    res.sendStatus(403)
  }
}