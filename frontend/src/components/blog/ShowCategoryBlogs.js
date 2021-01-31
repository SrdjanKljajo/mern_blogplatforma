import { Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { listCategoryBlogs } from '../../functions/blog'
import moment from 'moment'
import 'moment/locale/sr' // without this line it didn't work
import Rating from './Rating'
moment.locale('sr') // moment srpski

const ShowCategoryBlogs = () => {
  const match = useRouteMatch()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = () => {
    listCategoryBlogs(match.params.slug).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setBlogs(data)
      }
    })
  }

  const showAllBlogs = () => {
    const category = match.params.name
    return blogs.map((blog, i) => {
      const blogExcerpt = () => {
        return { __html: blog.excerpt }
      }

      return (
        <div key={i} className='pb-3'>
          {category === blog.categories.slug ? (
            <>
              <Link to={`/blogs/${blog.slug}`}>
                <h3 className='text-primary text-right'>
                  {blog.title.toLowerCase()}
                </h3>
              </Link>
              <p className='lead ml-1 py-3'>
                Autor{' '}
                <Link to={`/user/blogs/${blog.postedBy.name}`}>
                  <span className='text-primary'>{blog.postedBy.name}</span>
                </Link>{' '}
                | Kreirano {moment(blog.createdAt).fromNow()}
              </p>
              <div className='row'>
                <div className='col-md-4'>
                  <section>
                    <img
                      className='img img-fluid img-card shadow  mb-4'
                      src={`/api/blog/photo/${blog.slug}`}
                      alt={blog.title}
                    />
                  </section>
                </div>
                <div className='col-md-8'>
                  <div
                    dangerouslySetInnerHTML={blogExcerpt()}
                    className='pb-3 lead'
                  ></div>
                  <Link to={`/blogs/${blog.slug}`}>
                    <h6 className='text-light pt-2'>Pročitajte više...</h6>
                  </Link>
                </div>
                <div className='my-3 text-right pl-2'>
                  <Rating
                    value={blog.rating}
                    text={` od ukupno ocena: ${blog.numReviews}`}
                  />
                </div>
              </div>
              <hr />
            </>
          ) : null}
        </div>
      )
    })
  }

  return (
    <>
      <div className='row'>
        <div className='col-md-12'>{showAllBlogs()}</div>
      </div>
    </>
  )
}

export default ShowCategoryBlogs
