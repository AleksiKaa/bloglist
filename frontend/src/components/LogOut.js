const LogOut = () => {
  return (
    <div>
      <form onSubmit={() => window.localStorage.removeItem('loggedBlogappUser')}>
        <button type="submit">
                    log out
        </button>
      </form>
    </div>
  )
}

export default LogOut