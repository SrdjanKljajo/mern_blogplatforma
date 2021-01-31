import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BlogCreate from '../components/blog/BlogCreate'

const NewBlog = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-12 pt-5 pb-5'>
          <h2>napišite novu priču</h2>
        </div>
        <div className='col-md-12'>
          <BlogCreate />
        </div>
      </div>
    </div>
  )
}

export default NewBlog
