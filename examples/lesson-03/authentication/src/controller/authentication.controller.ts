import { sign,verify } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { readFile } from 'fs'
import { join } from 'path'

export const authenticate = async (req: Request, res: Response) => {
  readFile(join(__dirname, '..', '..', 'auth-rsa256.key'), (err, data) => {
    console.log(err, data)
    let token = sign({ pay: 'load' }, data, { algorithm: 'RS256'})
    res.json(token)
  })
}

export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.body
  readFile(join(__dirname, '..', '..', 'auth-rsa256.key.pub'), (err, data1) => {
    res.json(verify(token, data1))})
}