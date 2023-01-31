import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const userList = useSelector((state) => state.users)

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blog posts created</th>
          </tr>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
