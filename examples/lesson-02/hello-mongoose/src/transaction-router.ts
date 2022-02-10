import { Router } from 'express'
import { Transactions } from './transaction-controller'

const router = Router()

router.get('', Transactions.list)
router.post('', Transactions.create)
router.get('/:uid', Transactions.read)
router.put('/:uid', Transactions.overwrite)
router.patch('/:uid', Transactions.update)
router.delete('/:uid', Transactions.remove)

export const transactions = router