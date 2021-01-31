const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = e => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <div className='container'>
      <input
        type='search'
        placeholder='Pretražite priče'
        value={keyword}
        onChange={handleSearchChange}
        className='form-control mb-4'
      />
    </div>
  )
}

export default LocalSearch
