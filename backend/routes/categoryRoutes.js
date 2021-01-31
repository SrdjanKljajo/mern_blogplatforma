import express from 'express'
import {
  create,
  list,
  read,
  remove,
  update,
} from '../controllers/categoryController.js'

// validators
import { runValidation } from '../validators/index.js'
import { categoryCreateValidator } from '../validators/category.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post(
  '/category',
  categoryCreateValidator,
  runValidation,
  protect,
  admin,
  create
)
router.get('/categories', list)
router.get('/category/:slug', read)
router.delete('/category/:slug', protect, admin, remove)
router.put('/category/:slug', protect, admin, update)

export default router
