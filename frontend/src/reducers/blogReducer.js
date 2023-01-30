import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
  url: '',
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {
    setTitle(state, action) {
      return { ...state, title: action.payload }
    },
    setAuthor(state, action) {
      return { ...state, author: action.payload }
    },
    setUrl(state, action) {
      return { ...state, url: action.payload }
    },
    reset() {
      return { ...initialState }
    }
  }
})

export const { setTitle, setAuthor, setUrl, reset } = blogSlice.actions
export default blogSlice.reducer
