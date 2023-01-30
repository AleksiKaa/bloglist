import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

const blog = {
  'title': 'Kirja',
  'author': 'Kirjailija',
  'url': 'kirja.fi',
  'likes': 16,
  'user': {
    'username': 'kirjailija',
    'name': 'kirjailija',
    'id': '63170f5a50015c1261c3aba5'
  },
  'id': '63173503d5981b0162b3b880'
}

test('renders content', () => {
  render(<Blog blog={blog}/>)
  screen.getByText('Kirja')
  screen.getByText('Kirjailija')
  expect(screen.queryByText('url')).not.toBeInTheDocument
  expect(screen.queryByText('likes')).not.toBeInTheDocument
})

test('url and likes are rendered after clicking the button', async () => {
  render(
    <Blog blog={blog}/>
  )

  expect(screen.queryByText('url')).not.toBeInTheDocument
  expect(screen.queryByText('likes')).not.toBeInTheDocument

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.queryByText('url')).toBeInTheDocument
  expect(screen.queryByText('likes')).toBeInTheDocument
})

test('pressing like calls the event handler', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} like={mockHandler}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likebutton = screen.getByText('like')
  await user.click(likebutton)
  await user.click(likebutton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('creating a blog retains the correct data', async () => {
  const user = userEvent.setup()
  const mockAddBlog = jest.fn()

  render(
    <CreateBlog setErrorMessage={() => console.log('error')} addBlog={mockAddBlog}/>
  )

  const titleInput = screen.getAllByPlaceholderText('title')
  const authorInput = screen.getAllByPlaceholderText('author')
  const urlInput = screen.getAllByPlaceholderText('url')
  const submitButton = screen.getByText('create')

  await user.type(titleInput[0], 'this is a test')
  await user.type(authorInput[0], 'that tests the input')
  await user.type(urlInput[0], 'of the component')
  await user.click(submitButton)

  expect(mockAddBlog.mock.calls).toHaveLength(1)
  expect(mockAddBlog.mock.calls[0][0].title).toBe('this is a test')
  expect(mockAddBlog.mock.calls[0][0].author).toBe('that tests the input')
  expect(mockAddBlog.mock.calls[0][0].url).toBe('of the component')
})