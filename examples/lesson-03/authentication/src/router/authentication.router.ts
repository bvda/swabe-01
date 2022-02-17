import { Router, json } from 'express'
import { authenticate, check } from '../controller/authentication.controller'

const router = Router()
router.use(json())

router.post('', authenticate)
router.post('/verify', check)

export { router as AuthenticationRouter }