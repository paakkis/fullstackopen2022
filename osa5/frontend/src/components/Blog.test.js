/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog component tests', () => {

  let container
  const toggleVote = jest.fn()

  beforeEach(() => {
    const blog = {
      author: 'Test-Author',
      title: 'Test-Title',
      url: 'Test-Url',
      likes: 1,
      user: {
        name: 'Test',
        username: 'Test',
      }
    }

    const user = {
      name: 'Test',
      username: 'Test',
    }

    container = render(<Blog blog={blog} user={user} toggleVote={toggleVote} />).container
  })



  test('blog renders small content when hidden', async () => {

    const div = container.querySelector('.smallBlog')

    expect(div).toHaveTextContent(
      'Test-Author'
    )
    expect(div).toHaveTextContent(
      'Test-Title'
    )
    expect(div).not.toHaveTextContent(
      'Test-Url'
    )
    expect(div).not.toHaveTextContent(
      '1'
    )
  })

  test('blog renders large content when opened', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.largeBlog')

    expect(div).toHaveTextContent(
      'Test-Author'
    )
    expect(div).toHaveTextContent(
      'Test-Title'
    )
    expect(div).toHaveTextContent(
      'Test-Url'
    )
    expect(div).toHaveTextContent(
      '1'
    )
  })

  test('clicking the like button calls event handler twice', async () => {

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(toggleVote.mock.calls).toHaveLength(2)
  })

})

