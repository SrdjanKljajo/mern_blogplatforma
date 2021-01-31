import express from 'express'
import {
  create,
  list,
  read,
  remove,
  update,
} from '../controllers/tagController.js'
import { tagCreateValidator } from '../validators/tag.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

// validators
import { runValidation } from '../validators/index.js'
router.post('/tag', tagCreateValidator, runValidation, protect, admin, create)
router.get('/tags', list)
router.get('/tag/:slug', read)
router.delete('/tag/:slug', protect, admin, remove)
router.put('/tag/:slug', protect, admin, update)

export default router
