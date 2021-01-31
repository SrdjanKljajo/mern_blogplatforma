import { useState, useEffect } from 'react'
import { getCategories } from '../../functions/category'
import { Link } from 'react-router-dom'

const ShowCat = () => {
  const [values, setValues] = useState({
    name: '',
    categories: [],
  })

  const { categories } = values
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    getCategories()
      .then(data => {
        setValues({ ...values, name: '', categories: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <Link key={i} to={`/categories/${c.slug}`}>
          <button className='btn btn-outline-primary mr-1 ml-1 mt-3'>
            {c.name}
          </button>
        </Link>
      )
    })
  }

  return (
    <>
      <div>{showCategories()}</div>
    </>
  )
}

export default ShowCat
