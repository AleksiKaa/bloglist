const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require('./test_helper')
const { response } = require('../app')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe("blogs get request tests", () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs id field is defined', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].id).toBeDefined()
    })

})

describe("blogs post request tests", () => {

    test("new blogs can be posted", async () => {

        const newBlog = {
            title: "testBlog3",
            author: "test3",
            url: "test3",
            likes: 10
        }

        const len = helper.initialBlogs.length

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const res = await api.get("/api/blogs")

        expect(res.body).toHaveLength(len + 1)
    })

    test("field likes has the default value 0", async () => {

        const newBlog = {
            title: "testBlog4",
            author: "test4",
            url: "test4",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const res = await (await api.get("/api/blogs")).body

        const lastAdded = res[res.length - 1]

        expect(lastAdded.likes).toBe(0)
    })

    test("response status is 400 with bad input on post", async () => {

        const newBlog = {
            url: "test4",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

})

describe("blogs delete request tests", () => {

    test("blogs can be deleted from the database", async () => {

        const blogsAtStart = await helper.notesInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.notesInDb()
        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const authors = blogsAtEnd.map(b => b.author)

        console.log(authors)
        console.log(blogToDelete.author)

        expect(authors).not.toContain(blogToDelete.author)
    })

    test("response status is 400 with wrong id on delete request", async () => {

        await api
            .delete('/api/blogs/vääräidlol')
            .expect(400)
    })
})

describe("blogs put request tests", () => {

    test("blogs in the database can be modified", async () => {

        let res = await api.get("/api/blogs")
        let body = res.body
        const id = body[0].id

        await api
            .put(`/api/blogs/${id}`)
            .send({ likes: 100 })
            .expect(200)

        res = await api.get("/api/blogs")
        body = res.body

        expect(body[0].likes).toBe(100)
    })

    test("response status is 400 with wrong id on put request", async () => {

        await api
            .delete('/api/blogs/vääräidlol')
            .expect(400)
    })

})

describe('User creation tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test("username must be unique", async () => {
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')
    })

    test("username must be atleast 3 characters long", async () => {
        const newUser = {
            username: 'ml',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username and password must be atleast 3 characters long')

    })

    test("password must be atleast 3 characters long", async () => {
        const newUser = {
            username: 'mlasdasdad',
            name: 'Matti Luukkainen',
            password: 'sa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username and password must be atleast 3 characters long')
    })
})

afterAll(() => {
    mongoose.connection.close()
})