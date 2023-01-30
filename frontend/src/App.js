import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { initBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import Menu from './components/Menu'


const App = () => {
  const notificationMessage = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const userState = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {notificationMessage}
      <h1>Blogs</h1>
      {userState.user === null ?
        <LoginForm/> :
        <Menu
          username={userState.user.username}
          blogs={blogs}
        />}
    </div>
  )
}

export default App
