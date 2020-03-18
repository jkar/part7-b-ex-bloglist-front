import React from 'react'
const jwt = require('jsonwebtoken')

const SingleBlog = ({ sb, blogs, compare, user, increasingLike, deletingBlog }) => {

  const deleteBlog = () => {
    deletingBlog(sb, compare, blogs)
  }
  const increaseLike = () => {
    increasingLike(sb, compare, blogs)
  }
  const setDeleteButton = () => {
    const decodedToken = jwt.verify(user.token, 'authenticate')
    if (decodedToken.id.toString() === sb.user.id.toString()) {
      return (
        <button onClick={deleteBlog}>delete</button>
      )
    }
  }

  console.log(sb)
  //OPWS BLEPW K APO TO LOG EXW AYTO TO IF ETSI WSTE OTAN THA NAI TO SB === UNDEFINED NA MH PETAEI ERROR ALLA NA MH GYRNAEI TPT, OTAN TO SB PAREI VALUE THA XANAKANEI RENDER K PLEON TO IF DE THA ISXUEI ,OPOTE THA EMFANISEI TO KATW RETURN!!!
  if (sb === undefined) {
    return null
  }

  return (
    <div>
      <h4>{sb.title}</h4>
      <p>{sb.url}</p>
      <p> {sb.likes} likes <button onClick={increaseLike}>like</button></p>
      <p>added by <strong>{sb.author}</strong></p>
      {setDeleteButton()}
    </div>
  )
}

export default SingleBlog