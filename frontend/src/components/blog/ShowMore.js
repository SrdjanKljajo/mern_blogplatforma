import { useState, useEffect } from 'react'
import { list } from '../../functions/blog'
import LocalSearch from '../forms/LocalSearch'
import SmallCard from './SmallCard'

const ShowMore = () => {
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
      {blogs
        .filter(searched(keyword))
        .slice(0, 4)
        .map(blog => (
          <div className='col-lg-3 col-md-4 col-sm-6' key={blog._id}>
            <article>
              <SmallCard blog={blog} />
            </article>
          </div>
        ))
        .sort(() => Math.random() - 0.5)}
    </>
  )
}

export default ShowMore
