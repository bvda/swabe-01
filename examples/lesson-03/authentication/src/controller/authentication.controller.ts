import { sign, verify } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { readFile } from 'fs'
import { join } from 'path'

const PATH_PRIVATE_KEY = join(__dirname, '..', '..', 'auth-rsa256.key')
const PATH_PUBLIC_KEY = join(__dirname, '..', '..', 'public', 'auth-rsa256.key.pub')

const X5U = 'http://localhost:3000/auth-rsa256.key.pub'

export const authenticate = (req: Request, res: Response) => {
  readFile(PATH_PRIVATE_KEY, (err, privateKey) => {
    if(err) {
      console.error(`NOT FOUND: ${PATH_PRIVATE_KEY}`)
      res.sendStatus(500)
    } else {
      let token = sign({ email: 'ctrl@hey.com', admin: true }, privateKey, { expiresIn: '1h', header: { alg: 'RS256', x5u: X5U} })
      res.json({ token })
    }
  })
}

export const verifyToken = (req: Request, res: Response) => {
  const { token } = req.body
  readFile(PATH_PUBLIC_KEY, (err, publicKey) => {
    if(err) {
      console.error(`NOT FOUND: ${PATH_PUBLIC_KEY}`)
      res.sendStatus(500)
    } else {
      try {
        const json = verify(token, publicKey, { complete: true })
        res.json(json)
      } catch(e) {
        res.json(e)
      }
    }
  })
}