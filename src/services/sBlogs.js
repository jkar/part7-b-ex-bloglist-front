const blogs = [
  {
    title: 'logo noo',
    author: 'Clain',
    url: 'isbn34',
    likes: 33,
    id: '5e2589a97a3cd868f8771aa8'
  },
  {
    title: 'second blog',
    author: 'second author',
    url: 'isbn77',
    likes: 12,
    id: '1e2589a97a3cd868f8771aa6'
  },
  {
    title: 'third blog',
    author: '3 author',
    url: 'isbn737',
    likes: 18,
    id: '9s2589a97a3cd868f8771ac5'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }