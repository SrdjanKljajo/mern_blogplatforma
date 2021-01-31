import { useState, useEffect } from 'react'
import { create, getCategories, removeCategory } from '../../functions/category'
import { useSelector } from 'react-redux'

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
  })

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const { name, error, success, categories } = values
  const token = userInfo.token

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
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title='Dupli klik za brisanje kategorije'
          key={i}
          className='btn btn-outline-danger mr-1 ml-1 mt-3'
        >
          {c.name}
        </button>
      )
    })
  }

  const deleteConfirm = slug => {
    let answer = window.confirm(
      'Ova akcija je nepovratna! Da li ste sigurni da želite da obrišete kategoriju?'
    )
    if (answer) {
      deleteCategory(slug)
    }
  }

  const deleteCategory = slug => {
    removeCategory(slug, token)
      .then(() => {
        setValues({
          ...values,
          error: false,
          success: false,
        })
        loadCategories()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const clickSubmit = e => {
    e.preventDefault()
    create({ name }, token)
      .then(() => {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
        })
        loadCategories()
      })
      .catch(err => {
        console.log(err)
        setValues({
          ...values,
          error: true,
        })
      })
  }

  const handleChange = e => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
    })
  }

  const showSuccess = () => {
    if (success) {
      return <p className='text-success'>Kategorija je uspešno kreirana</p>
    }
  }

  const showError = () => {
    if (error) {
      return <p className='text-danger'>Kategorija već postoji</p>
    }
  }

  const mouseMoveHandler = e => {
    setValues({ ...values, error: false, success: false })
  }

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label>Naziv kategorije</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button type='submit' className='btn btn-primary'>
          Kreirajte kategoriju
        </button>
      </div>
    </form>
  )

  return (
    <>
      {showSuccess()}
      {showError()}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        {showCategories()}
      </div>
    </>
  )
}

export default Category
