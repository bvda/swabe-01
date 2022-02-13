import { Router, json } from 'express'
import { create, check } from '../controller/user.controller'

const router = Router()

router.get('', create)

router.post('', json(), create)

router.post('/verify', json(), check)

router.get(':uid', (req, res) => {

})

router.delete(':uid', (req, res) => {

})

export { router as UserRouter }