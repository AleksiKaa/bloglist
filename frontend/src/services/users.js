import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const deleteUser = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, deleteUser }
