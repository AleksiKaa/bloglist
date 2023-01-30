import PropTypes from 'prop-types'

const HiddenTable = ({ blog, like, setVisible, deleteBlog, user }) => {
  return (
    <div>
      <ul>
        <li>
          URL: <a href={blog.url}>{blog.url}</a>
        </li>
        <li className="likes">
          Likes: {blog.likes}
          <form onSubmit={() => like(blog)}>
            <button className="likeButton" type="submit">
              like
            </button>
          </form>
        </li>
        <li>Author: {blog.user.name}</li>
        {user === blog.user.username ? (
          <form onSubmit={() => deleteBlog(blog.id)}>
            <button className="removeButton" type="submit">
              remove
            </button>
          </form>
        ) : (
          <p></p>
        )}
        <button onClick={() => setVisible(false)}>hide</button>
      </ul>
    </div>
  )
}

HiddenTable.propTypes = {
  setVisible: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default HiddenTable
