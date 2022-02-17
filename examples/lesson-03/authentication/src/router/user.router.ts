import { Router, json } from 'express'
import { create, check, check_bcrypt, create_bcrypt } from '../controller/user.controller'

const router = Router()

router.post('/login', json(), create)
router.post('/verify', json(), check)
router.post('/bcrypt/login', json(), create_bcrypt)
router.post('/bcrypt/verify', json(), check_bcrypt)

export { router as UserRouter }