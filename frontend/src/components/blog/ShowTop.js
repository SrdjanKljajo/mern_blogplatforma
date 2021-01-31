import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listTopBlogs } from '../../actions/blogActions'
import Rating from './Rating'

const ShowTop = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector(state => state.productTopRated)
  const { blogs } = productTopRated

  useEffect(() => {
    dispatch(listTopBlogs())
  }, [dispatch])

  return (
    <>
      {blogs.map(blog => (
        <div className='col-lg-3 col-md-4 col-sm-6 my-2 shadow' key={blog._id}>
          <section className='pb-2'>
            Autor:{' '}
            <Link to={`/user/blogs/${blog.postedBy.name}`}>
              <span className='pl-2 text-primary'> {blog.postedBy.name}</span>
            </Link>
          </section>
          <section>
            <img
              className='img img-fluid imgSmallCard pb-2'
              src={`/api/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </section>
          <div>
            <Rating value={blog.rating} />
            <a href={`/blogs/${blog.slug}`}>
              <h5 className='text-primary font-italic pt-2'>{blog.title}</h5>
            </a>
          </div>
        </div>
      ))}
    </>
  )
}

export default ShowTop
