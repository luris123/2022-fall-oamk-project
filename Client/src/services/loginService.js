import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const login = async credentials => {
  const response = await axios.post(baseUrl+'/login', credentials)
  return response.data
}

const register = async credentials => {
  const response = await axios.post(baseUrl+'/users', credentials)
  return response.data
}

const exportedObject = { login, register }

export default exportedObject 