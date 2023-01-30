import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blogsSorted = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogsSorted))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const user = blog.user.id
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    delete likedBlog.user
    likedBlog.user = user
    const res = await blogService.update(likedBlog.id, likedBlog)
    console.log(res)
    dispatch(initBlogs())
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(initBlogs())
  }
}

export const { appendBlog, setBlogs } = blogsSlice.actions
export default blogsSlice.reducer
