import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Users = (blogs, user) => {

  let users = blogs.blogs.map(el => el.user.name)
  let uniqueUsers = Array.from(new Set(users))
  uniqueUsers = uniqueUsers.map(el => { return { name: el, counter: 0 }})
  uniqueUsers.forEach(el => {
    users.forEach(it => {
      if (el.name === it) {
        el.counter = el.counter +1
      }
    })
  })
  uniqueUsers.sort(compare)

  // if (Object.keys(user).length === 0) {
  //   uniqueUsers = []
  // }


  function compare(a, b) {

    const aC = a.counter
    const bC = b.counter

    if (aC < bC) {
      return 1
    }
    if (aC > bC) {
      return -1
    }
    if ( aC === bC) {
      return 0
    }
  }

  const setList = (u) => {
    return (
      u.map(el => {
        // return <p key={el.name}>{el.name} {el.counter}</p>})
        return <p key={el.name}><Link key={el.name} to={`/users/${el.name}`}>{el.name} {el.counter}</Link></p>})
    )
  }


  return (
    <div>
      <h2>Users</h2>
      <h4>blogs created</h4>
      {setList(uniqueUsers)}
    </div>
  )
}

export default Users