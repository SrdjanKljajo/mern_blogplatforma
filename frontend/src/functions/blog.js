import fetch from 'isomorphic-fetch'

export const singleBlog = async slug => {
  try {
    const response = await fetch(`/api/blog/${slug}`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

/*export const listRelated = blog => {
  return fetch(`/api/blogs/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}*/

export const list = async name => {
  let listBlogsEndpoint
  if (name) {
    listBlogsEndpoint = `/api/${name}/blogs`
  } else {
    listBlogsEndpoint = `/api/blogs`
  }
  try {
    const response = await fetch(`${listBlogsEndpoint}`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const listCategoryBlogs = async slug => {
  let listBlogsEndpoint
  if (slug) {
    listBlogsEndpoint = `/api/blogs/category/${slug}`
  } else {
    listBlogsEndpoint = `/api/blogs`
  }
  try {
    const response = await fetch(`${listBlogsEndpoint}`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const listTagBlogs = async slug => {
  let listBlogsEndpoint
  if (slug) {
    listBlogsEndpoint = `/api/blogs/tag/${slug}`
  } else {
    listBlogsEndpoint = `/api/blogs`
  }
  try {
    const response = await fetch(`${listBlogsEndpoint}`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}
