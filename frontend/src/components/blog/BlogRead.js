import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { list } from '../../functions/blog'
import { handleResponse } from '../../functions/auth'
import moment from 'moment'
import 'moment/locale/sr' // without this line it didn't work
import LocalSearch from '../forms/LocalSearch'
moment.locale('sr') // moment srpski

const BlogRead = ({ name }) => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [keyword, setKeyword] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const token = userInfo.token

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = () => {
    list(name).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setBlogs(data)
      }
    })
  }

  const removeBlog = async (slug, token) => {
    let deleteBlogEndpoint

    if (userInfo && userInfo.isAdmin) {
      deleteBlogEndpoint = `/api/blog/${slug}`
    } else if (userInfo) {
      deleteBlogEndpoint = `/api/user/blog/${slug}`
    }

    try {
      const response = await fetch(`${deleteBlogEndpoint}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      handleResponse(response)
      return await response.json()
    } catch (err) {
      return console.log(err)
    }
  }

  const deleteBlog = slug => {
    removeBlog(slug, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setMessage(data.message)
        loadBlogs()
      }
    })
  }

  const deleteConfirm = slug => {
    let answer = window.confirm(
      'Ova akcija je nepovratna. Da li ste sigurni da želite da obrišete članak?'
    )
    if (answer) {
      deleteBlog(slug)
    }
  }

  const showAllBlogs = () => {
    return blogs.filter(searched(keyword)).map((blog, i) => {
      return (
        <div key={i} className='pb-5'>
          <h3>{blog.title}</h3>

          <p className='lead mt-3'>
            Autor{' '}
            <Link to={`/user/blogs/${blog.postedBy.name}`}>
              <span className='text-primary'>{blog.postedBy.name}</span>
            </Link>{' '}
            | Kreirano {moment(blog.createdAt).fromNow()}
          </p>
          {userInfo && userInfo.name === blog.postedBy.name ? (
            <button
              className='btn btn-sm btn-danger'
              onClick={() => deleteConfirm(blog.slug)}
            >
              Obrišite priču
            </button>
          ) : (
            userInfo &&
            userInfo.isAdmin && (
              <button
                className='btn btn-sm btn-danger'
                onClick={() => deleteConfirm(blog.slug)}
              >
                Obrišite priču
              </button>
            )
          )}
        </div>
      )
    })
  }

  const searched = keyword => blog => blog.title.toLowerCase().includes(keyword)

  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          {message && <div className='alert alert-danger'>{message}</div>}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {showAllBlogs()}
        </div>
      </div>
    </>
  )
}

export default BlogRead
