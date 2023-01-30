import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { login, setUsername, setPassword } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { resetFields } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: userState.username,
        password: userState.password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(login(user))
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }

  return (
    <div>
      <form id="loginform" onSubmit={handleLogin}>
        <div>
          Username:
          <input
            id="username"
            type="text"
            value={userState.username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          Password:
          <input
            id="password"
            type="password"
            value={userState.password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
      <p>
        Don&apos;t have an account? Sign up{' '}
        <Link to="/signup" onClick={() => dispatch(resetFields())}>
          here
        </Link>
        .
      </p>
    </div>
  )
}

export default LoginForm
