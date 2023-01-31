import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)
  if (!blog) {
    return null
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      await blogService.remove(blog.id)
  }

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} Likes</p>
      <form onSubmit={() => dispatch(likeBlog(blog))}>
        <button type="submit">like</button>
      </form>
      <p>Added by {blog.user.name ? blog.user.name : blog.user.username}</p>
      {user.user.username === blog.user.username ? (
        <form onSubmit={() => deleteBlog()}>
          <button type="submit">Delete blog</button>
        </form>
      ) : null}
    </div>
  )
}

export default Blog
