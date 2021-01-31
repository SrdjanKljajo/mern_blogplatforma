import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/sr' // without this line it didn't work
moment.locale('sr')

const SmallCard = ({ blog }) => {
  return (
    <div
      className='card my-2 shadow'
      style={{ backgroundColor: 'transparent' }}
    >
      <section className='pb-2'>
        Autor:{' '}
        <Link to={`/user/blogs/${blog.postedBy.name}`}>
          <span className='pl-2 text-primary'> {blog.postedBy.name}</span>
        </Link>
      </section>
      <section>
        <img
          className='img img-fluid imgSmallCard'
          src={`/api/blog/photo/${blog.slug}`}
          alt={blog.title}
        />
      </section>
      <div className='card-body py-2'>
        <a href={`/blogs/${blog.slug}`}>
          <h6 className='card-title text-primary font-italic'>{blog.title}</h6>
        </a>
      </div>
    </div>
  )
}

export default SmallCard
