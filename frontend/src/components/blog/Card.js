import { Link } from 'react-router-dom'
import Rating from './Rating'
import moment from 'moment'
import 'moment/locale/sr' // without this line it didn't work
moment.locale('sr') // moment srpski

const Card = ({ blog }) => {
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

  const blogExcerpt = () => {
    return { __html: blog.excerpt }
  }

  return (
    <div className='lead p-2 my-4 shadow'>
      <header>
        <Link to={`/blogs/${blog.slug}`}>
          <h3 className='text-primary text-center'>
            {blog.title.toLowerCase()}
          </h3>
        </Link>
      </header>
      <section>
        <p className='ml-1 py-3'>
          Autor{' '}
          <Link to={`/user/blogs/${blog.postedBy.name}`}>
            <span className='text-primary'>{blog.postedBy.name}</span>
          </Link>{' '}
          | Kreirano {moment(blog.createdAt).fromNow()}
        </p>
      </section>
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
          <section>
            <div dangerouslySetInnerHTML={blogExcerpt()} className='pb-3'></div>
            <Link to={`/blogs/${blog.slug}`}>
              <h6 className='text-light pt-2'>Pročitajte više...</h6>
            </Link>
          </section>
          <div className='my-3 text-right pr-2'>
            <Rating
              value={blog.rating}
              text={` od ukupno ocena: ${blog.numReviews}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
