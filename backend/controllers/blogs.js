const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    //const token = getTokenFrom(request)
    const token = request.root
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
    const token = request.root

    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(token, process.env.SECRET)


    if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
})

blogsRouter.put("/:id", async (request, response) => {
    const body = await request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blog)
})

module.exports = blogsRouter