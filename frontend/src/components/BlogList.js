import Blog from './Blog'

const BlogList = ({ blogs, like, user }) => {

  return (
    <div className='bloglist'>
      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id}  blog={blog} like={like} user={user}/>
      )}
    </div>
  )
}

export default BlogList