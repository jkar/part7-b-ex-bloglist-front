import React, { useState, useImperativeHandle } from 'react'
import { connect } from 'react-redux'
import BlogService from '../services/blogs'
import { increasingLike, deletingBlog } from '../reducers/BlogReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
const jwt = require('jsonwebtoken')

const Blog = React.forwardRef(({ blog, blogs, compare, user, increasingLike, deletingBlog }, ref) => {
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

  // const increaseLike = async () => {



  //   const u = { usernane: blog.user.username, name: blog.user.name, id: blog.user.id }
  //   const b = { title: blog.title, author: blog.author, url: blog.url, likes: blog.likes+1, id: blog.id, user: u }
  //   await BlogService.update(blog.id, b)
  //   let updatedBlogs = blogs.filter(el =>  el.id !== blog.id)
  //   updatedBlogs = [...updatedBlogs, b]
  //   const sortedBlogs = updatedBlogs.sort(compare)
  //   setBlogs(sortedBlogs)
  // }

  const increaseLike = () => {
    increasingLike(blog, compare, blogs)
  }


  //const deleteBlog = async () => {
  // await BlogService.deleteB(blog.id)
  // let updatedBlogs = blogs.filter(el => el.id !== blog.id)
  // updatedBlogs = [...updatedBlogs]
  // const sortedBlogs = updatedBlogs.sort(compare)
  // setBlogs(sortedBlogs)
  //}

  const deleteBlog = () => {
    deletingBlog(blog, compare, blogs)

  }

  const setDeleteButton = () => {
    const decodedToken = jwt.verify(user.token, 'authenticate')
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

  // if (!visible) {
  //   return (
  //     <div style={blogStyle}>
  //       <div onClick={toggleVisibility}>
  //         {blog.title} {blog.author}
  //       </div>
  //     </div>
  //   )
  // } else {
  // return (
  //   <div style={blogStyle}>
  //     <div onClick={toggleVisibility}>
  //       {blog.title} {blog.author} {blog.url} {blog.likes} likes
  //       <button onClick={increaseLike}>like</button>
  //       {setDeleteButton()}
  //     </div>
  //   </div>
  // )
  //}
  return (
    <div style={blogStyle}>
      <Link key={blog.title} to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </div>
  )

})

//export default Blog

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  increasingLike,
  deletingBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog