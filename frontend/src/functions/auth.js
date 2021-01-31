import {
  USER_LOGOUT,
  USER_DETAILS_RESET,
  USER_LIST_RESET,
} from '../constants/userConstants'

export const handleResponse = response => {
  if (response.status === 401) {
    signout()
  }
}

export const signout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: USER_LIST_RESET })
  document.location.href = '/login'
}
