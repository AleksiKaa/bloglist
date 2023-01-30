import { Routes, Route, Link } from 'react-router-dom'
import BlogList from './BlogList'
import LogOut from './LogOut'
import CreateBlog from './CreateBlog'
import Users from './Users'
import User from './User'
import Blog from './Blog'

const Menu = ({ username, blogs }) => {
  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Link style={padding} to="/">
                blogs
      </Link>
      <Link style={padding} to="/users">
                users
      </Link>

      <p>{username} logged in</p>
      <LogOut/>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <BlogList blogs={blogs} user={username}/>
              <CreateBlog/>
            </div>
          }
        />
        <Route
          path="/users"
          element={<Users/>}
        />
        <Route
          path="/users/:id"
          element={<User/>}
        />
        <Route
          path="/blogs/:id"
          element={<Blog user={username} blogs={blogs}/>}
        />
      </Routes>
    </div>
  )
}

export default Menu
