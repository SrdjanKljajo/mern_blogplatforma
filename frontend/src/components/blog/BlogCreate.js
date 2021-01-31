import { useState, useEffect, useRef } from 'react'
import fetch from 'isomorphic-fetch'
import { handleResponse } from '../../functions/auth'
import { getCategories } from '../../functions/category'
import { getTags } from '../../functions/tag'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { QuillFormats, QuillModules } from '../../helpers/quill'
import ReactQuill from 'react-quill'
import '../../../node_modules/react-quill/dist/quill.snow.css'

const BlogCreate = ({ router }) => {
  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    title: '',
  })

  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  const [checked, setChecked] = useState([]) // categories
  const [checkedTag, setCheckedTag] = useState([]) // tags

  const { error, success, formData, title } = values
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const token = userInfo.token

  let timerID = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  useEffect(() => {
    setValues({
      ...values,
      formData: new FormData(),
    })
    initCategories()
    initTags()
  }, [router])

  const createBlog = async (blog, token) => {
    let createBlogEndpoint
    if (userInfo && userInfo.isAdmin) {
      createBlogEndpoint = `/api/blog`
    } else if (userInfo) {
      createBlogEndpoint = `/api/user/blog`
    }

    try {
      const response = await fetch(`${createBlogEndpoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: blog,
      })
      handleResponse(response)
      return response.json()
    } catch (err) {
      return console.log(err)
    }
  }

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setCategories(data)
      }
    })
  }

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setTags(data)
      }
    })
  }

  const publishBlog = e => {
    e.preventDefault()
    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `Članak "${data.title}" je kreiran`,
        })
        setCategories([])
        setTags([])
      }
      if (!data.error) {
        timerID = setTimeout(() => {
          window.location = '/blogs'
        }, 2500)
      }
    })
  }

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value, formData, error: '' })
  }

  const handleCategoriesToggle = c => () => {
    setValues({ ...values, error: '' })
    // return the first index or -1
    const clickedCategory = checked.indexOf(c)
    const all = [...checked]

    if (clickedCategory === -1) {
      all.push(c)
    } else {
      all.splice(clickedCategory, 1)
    }

    setChecked(all)
    formData.set('categories', all)
  }

  const handleTagsToggle = t => () => {
    setValues({ ...values, error: '' })
    // return the first index or -1
    const clickedTag = checkedTag.indexOf(t)
    const all = [...checkedTag]

    if (clickedTag === -1) {
      all.push(t)
    } else {
      all.splice(clickedTag, 1)
    }

    setCheckedTag(all)
    formData.set('tags', all)
  }

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleCategoriesToggle(c._id)}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label'>{c.name}</label>
        </li>
      ))
    )
  }

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleTagsToggle(t._id)}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label'>{t.name}</label>
        </li>
      ))
    )
  }

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      {success}
    </div>
  )

  const handleBody = e => {
    formData.set('body', e)
  }

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <label>Naslov priče</label>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={handleChange('title')}
          />
        </div>

        <div className='form-group text-dark bg-light'>
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            onChange={handleBody}
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary'>
            Objavite priču
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className=' pb-5'>
      <div className='row'>
        <div className='col-md-8'>
          {createBlogForm()}
          <div className='pt-3'>
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Fotografija priče</h5>
              <hr />

              <p>Max veličina: 1mb</p>
              <label className='btn btn-outline-light input-photo'>
                Naslovna fotografija
                <input
                  onChange={handleChange('photo')}
                  type='file'
                  accept='image/*'
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Kategorije</h5>
            <hr />
            <ul className='cat-tag-list'>{showCategories()}</ul>
          </div>
          <div>
            <h5>Tagovi</h5>
            <hr />
            <ul className='cat-tag-list'>{showTags()}</ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(BlogCreate)
