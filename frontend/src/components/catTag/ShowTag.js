import { useState, useEffect } from 'react'
import { getTags } from '../../functions/tag'
import { Link } from 'react-router-dom'

const ShowTag = () => {
  const [values, setValues] = useState({
    name: '',
    tags: [],
  })

  const { tags } = values
  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = () => {
    getTags()
      .then(data => {
        setValues({ ...values, name: '', tags: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const showTags = () => {
    return tags.map((t, i) => {
      return (
        <Link key={i} to={`/tags/${t.slug}`}>
          <button className='btn btn-outline-light mr-1 ml-1 mt-3'>
            {t.name}
          </button>
        </Link>
      )
    })
  }

  return (
    <>
      <div>{showTags()}</div>
    </>
  )
}

export default ShowTag
