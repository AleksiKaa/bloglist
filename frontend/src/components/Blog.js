import { useParams } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)
  if (!blog) {
    return null
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(id))
        dispatch(setNotification(`Deleted ${blog.title}`))
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleLike = async (event) => {
    event.preventDefault()
    try {
      dispatch(likeBlog(blog))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} Likes</p>
      <form onSubmit={handleLike}>
        <button type="submit">Like</button>
      </form>
      <p>Added by {blog.user.name ? blog.user.name : blog.user.username}</p>
      {user.user.username === blog.user.username ? (
        <form onSubmit={handleDelete}>
          <button type="submit">Delete blog</button>
        </form>
      ) : null}
    </div>
  )
}

export default Blog
