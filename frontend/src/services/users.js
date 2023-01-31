import axios from 'axios'
import blogService from './blogs'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const deleteUser = async (id) => {
  const config = { headers: { Authorization: blogService.getToken() } }

  try {
    await axios.delete(`${baseUrl}/${id}`, config)
  } catch (e) {
    console.log
  }
}

export default { getAll, deleteUser }
