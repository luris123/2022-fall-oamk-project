import axios from 'axios'
const baseUrl = 'https://group5-visualizationtool.onrender.com'

const login = async credentials => {
  const response = await axios.post(baseUrl+'/login', credentials)
  return response.data
}

const register = async credentials => {
  const response = await axios.post(baseUrl+'/users', credentials)
  return response.data
}

const deleteAccount = async (credentials) => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  const response = await axios.post(baseUrl+'/users/deleteUser', credentials, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
    },
  })
  return response.data
}

const exportedObject = { login, register, deleteAccount }

export default exportedObject 