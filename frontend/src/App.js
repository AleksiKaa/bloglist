import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LogOut from './components/LogOut'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const ref = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    }
    catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const like = async (blog) => {

    // eslint-disable-next-line no-undef
    const updated = structuredClone(blog)
    delete updated.user
    updated.user = blog.user.id
    updated.likes += 1
    await blogService.update(blog.id, updated)
  }

  const addBlog = async (blog) => {
    await blogService.create(blog)
    setBlogs(await blogService.getAll())
  }

  return (
    <div>
      {errorMessage}
      <h1>Blogs</h1>

      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /> :
        <div>
          <p>{user.name} logged in</p>
          <LogOut/>
          <BlogList
            blogs={blogs}
            like={like}
            user={user.username}
          />
          <Togglable buttonLabel="create new blog" ref={ref}>
            <CreateBlog
              setErrorMessage={setErrorMessage}
              setVisible={ref}
              addBlog={addBlog}
            />
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App
