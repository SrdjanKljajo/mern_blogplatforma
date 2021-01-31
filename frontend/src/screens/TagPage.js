import ShowMore from '../components/blog/ShowMore'
import ShowTagBlogs from '../components/blog/ShowTagBlogs'

const TagPage = ({ match }) => {
  const tag = match.params.slug
  return (
    <div className='container'>
      <h3 className='my-5 py-3 text-center shadow'>Tag - {tag}</h3>

      <div className='row'>
        <div className='col-md-12'>
          <ShowTagBlogs />
        </div>
        <div className='container shadow p-3 mt-3'>
          <h4 className='text-center pb-3'>Pogledajte još</h4>
          <div className='row'>
            <ShowMore />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagPage
