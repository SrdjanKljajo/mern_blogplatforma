import fetch from 'isomorphic-fetch'

export const userPublicProfile = username => {
  return fetch(`/api/user/${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}
