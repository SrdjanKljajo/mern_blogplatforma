import { useState, useEffect } from 'react'
import { list } from '../../functions/blog'
import LocalSearch from '../forms/LocalSearch'
import Card from './Card'

const ShowBlogs = () => {
  const [keyword, setKeyword] = useState('')
  const [values, setValues] = useState({
    blogs: [],
  })

  const { blogs } = values

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = () => {
    list()
      .then(data => {
        setValues({ ...values, blogs: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const searched = keyword => blog => blog.title.toLowerCase().includes(keyword)

  return (
    <>
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      {blogs.filter(searched(keyword)).map(blog => (
        <article key={blog._id}>
          <Card blog={blog} />
          <hr />
        </article>
      ))}
    </>
  )
}

export default ShowBlogs
