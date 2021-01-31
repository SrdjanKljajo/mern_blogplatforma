import { useState, useEffect } from 'react'
import { create, getTags, removeTag } from '../../functions/tag'
import { useSelector } from 'react-redux'

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
  })

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const { name, error, success, tags } = values
  const token = userInfo.token

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
        <button
          onDoubleClick={() => deleteConfirm(t.slug)}
          title='Kliknite dva puta da obrišete'
          key={i}
          className='btn btn-outline-light mr-1 ml-1 mt-3'
        >
          {t.name}
        </button>
      )
    })
  }

  const deleteConfirm = slug => {
    let answer = window.confirm(
      'Ova operacija je nepovratna! Da li ste sigurni da želite brisanje taga?'
    )
    if (answer) {
      deleteTag(slug)
    }
  }

  const deleteTag = slug => {
    removeTag(slug, token)
      .then(() => {
        setValues({
          ...values,
          error: false,
          success: false,
        })
        loadTags()
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
        loadTags()
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
      return <p className='text-success'>Tag is created</p>
    }
  }

  const showError = () => {
    if (error) {
      return <p className='text-danger'>Tag already exist</p>
    }
  }

  const mouseMoveHandler = e => {
    setValues({ ...values, error: false, success: false, removed: '' })
  }

  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label>Naziv taga</label>
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
          Kreirajte tag
        </button>
      </div>
    </form>
  )

  return (
    <>
      {showSuccess()}
      {showError()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </>
  )
}

export default Tag
