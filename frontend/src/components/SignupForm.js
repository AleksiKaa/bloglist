import { /*Routes, Route,*/ Link } from 'react-router-dom'
//import LoginForm from './LoginForm'
//import { useDispatch, useSelector } from 'react-redux'
//import { /*login,*/ setUsername, setPassword } from '../reducers/userReducer'

const SignUpForm = () => {
  return (
    <div>
      <form id="signupform">
        <div>
        Username:
          <input
            id="username"
            type="text"
            value=""
            name="Username"
            //onChange
          />
        </div>
        <div>
        Password:
          <input
            id="password"
            type="password"
            value=""
            name="Password"
            //onChange
          />
        </div>
        <button id="create-account" type="submit">
            Create account
        </button>
      </form>
      <p>
        Back to <Link to="/">login</Link>.
      </p>
    </div>
  )
}

export default SignUpForm
