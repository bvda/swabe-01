import { Router, json } from 'express'
import { create, check, check_bcrypt, create_bcrypt } from '../controller/user.controller'

const router = Router()

router.post('/', json(), create)
router.post('/bcrypt', json(), create_bcrypt)
router.post('/login', json(), check)
router.post('/bcrypt/login', json(), check_bcrypt)

export { router as UserRouter }