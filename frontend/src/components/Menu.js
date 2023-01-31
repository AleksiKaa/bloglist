import { Routes, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogList from './BlogList'
import LogOut from './LogOut'
import CreateBlog from './CreateBlog'
import Users from './Users'
import User from './User'
import Blog from './Blog'

const Menu = ({ username, blogs }) => {
  const users = useSelector((state) => state.users)
  if (!username || username === '') {
    return null
  }
  const padding = {
    padding: 5,
  }

  const getUserId = () => {
    try {
      return users.find((u) => u.username === username).id
    } catch (e) {
      console.log(e)
    }
  }

  const userId = getUserId()

  return (
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      <Link style={padding} to={`/users/${userId}`}>
        My profile
      </Link>
      <p>Logged in as {username}</p>
      <LogOut />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <BlogList blogs={blogs} user={username} />
              <CreateBlog />
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={<Blog user={username} blogs={blogs} />}
        />
      </Routes>
    </div>
  )
}

export default Menu
