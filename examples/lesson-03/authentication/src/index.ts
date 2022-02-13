import express from 'express'
import { AuthenticationRouter } from './router/authentication.router'
import { UserRouter } from './router/user.router'

const app = express()
const port = 3000

app.use('/auth', AuthenticationRouter)
app.use('/user', UserRouter)

app.get('', (req, res) => {
  res.json({
    'message': 'Hello, world!'
  })
})

app.listen(port, () => {
  console.log(`Running 'authentication' on ${port}`)
})