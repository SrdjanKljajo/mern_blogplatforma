import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Category from '../components/catTag/Category'
import Tag from '../components/catTag/Tag'

const CategoryTag = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && userInfo.isAdmin) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h4>dodavanje i brisanje tagova i kategorija</h4>
          </div>
          <div className='col-md-6 mb-5'>
            <Category />
          </div>
          <div className='col-md-6'>
            <Tag />
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryTag
