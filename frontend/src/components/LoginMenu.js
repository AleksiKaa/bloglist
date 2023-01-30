import { Routes, Route, Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useDispatch, useSelector } from 'react-redux'
import { /*login,*/ setUsername, setPassword } from '../reducers/userReducer'
//import { setNotification } from '../reducers/notificationReducer'

const LoginMenu = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default LoginMenu
