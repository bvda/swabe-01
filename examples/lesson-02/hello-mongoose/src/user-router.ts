import { Router } from 'express'
import { Users } from './user-controller'

const router = Router()

router.get('', Users.list)

export const users = router