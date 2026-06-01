import { Router } from 'express'
import multer from 'multer'
import {
  getProducts, getProductById, createProduct,
  updateProduct, deleteProduct, uploadProductImage
} from '../controllers/productController.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } })

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', authMiddleware, adminMiddleware, createProduct)
router.put('/:id', authMiddleware, adminMiddleware, updateProduct)
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct)
router.post('/upload-image', authMiddleware, adminMiddleware, upload.single('image'), uploadProductImage)

export default router