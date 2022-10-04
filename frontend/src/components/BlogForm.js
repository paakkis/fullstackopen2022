import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            id='titleInput'
            value={newTitle}
            onChange={handleTitleChange}
            placeholder='enter blog title here'
          />
        </div>
        <div>
            author:
          <input
            id='authorInput'
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder='enter blog author here'
          />
        </div>
        <div>
            url:
          <input
            id='urlInput'
            value={newUrl}
            onChange={handleUrlChange}
            placeholder='enter blog url here'
          />
        </div>
        <button id="createBlog" type="submit">create</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm