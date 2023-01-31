const LogOut = () => {
  return (
    <div>
      <form
        onSubmit={() => window.localStorage.removeItem('loggedBlogappUser')}
      >
        <button type="submit">Log out</button>
      </form>
    </div>
  )
}

export default LogOut
