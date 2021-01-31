import fetch from 'isomorphic-fetch'

export const create = async (category, token) => {
  try {
    const response = await fetch(`/api/tag`, {
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

export const getTags = async () => {
  try {
    const response = await fetch(`/api/tags`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const singleTag = async slug => {
  try {
    const response = await fetch(`/api/tag/${slug}`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const removeTag = async (slug, token) => {
  try {
    const response = await fetch(`/api/tag/${slug}`, {
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
