import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='bloglist'>
      <h2>blogs</h2>
      <ul>
        {blogs.map(blog => <li key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></li>)}
      </ul>
    </div>
  )
}

export default BlogList