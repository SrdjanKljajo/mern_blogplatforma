import fetch from 'isomorphic-fetch'

export const create = async (category, token) => {
  try {
    const response = await fetch(`/api/category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getCategories = async () => {
  try {
    const response = await fetch(`/api/categories`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const singleCategory = async slug => {
  try {
    const response = await fetch(`/api/category/${slug}`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const removeCategory = async (slug, token) => {
  try {
    const response = await fetch(`/api/category/${slug}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}
