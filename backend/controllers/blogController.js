import Blog from '../models/blog.js'
import User from '../models/userModel.js'
import Category from '../models/categoryModel.js'
import Tag from '../models/tagModel.js'
import asyncHandler from 'express-async-handler'
import formidable from 'formidable'
import slugify from 'slugify'
import _ from 'lodash'
import { errorHandler } from '../helpers/dbErrorHandler.js'
import fs from 'fs'
import { smartTrim } from '../helpers/blog.js'

export const create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Nije moguće dodati fotografiju',
      })
    }

    const { title, body, categories, tags } = fields

    if (!title || !title.length) {
      return res.status(400).json({
        error: 'Naslov je obavezan',
      })
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: 'Tekst je isuviše kratak',
      })
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: 'Obavezna je najmanje jedna kategorija',
      })
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: 'Obavezan je najmanje jedan tag',
      })
    }

    if (!files.photo) {
      return res.status(400).json({
        error: 'Naslovna fotografija je obavezna',
      })
    }

    let blog = new Blog()
    blog.title = title
    blog.body = body
    blog.excerpt = smartTrim(body, 320, ' ', ' ...')
    blog.slug = slugify(title).toLowerCase()
    blog.postedBy = req.user._id
    blog.numReviews = 0
    // categories and tags
    let arrayOfCategories = categories && categories.split(',')
    let arrayOfTags = tags && tags.split(',')

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Fotografija mora biti manja od 1mb',
        })
      }
      blog.photo.data = fs.readFileSync(files.photo.path)
      blog.photo.contentType = files.photo.type
    }

    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        })
      }
      // res.json(result);
      Blog.findByIdAndUpdate(
        result._id,
        { $push: { categories: arrayOfCategories } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          })
        } else {
          Blog.findByIdAndUpdate(
            result._id,
            { $push: { tags: arrayOfTags } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              })
            } else {
              res.json(result)
            }
          })
        }
      })
    })
  })
}

// list, listAllBlogsCategoriesTags, read, remove, update

// @desc    Fetch all blogs with paginate
// @route   GET /api/blogspag
// @access  Public
export const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Blog.countDocuments({ ...keyword })
  const blogs = await Blog.find({ ...keyword })
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name')
    .sort({ createdAt: -1 })
    .select(
      '_id title slug excerpt rating numReviews comments categories tags postedBy createdAt updatedAt'
    )
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ blogs, page, pages: Math.ceil(count / pageSize) })
})

export const list = (req, res) => {
  Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name')
    .sort({ createdAt: -1 })
    .select(
      '_id title slug excerpt comments rating numReviews categories tags postedBy createdAt updatedAt'
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        })
      }
      res.json(data)
    })
}

// @desc    Fetch single blog
// @route   GET /api/blog/slug
// @access  Public

export const read = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug.toLowerCase(),
  })
    .populate('postedBy', 'name')
    .select(
      '_id title body slug comments rating numReviews categories tags postedBy createdAt updatedAt'
    )
  res.json(blog)
})

export const remove = asyncHandler(async (req, res) => {
  Blog.findOneAndRemove({ slug: req.params.slug.toLowerCase() }).exec()
  res.json({
    message: 'Blog uspešno obrisan',
  })
})

export const update = (req, res) => {
  const slug = req.params.slug.toLowerCase()

  Blog.findOne({ slug }).exec((err, oldBlog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }

    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Fotografija nije postavljena',
        })
      }

      let slugBeforeMerge = oldBlog.slug
      oldBlog = _.merge(oldBlog, fields)
      oldBlog.slug = slugBeforeMerge

      const { body, categories, tags } = fields

      if (body) {
        oldBlog.excerpt = smartTrim(body, 320, ' ', ' ...')
      }

      if (categories) {
        oldBlog.categories = categories.split(',')
      }

      if (tags) {
        oldBlog.tags = tags.split(',')
      }

      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: 'Veličina fotografije mora biti manja od 1mb',
          })
        }
        oldBlog.photo.data = fs.readFileSync(files.photo.path)
        oldBlog.photo.contentType = files.photo.type
      }

      oldBlog.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          })
        }
        res.json(result)
      })
    })
  })
}

