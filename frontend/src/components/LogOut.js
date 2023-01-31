import { useNavigate } from 'react-router-dom'

const LogOut = () => {
  const navigate = useNavigate()

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={logOut}>
        <button type="submit">Log out</button>
      </form>
    </div>
  )
}

export default LogOut
