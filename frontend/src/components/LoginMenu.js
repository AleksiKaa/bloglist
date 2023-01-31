import { Routes, Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

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
