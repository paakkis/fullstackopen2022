/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


describe('BlogForm component tests', () => {

  test('form callbackfunction is being called with right information', async () =>  {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()
    const titleInput = screen.getByPlaceholderText('enter blog title here')
    const authorInput = screen.getByPlaceholderText('enter blog author here')
    const urlInput = screen.getByPlaceholderText('enter blog url here')

    const createButton = screen.getByText('create')

    await user.type(titleInput, 'testing a form...')
    await user.type(authorInput, 'testing a form...')
    await user.type(urlInput, 'testing a form...')

    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  })
})

