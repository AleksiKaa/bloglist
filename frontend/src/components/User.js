import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser } from '../reducers/usersReducer'
import { useNavigate } from 'react-router-dom'
import { reset } from '../reducers/userReducer'
import { deleteBlog, initBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const User = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const sessionUser = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const navigate = useNavigate()

  const id = useParams().id
  const user = users.find((n) => n.id === id)
  if (!user) {
    return null
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(reset())
    navigate('/')
  }

  const handleDeleteAccount = async (event) => {
    event.preventDefault()
    if (window.confirm('Delete this account?')) {
      try {
        blogs.forEach((blog) => {
          if (blog.user.id === user.id) {
            dispatch(deleteBlog(blog.id))
          }
        })
        dispatch(initBlogs())
        dispatch(deleteUser(user.id))
      } catch (e) {
        console.log(e)
      } finally {
        logOut()
        dispatch(setNotification('Account deleted'))
      }
    }
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
