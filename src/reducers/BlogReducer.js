import BlogService from '../services/blogs'

let blogs = []

export const initializeBlogs = () => {

  return async dispatch => {
    blogs = await BlogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }

}

export const createB = (af, tf, uf, user, setErrorMessage, setTypeMessage) => {
  return async dispatch => {

    let authorF = af.value
    let titleF = tf.value
    let urlF = uf.value

    const b = { author : authorF, title: titleF, url: urlF }
    BlogService.create(b).then(res => {

      //setBlogs(blogs.concat(res))
      let u = { name: user.name, username: user.username, id: res.user.toString() }
      console.log('u is ', u)
      let data = ({ ...res, user: u })

      tf.reset()
      af.reset()
      uf.reset()
      setTypeMessage('good')
      setErrorMessage('a new blog has been added')
      setTimeout(() => {
        setErrorMessage(null)
        setTypeMessage('bad')
      }, 5000)

      dispatch ({
        type: 'createBlog',
        data: data
      })

    })
      .catch (exception => {
        setErrorMessage(exception.response.data.error)
        tf.reset()
        af.reset()
        uf.reset()
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }
}

export const increasingLike = (blog, compare, bls) => {
  return async dispatch => {

    const u = { usernane: blog.user.username, name: blog.user.name, id: blog.user.id }
    const b = { title: blog.title, author: blog.author, url: blog.url, likes: blog.likes+1, id: blog.id, user: u }
    await BlogService.update(blog.id, b)
    //console.log('blogs are ', blogs)
    let updatedBlogs = bls.filter(el =>  el.id !== blog.id)
    updatedBlogs = [...updatedBlogs, b]
    const sortedBlogs = updatedBlogs.sort(compare)
    //setBlogs(sortedBlogs)

    dispatch({
      type: 'increase like',
      data: sortedBlogs
    })
  }
}

export const deletingBlog = (blog, compare, bls) => {
  return async dispatch => {
    await BlogService.deleteB(blog.id)
    let updatedBlogs = bls.filter(el => el.id !== blog.id)
    updatedBlogs = [...updatedBlogs]
    const sortedBlogs = updatedBlogs.sort(compare)

    dispatch({
      type: 'delete blog',
      data: sortedBlogs
    })
  }
}


const BlogReducer = (state = [], action) => {

  switch(action.type) {

  case 'createBlog':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'increase like':
    return action.data
  case 'delete blog':
    return action.data
  default:
    return state
  }
}

export default BlogReducer