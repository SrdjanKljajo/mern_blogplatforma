import ShowCategoryBlogs from '../components/blog/ShowCategoryBlogs'
import ShowMore from '../components/blog/ShowMore'

const CategoryPage = ({ match }) => {
  const category = match.params.slug
  return (
    <div className='container'>
      <h3 className='my-5 py-3 text-center shadow'>kategorija - {category}</h3>

      <div className='row'>
        <div className='col-md-12'>
          <ShowCategoryBlogs />
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

export default CategoryPage
