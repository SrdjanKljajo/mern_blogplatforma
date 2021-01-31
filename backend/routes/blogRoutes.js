import express from 'express'
import {
  create,
  list,
  read,
  photo,
  remove,
  update,
  listByUser,
  listByCategory,
  listByTag,
  createStoryReview,
  getTopStories,
  getBlogs,
  postComment,
  //deleteComment,
} from '../controllers/blogController.js'
//import { runValidation } from '../validators/index.js'
//import { commentCreateValidator } from '../validators/comment.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/blog', protect, admin, create)
router.get('/blogs', list)
router.get('/blogspag', getBlogs)
router.get('/blog/:slug', read)
router.delete('/blog/:slug', protect, admin, remove)
router.put('/blog/:slug', protect, admin, update)
router.get('/blog/photo/:slug', photo)
//router.post('/blogs/related', listRelated)

// auth user blog crud
router.post('/user/blog', protect, create)
router.get('/:name/blogs', listByUser)
router.delete('/user/blog/:slug', protect, remove)

// blogs category and tag
router.get('/blogs/category/:slug', listByCategory)
router.get('/blogs/tag/:slug', listByTag)

//reviwe and top story
router.route('/blogs/:slug/reviews').post(protect, createStoryReview)
router.route('/blogs/top').get(getTopStories)

//komentari
router.post('/blogs/comment/:slug', protect, postComment)

/*
//comments
router.post(
  '/blogs/comment/:slug',
  protect,
  commentCreateValidator,
  runValidation,
  postComment
)
router.delete('/blogs/comment/:slug/:comment_id', protect, deleteComment) */

export default router
