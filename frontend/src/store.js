import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer:
    {
      users: usersReducer,
      user: userReducer,
      blog: blogReducer,
      blogs: blogsReducer,
      notification: notificationReducer
    }
})

export default store