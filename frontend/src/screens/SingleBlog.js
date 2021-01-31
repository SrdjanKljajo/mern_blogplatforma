import ShowMore from '../components/blog/ShowMore'
import ShowSingleBlog from '../components/blog/ShowSingleBlog'

const SingleBlog = () => {
  return (
    <>
      <article className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <ShowSingleBlog />
          </div>
          <div className='container shadow p-3 mt-3'>
            <h4 className='text-center pb-3'>Pogledajte još</h4>
            <div className='row'>
              <ShowMore />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default SingleBlog
