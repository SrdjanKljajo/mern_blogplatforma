import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShowTop from '../components/blog/ShowTop'
import Card from '../components/blog/Card'
import { listProducts } from '../actions/blogActions'
import Paginate from '../components/Paginate'
import ShowMore from '../components/blog/ShowMore'

const Blogs = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, blogs, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <div className='shadow'>
        <header className='container-fluid my-2'>
          <div className='col-md-12 pt-3 shadow'>
            <h3 className='text-center py-4'>najnovije</h3>
          </div>
        </header>
        <div className='container'>
          {blogs.map(blog => (
            <article key={blog._id}>
              <Card blog={blog} />
              <hr />
            </article>
          ))}
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </div>
        <div className='container shadow p-3 mt-5'>
          <h4 className='text-center py-4'>Najbolje ocenjene priče</h4>
          <div className='row'>
            <ShowTop />
          </div>
        </div>
        <div className='container shadow p-3 mt-5'>
          <h4 className='text-center py-2'>Pogledajte još</h4>
          <div className='row'>
            <ShowMore />
          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs
