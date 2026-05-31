import { Router } from 'express'
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.use(authMiddleware)

router.get('/', getFavorites)
router.post('/', addFavorite)
router.delete('/:productId', removeFavorite)

export default router