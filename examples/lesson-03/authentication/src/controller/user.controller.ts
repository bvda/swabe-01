import { randomBytes, pbkdf2 } from 'crypto'
import { Request, Response } from 'express'

export const create = (req: Request, res: Response) => {
  const { username, password } = req.body
  const salt = randomBytes(32).toString('hex');
  pbkdf2(password, salt, 1000000, 32, 'sha512', (err, derivedKey) => {
    console.debug(salt, derivedKey.toString('hex'))
    res.json({
      salt,
      hash: derivedKey.toString('hex')
    })
  })
}

export const check = (req: Request, res: Response) => {
  const { salt, password, hashed } = req.body
  pbkdf2(password, salt, 1000000, 32, 'sha512', (err, derivedKey) => {
    let hash = derivedKey.toString('hex')
    res.json({
      valid: hash === hashed
    })
  })
}