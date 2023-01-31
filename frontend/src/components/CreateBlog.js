import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setTitle, setAuthor, setUrl, reset } from '../reducers/blogReducer'

const CreateBlog = () => {
  const input = useSelector((state) => state.blog)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: input.title,
        author: input.author,
        url: input.url,
      }
      dispatch(createBlog(blog))

      setVisible(false)

      dispatch(reset())
      dispatch(setNotification(`${blog.title} by ${blog.author} added`))
    } catch (error) {
      dispatch(setNotification('title and author are required'))
    }
  }

  return (
    <div>
      {!visible ? (
        <button onClick={() => setVisible(true)}>Create new</button>
      ) : (
        <div>
          <h1>Create a new post</h1>
          <form onSubmit={handleCreate}>
            <div>
              Title:
              <input
                id="title"
                type="text"
                value={input.title}
                name="title"
                onChange={({ target }) => dispatch(setTitle(target.value))}
                placeholder="title"
              />
              Author:
              <input
                id="author"
                type="text"
                value={input.author}
                name="author"
                onChange={({ target }) => dispatch(setAuthor(target.value))}
                placeholder="author"
              />
              URL:
              <input
                id="url"
                type="text"
                value={input.url}
                name="url"
                onChange={({ target }) => dispatch(setUrl(target.value))}
                placeholder="url"
              />
              <button id="createButton" type="submit">
                Create
              </button>
            </div>
          </form>
          <button onClick={() => setVisible(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default CreateBlog
