import { Router } from 'express'
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = Router()

router.use(authMiddleware)

router.post('/', createOrder)
router.get('/my', getMyOrders)
router.get('/all', adminMiddleware, getAllOrders)
router.put('/:id', adminMiddleware, updateOrderStatus)

export default router