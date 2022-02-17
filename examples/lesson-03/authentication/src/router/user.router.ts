import { Router, json } from 'express'
import { create, check } from '../controller/user.controller'

const router = Router()

router.post('/login', json(), create)

router.post('/verify', json(), check)

export { router as UserRouter }