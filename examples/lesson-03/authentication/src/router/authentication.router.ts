import { Router, json } from 'express'
import { authenticate, verifyToken } from '../controller/authentication.controller'

const router = Router()
router.use(json())

router.post('', authenticate)
router.post('/token', verifyToken)

export { router as AuthenticationRouter }