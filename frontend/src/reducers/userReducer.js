import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    username: '',
    password: ''
  },
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload }
    },
    setPassword(state, action) {
      return { ...state, password: action.payload }
    },
    setUser(state, action) {
      return { ...state, user: action.payload }
    }
  }
})

export const login = (user) => {
  return async dispatch => {
    dispatch(setUser(user))
    dispatch(setUsername(''))
    dispatch(setPassword(''))
  }
}

export const { setUsername, setPassword, setUser } = userSlice.actions
export default userSlice.reducer