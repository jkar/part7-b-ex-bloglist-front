import React, { useState, useImperativeHandle } from 'react'
import BlogService from '../services/blogs'
const jwt = require('jsonwebtoken')

const Blog = React.forwardRef(({ blog, blogs, setBlogs, compare, user }, ref) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLike = async () => {
    const b = {title: blog.title, author: blog.author, url: blog.url, likes: blog.likes+1}
    const updatedBlog = await BlogService.update(blog.id, b)
    //const updatedBlogs = await BlogService.getAll()
    const updatedBlogs = blogs.concat(updatedBlog)
    const sortedBlogs = updatedBlogs.sort(compare)
    setBlogs(sortedBlogs)
  }

  const deleteBlog = async () => {
    await BlogService.deleteB(blog.id)
    const updatedBlogs = await BlogService.getAll()
    const sortedBlogs = updatedBlogs.sort(compare)
    setBlogs(sortedBlogs)

  }

  const setDeleteButton = () => {
    const decodedToken = jwt.verify(user.token, 'authenticate')
    console.log('dec id is',decodedToken.id)
    console.log('bl id is', blog.user.id)
    if (decodedToken.id.toString() === blog.user.id.toString()) {
      return (
        <button onClick={deleteBlog}>delete</button>
      )
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  if (!visible) {
  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        {blog.title} {blog.author}
      </div>
    </div>
  )
  } else {
    return (
      <div style={blogStyle}>
        <div onClick={toggleVisibility}>
          {blog.title} {blog.author} {blog.url} {blog.likes} likes
          <button onClick={increaseLike}>like</button>
          {/* <button onClick={deleteBlog}>delete</button> */}
          {setDeleteButton()}
        </div>
      </div>
    )
  }

})

export default Blog