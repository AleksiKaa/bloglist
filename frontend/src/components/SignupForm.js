import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import { setUsername, setPassword } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { resetFields } from '../reducers/userReducer'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      await loginService.signup({
        username: userState.username,
        password: userState.password,
      })
      dispatch(resetFields())
      dispatch(setNotification('Account successfully created'))
    } catch (e) {
      dispatch(setNotification('Username must be unique'))
    }
  }

  return (
    <div>
      <form id="signupform" onSubmit={handleSignup}>
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
        <button id="create-account" type="submit">
          Create account
        </button>
      </form>
      <p>
        Back to{' '}
        <Link to="/" onClick={() => dispatch(resetFields())}>
          login
        </Link>
        .
      </p>
    </div>
  )
}

export default SignUpForm
