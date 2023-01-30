const Blog = require("../models/blog")
const User = require("../models/user")


const initialBlogs = [
    {
        title: "testBlog",
        author: "test",
        url: "test",
        likes: 0
    },
    {
        title: "testBlog2",
        author: "test2",
        url: "test2",
    }
]

const notesInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, notesInDb, usersInDb
}