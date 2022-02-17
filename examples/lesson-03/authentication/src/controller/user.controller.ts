import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { randomBytes, pbkdf2, SALT_LENGTH, DIGEST, ITERATIONS } from '../utils/auth-crypto'
import { userSchema } from '../model/user.model'

const usersConnection = mongoose.createConnection('mongodb://localhost:27017/users')
const UserModel = usersConnection.model('User', userSchema)

export const create = async (req: Request, res: Response) => {
  const { email, password, name } = req.body
  const unique = await UserModel.find({ email }).exec()
  if(unique.length) {
    res.status(400).json({
      "message": "User already exists"
    })
  } else {
    let user = new UserModel({ 
      email, 
      name, 
      password: {
        hash: '',
        salt: ''
      }
    })
    let salt = await randomBytes(32);
    let hash = await pbkdf2(password, salt.toString('hex'), ITERATIONS, SALT_LENGTH, DIGEST)
    user.password.setPassword(hash.toString('hex'), salt.toString('hex'))
    await user.save()
    res.json(user)
  }
}

export const check = async (req: Request, res: Response) => {
  const { email, password } = req.body
  let user = await UserModel.findOne({ email }).exec()
  let valid = await user.password.isPasswordValid(password)
  if(valid) {
    res.json(user)
  } else {
    res.sendStatus(403)
  }
}