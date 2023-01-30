import { useState } from 'react'
import ViewButton from './ViewButton'
import HiddenTable from './HiddenTable'
import blogService from '../services/blogs'

const Blog = ({ blog, like, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const deleteBlog = async () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    await blogService.remove(blog.id)
  }

  return (
    <div className="blog" style={blogStyle}>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      {!visible ?
        <ViewButton setVisible={setVisible} /> :
        <HiddenTable blog={blog} like={like} setVisible={setVisible} deleteBlog={deleteBlog} user={user} />}
    </div>
  )
}

export default Blog