export const photo = (req, res) => {
  const slug = req.params.slug.toLowerCase()
  Blog.findOne({ slug })
    .select('photo')
    .exec((err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: errorHandler(err),
        })
      }
      res.set('Content-Type', blog.photo.contentType)
      return res.send(blog.photo.data)
    })
}

/*export const listRelated = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 4
  const { _id, categories } = req.body.blog

  Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
    .limit(limit)
    .populate('postedBy', '_id name username profile')
    .select('title slug excerpt postedBy createdAt updatedAt')
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: 'Blogs not found',
        })
      }
      res.json(blogs)
    })
}*/

export const listByUser = (req, res) => {
  User.findOne({ name: req.params.name }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }

    Blog.find({ postedBy: user._id })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name')
      .sort({ createdAt: -1 })
      .select('_id title slug rating numReviews postedBy createdAt updatedAt')
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          })
        }
        res.json(data)
      })
  })
}

export const listByCategory = (req, res) => {
  Category.findOne({ slug: req.params.slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }
    Blog.find({ categories: category._id })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name')
      .sort({ createdAt: -1 })
      .select(
        '_id title excerpt slug rating numReviews postedBy createdAt updatedAt'
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          })
        }
        res.json(data)
      })
  })
}
export const listByTag = (req, res) => {
  Tag.findOne({ slug: req.params.slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }
    Blog.find({ tags: tag._id })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name')
      .sort({ createdAt: -1 })
      .select(
        '_id title slug excerpt rating numReviews postedBy createdAt updatedAt'
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          })
        }
        res.json(data)
      })
  })
}

// @desc    Create new review
// @route   POST /api/blogs/:slug/reviews
// @access  Private
export const createStoryReview = asyncHandler(async (req, res) => {
  const { rating } = req.body

  const blog = await Blog.findOne({ slug: req.params.slug })

  if (blog) {
    const alreadyReviewed = blog.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Nije moguće više puta oceniti priču')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      user: req.user._id,
    }

    blog.reviews.push(review)

    blog.numReviews = blog.reviews.length

    blog.rating =
      blog.reviews.reduce((acc, item) => item.rating + acc, 0) /
      blog.reviews.length

    await blog.save()
    res.status(201).json({ message: 'Artikal je uspešno ocenjen' })
  } else {
    res.status(404)
    throw new Error('Artikal nije pronađen')
  }
})

// @desc    Get top rated blogs
// @route   GET /api/blogs/top
// @access  Public
export const getTopStories = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name')
    .select('_id title slug rating numReviews postedBy createdAt updatedAt')
    .sort({ rating: -1 })
    .limit(4)

  res.json(blogs)
})

export const postComment = asyncHandler(async (req, res) => {
  const { comment } = req.body

  const blog = await Blog.findOne({ slug: req.params.slug })

  if (blog) {
    const newComment = {
      name: req.user.name,
      comment,
      user: req.user._id,
    }

    blog.comments.push(newComment)

    await blog.save()
    res.status(201).json({ message: 'Artikal je uspešno ocenjen' })
  } else {
    res.status(404)
    throw new Error('Artikal nije pronađen')
  }
})

/*
funkcionalan bekend za komentare
// @route    POST api/blogs/comment/:id
// @desc     Comment on a post
// @access   Private
export const postComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    const blog = await Blog.findOne({ slug: req.params.slug })

    const newComment = {
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    }

    blog.comments.unshift(newComment)

    await blog.save()

    res.json(blog.comments)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Greška na serveru')
  }
}

// @route    DELETE api/blogs/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
export const deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })

    // Pull out comment
    const comment = blog.comments.find(
      comment => comment.id === req.params.comment_id
    )

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Nepostojeći komentar' })
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Niste autorizovani' })
    }

    // Get remove index
    const removeIndex = blog.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id)

    blog.comments.splice(removeIndex, 1)

    await blog.save()

    res.json(blog.comments)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Greška na serveru')
  }
} */
