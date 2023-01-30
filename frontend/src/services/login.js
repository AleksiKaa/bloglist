import axios from 'axios'
const baseUrl = '/api'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const signup = async (credentials) => {
  const response = await axios.post(`${baseUrl}/users`, credentials)
  return response.data
}

export default { login, signup }
