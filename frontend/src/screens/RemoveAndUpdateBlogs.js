import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BlogRead from '../components/blog/BlogRead'

const RemoveAndUpdateBlogs = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && userInfo.isAdmin) {
      history.push('/login')
    }
  }, [history, userInfo])
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 pt-5 pb-5'>
          <h3>obrišite priču</h3>
        </div>
        <div className='col-md-12'>
          <BlogRead />
        </div>
      </div>
    </div>
  )
}

export default RemoveAndUpdateBlogs
