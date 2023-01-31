import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
  },
})

export const setNotification = (message) => {
  return async (dispatch) => {
    dispatch(set(message))
    setTimeout(() => dispatch(set(null)), 5000)
  }
}

export const { set } = notificationSlice.actions
export default notificationSlice.reducer
