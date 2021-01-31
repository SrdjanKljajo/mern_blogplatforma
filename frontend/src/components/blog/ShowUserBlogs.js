import { Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { list } from '../../functions/blog'
import moment from 'moment'
import 'moment/locale/sr' // without this line it didn't work
import Rating from './Rating'
moment.locale('sr') // moment srpski

const ShowUserBlogs = ({ name }) => {
  const match = useRouteMatch()
  const [blogs, setBlogs] = useState([])

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

  const showAllBlogs = () => {
    const user = match.params.name
    return blogs.map((blog, i) => {
      const blogExcerpt = () => {
        return { __html: blog.excerpt }
      }

      const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
          <Link key={i} to={`/categories/${c.slug}`}>
            <button key={i} className='btn btn-outline-primary mr-1 ml-1 mt-3'>
              {c.name}
            </button>
          </Link>
        ))

      const showBlogTags = blog =>
        blog.tags.map((t, i) => (
          <Link key={i} to={`/tags/${t.slug}`}>
            <button key={i} className='btn btn-outline-light mr-1 ml-1 mt-3'>
              {t.name}
            </button>
          </Link>
        ))

      return (
        <div key={i} className='pb-2'>
          {user === blog.postedBy.name ? (
            <>
              <Link to={`/blogs/${blog.slug}`}>
                <h3 className='text-primary text-right'>
                  {blog.title.toLowerCase()}
                </h3>
              </Link>

              <p className='lead mt-3'>
                Kreirano {moment(blog.createdAt).fromNow()}
              </p>
              <section>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
                <br />
                <br />
              </section>
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

export default ShowUserBlogs
