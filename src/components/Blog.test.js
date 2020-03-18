import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
//import Blog from './Blog'
import Togglable from './togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})

// describe('<Blog />', () => {
//   let component

//   beforeEach(() => {
//     const blog = { title: 'component', author: 'yiannis', url: 'isbn1', likes: 2, id: 'aaaaa' }
//     component = render(
//       <Blog blog={blog}>
//         <div className="testDiv" />
//       </Blog>
//     )
//   })

//   test('at start default content is rendered', () => {
//     const div = component.container.querySelector('.default-content')

//     expect(div).not.toHaveStyle('display: none')
//   })

//   test('at start the children are not displayed', () => {
//     const div = component.container.querySelector('.togglableContent')

//     expect(div).toHaveStyle('display: none')
//   })

//   test('after clicking the button, children are displayed', () => {
//     const button = component.getByText('give-visibility')
//     fireEvent.click(button)

//     const div = component.container.querySelector('.togglableContent')
//     expect(div).not.toHaveStyle('display: none')
//   })

// })