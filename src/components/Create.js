import React from 'react'

// const CreateBlog = ({ title, author, url, addBlog, setTitle, setAuthor, setUrl }) => {
const CreateBlog = ({ titleF, authorF, urlF, addBlog }) => {


  return (
    <form onSubmit={addBlog}>
      <div>
        title
        {/* <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        /> */}
        <input {...titleF} />
      </div>
      <div>
        author
        {/* <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        /> */}
        <input {...authorF} />
      </div>
      <div>
        url
        {/* <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        /> */}
        <input {...urlF} />
      </div>
      <button type="submit">create</button>

    </form>
  )
}

export default CreateBlog