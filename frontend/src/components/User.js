import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.users)
  const sessionUser = useSelector((state) => state.user)
  const id = useParams().id
  const user = users.find((n) => n.id === id)
  if (!user) {
    return null
  }

  const handleDeleteAccount = async (event) => {
    event.preventDefault()
    console.log('DELETE')
  }

  return (
    <div>
      <h2>Blogs posted by {user.username}</h2>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>
              {b.title} by {b.author}
            </Link>
          </li>
        ))}
      </ul>
      {user.username === sessionUser.user.username ? (
        <form onSubmit={handleDeleteAccount}>
          <div>
            <button id="deleteAccount" type="submit">
              Delete account
            </button>
          </div>
        </form>
      ) : null}
    </div>
  )
}

export default User
