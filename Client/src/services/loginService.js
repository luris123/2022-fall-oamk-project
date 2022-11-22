import axios from 'axios'
const baseUrl = 'http://localhost:3001/login'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const exportedObject = { login, setToken }

export default exportedObject 