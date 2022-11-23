import axios from 'axios'
const baseUrl = 'http://localhost:3001'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const login = async credentials => {
  const response = await axios.post(baseUrl+'/login', credentials)
  console.log(response.data)
  return response.data
}

const register = async credentials => {
  const response = await axios.post(baseUrl+'/users', credentials)
  return response.data
}

const exportedObject = { login, register, setToken }

export default exportedObject 