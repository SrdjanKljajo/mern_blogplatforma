import { useState, useEffect } from 'react'
import { listRelated } from '../../functions/blog'
import LocalSearch from '../forms/LocalSearch'
import SmallCard from './SmallCard'

const ShowRelated = ({ blog }) => {
  const [keyword, setKeyword] = useState('')
  const [related, setRelated] = useState([])

  const loadRelated = () => {
    listRelated({ blog }).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setRelated(data)
      }
    })
  }

  useEffect(() => {
    loadRelated()
  }, [])

  const searched = keyword => blog => blog.title.toLowerCase().includes(keyword)

  return (
    <>
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      {related.filter(searched(keyword)).map(blog => (
        <div className='col-lg-3 col-md-4 col-sm-6' key={blog._id}>
          <article>
            <SmallCard blog={blog} />
          </article>
        </div>
      ))}
    </>
  )
}

export default ShowRelated
