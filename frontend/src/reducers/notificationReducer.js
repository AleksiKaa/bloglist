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

/*
export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(set(message))
        dispatch(clearTime())
        dispatch(setTime(setTimeout(() => dispatch(set(null)), time * 1000)))
    }
}
*/

export const setNotification = (message) => {
  return async dispatch => {
    dispatch(set(message))
    setTimeout(() => dispatch(set(null)), 5000)
  }
}


export const { set } = notificationSlice.actions
export default notificationSlice.reducer