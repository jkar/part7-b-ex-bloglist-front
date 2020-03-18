import loginService from '../services/login'
import BlogService from '../services/blogs'
//import { connect } from 'react-redux'
//import { settingMessage } from './NotificationReducer'


export const logingOut = () => {

  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'log out',
      data: null
    })
  }
}

export const logingIn = (u, p, setErrorMessage) => {

  return async dispatch => {

    try {

      const username = u.value
      const password = p.value

      const user = await loginService.login({
        username, password,
      })

      u.reset()
      p.reset()

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      BlogService.setToken(user.token)

      dispatch({
        type: 'log in',
        data: user
      })
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      u.reset()
      p.reset()
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(exception)
    }
  }
}

export const keepUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      BlogService.setToken(user.token)

      dispatch({
        type: 'keep user',
        data: user
      })
    }
  }
}

const UserReducer = (state = null, action) => {

  switch(action.type) {
  case 'log in':
    return action.data
  case 'keep user':
    return action.data
  case 'log out':
    return action.data
  default:
    return state
  }
}

export default UserReducer

// const mapStateToProps = (state) => {
//   return {
//     message: state.message
//   }
// }

// const mapDispatchToProps = {
//   settingMessage
// }

// const ConnectedUserReducer = connect(mapStateToProps, mapDispatchToProps)(UserReducer)
// export default ConnectedUserReducer