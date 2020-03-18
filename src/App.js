import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import CreateBlog from './components/Create'
import Notification from './components/Notification'
import Togglable from './components/togglable'
import  { useField } from './hooks/index'
import { initializeBlogs, createB, increasingLike, deletingBlog } from './reducers/BlogReducer'
import { logingIn, logingOut, keepUser } from './reducers/UserReducer'
import { settingMessage } from './reducers/NotificationReducer'
import { settingTypeNotification } from './reducers/NotificationTypeReducer'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Users from './components/Users'
import Usr from './components/Usr'
import SingleBlog from './components/SingleBlog'

const jwt = require('jsonwebtoken')

function App(props) {

  //const [user, setUser] = useState(null)
  //const [blogs, setBlogs] = useState([])
  //const [errorMessage, setErrorMessage] = useState(null)
  //const [typeMessage, setTypeMessage] = useState('bad')

  const usernameL = useField('text')
  const passwordL = useField('password')
  const titleF = useField('text')
  const authorF = useField('text')
  const urlF = useField('text')

  const BlogListRef = React.createRef()

  useEffect(() => {
    props.keepUser()
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  },[])

  function compare(a, b) {

    const aLikes = a.likes
    const bLikes = b.likes

    if (aLikes < bLikes) {
      return 1
    }
    if (aLikes > bLikes) {
      return -1
    }
    if ( aLikes === bLikes) {
      return 0
    }
  }

  console.log(props.blogs)

  const createB = () => (
    <Togglable buttonLabel="new blog" ref={BlogListRef}>
      <CreateBlog titleF={titleF} authorF={authorF} urlF={urlF} addBlog={addBlog} />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    props.logingIn(usernameL, passwordL, props.settingMessage)
  }


  const blogsList = () => (
    <div className='blog'>
      <h2>blogs</h2>
      {props.blogs.map(blog => {
        const blogRef = React.createRef()
        return <Blog key={blog.id} blog={blog} user={props.user} blogs={props.blogs} ref={blogRef} compare={compare} increasingLike={props.increasingLike} deletingBlog={props.deletingBlog} />
      }
      )}
    </div>
  )

  const logout = () => {
    props.logingOut()
    // props.history.push('/anecdotes')
  }

  //const outLog = withRouter(logout)

  const addBlog = (event) => {

    event.preventDefault()
    BlogListRef.current.toggleVisibility()

    props.createB(authorF, titleF, urlF, props.user, props.settingMessage, props.settingTypeNotification)

  }

  const Blogs = () => {
    return (
      <div className="App">

        <Notification message={props.message} typeMessage={props.typeMessage} />

        {props.user === null ?

          <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin} className='log'>
              <div>
                username
                <input {...usernameL} />
              </div>
              <div>
                password
                <input {...passwordL} />
              </div>
              <button type="submit">login</button>
            </form>
          </div>
          :
          <div>
            <p>{props.user.name} logged in  <button onClick={logout}>logout</button></p>
            {createB()}
            {blogsList()}
          </div>
        }
      </div>
    )
  }

  // const Usr = ({ b, history }) => {

  //   console.log(props.user)
  //   //OPWS BLEPW K APO TO LOG EXW AYTO TO IF ETSI WSTE OTAN THA NAI TO PRPOS.USER === NULL NA MH PETAEI ERROR ALLA NA MH GYRNAEI TPT, OTAN TO USER PAREI VALUE THA XANAKANEI RENDER K PLEON TO IF DE THA ISXUEI ,OPOTE THA EMFANISEI TO KATW RETURN!!!
  //   if ( props.user === null) {
  //     return null
  //   }

  //   const logout2 = () => {
  //     props.logingOut()
  //     history.push('/anecdotes')
  //   }

  //   return (
  //     <div>
  //       <p>{props.user.name} logged in  <button onClick={logout2}>logout</button></p>
  //       <h4>added blogs</h4>
  //       <ul>
  //         {b.map(item => {
  //           return <li key={item.name}>{item.title}</li>
  //         })}
  //       </ul>
  //     </div>
  //   )
  // }

  const User = withRouter(Usr)


  const userByName = (name) => {

    let b =  props.blogs.filter(blog => blog.user.name === name)
    return b
  }

  // const SingleBlog = ({ sb }) => {

  //   const deleteBlog = () => {
  //     props.deletingBlog(sb, compare, props.blogs)
  //   }
  //   const increaseLike = () => {
  //     props.increasingLike(sb, compare, props.blogs)
  //   }
  //   const setDeleteButton = () => {
  //     const decodedToken = jwt.verify(props.user.token, 'authenticate')
  //     if (decodedToken.id.toString() === sb.user.id.toString()) {
  //       return (
  //         <button onClick={deleteBlog}>delete</button>
  //       )
  //     }
  //   }

  //   return (
  //     <div>
  //       <h4>{sb.title}</h4>
  //       <p>{sb.author} {sb.url} {sb.likes} likes</p>
  //       <button onClick={increaseLike}>like</button>
  //       {setDeleteButton()}
  //     </div>
  //   )
  // }

  const SingleB = withRouter(SingleBlog)

  const blogByTitle = (id) => {
    let sb = props.blogs.find(el => el.id === id)
    return sb
  }

  return (
    <Router>
      <div>
        <div>
          <Link to="/blogs"> Blogs </Link>
          <Link to="/users"> Users </Link>
        </div>
        <Route exact path="/blogs" render={() => <Blogs />} />
        <Route exact path="/users" render={() => <Users blogs={props.blogs} user={props.user} />} />
        <Route path="/users/:name" render={({ match }) => <User b={userByName(match.params.name) } user={props.user} logingOut={props.logingOut} /> } />
        <Route path="/blogs/:id" render={ ({ match }) => <SingleB sb={blogByTitle(match.params.id)} user={props.user} blogs={props.blogs} compare={compare} increasingLike={props.increasingLike} deletingBlog={props.deletingBlog} /> } />
      </div>
    </Router>
  )

}

//export default App
//export default connect(null, { initializeBlogs })(App)

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    message: state.message,
    typeMessage: state.typeMessage
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  logingIn,
  logingOut,
  keepUser,
  createB,
  increasingLike,
  deletingBlog,
  settingMessage,
  settingTypeNotification
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
