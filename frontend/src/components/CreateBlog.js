import { useState } from 'react'

const CreateBlog = ({ setVisible, setErrorMessage, addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    try {

      const blog = {
        title: title,
        author: author,
        url: url
      }

      await addBlog(blog)

      setVisible.current.toggleVisibility()

      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage(`${title} by ${author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (e) {
      setErrorMessage('Title and author are required')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleCreate}>
        <div>
                    title:
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
                    author:
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
                    url:
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
          <button id="createButton" type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog