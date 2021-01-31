import ShowMore from '../components/blog/ShowMore'
import ShowUserBlogs from '../components/blog/ShowUserBlogs'

const UserBlogs = ({ match }) => {
  const user = match.params.name
  return (
    <div className='container'>
      <h3 className='my-5 py-3 text-center shadow'>priče korisnika {user}</h3>

      <div className='row'>
        <div className='col-md-12'>
          <ShowUserBlogs />
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

export default UserBlogs
