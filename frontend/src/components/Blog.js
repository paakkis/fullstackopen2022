/* eslint-disable linebreak-style */
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, toggleVote }) => {

  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDelete = async (title, author, id) => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)){
      blogService.setToken(user.token)
      await blogService.remove(id, user.token)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const toggleView = () => {
    setView(!view)
  }

  return (
    <div className='blogs'>
      {view ? (
        <div className="largeBlog" style={blogStyle}>
          <p onClick={() => toggleView()}>{blog.title} {blog.author}<button onClick={() => toggleView()}> hide </button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes}<button className="likeBtn" onClick={toggleVote}>like</button></p>
          <p>{blog.user.name || null}</p>
          {user === null || blog.user.username === user.username
            ? <button onClick={() => toggleDelete(blog.title, blog.author, blog.id)}>remove</button>
            : null
          }
        </div>
      )
        :
        (
          <div className="smallBlog" style={blogStyle} onClick={() => toggleView()}>
            {blog.title} {blog.author} <button onClick={() => toggleView()}> view </button>
          </div>
        )}
    </div>
  )
}


export default Blog