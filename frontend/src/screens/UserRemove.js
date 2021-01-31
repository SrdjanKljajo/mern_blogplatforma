import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BlogRead from '../components/blog/BlogRead'

const UserRemove = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  const name = userInfo && userInfo.name
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 pt-5 pb-5'>
          <h3>obrišite priču</h3>
        </div>
        <div className='col-md-12'>
          <BlogRead username={name} />
        </div>
      </div>
    </div>
  )
}

export default UserRemove
