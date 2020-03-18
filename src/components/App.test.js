import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'
jest.mock('../services/sBlogs')


const user = {
  username: 'john karas',
  token: '111',
  name: 'Donald Tester'
}

localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))


describe('<App />', () => {

  beforeEach( async () => {
    const user = {
      username: 'john karas',
      token: '111',
      name: 'Donald Tester'
    }
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('login')
    )

    const inputUname = component.container.querySelector('.uname')
    const inputPsword = component.container.querySelector('.psw')
    const form = component.container.querySelector('.log')

    fireEvent.change(inputUname, { target: { value: 'john karas' } })
    fireEvent.change(inputPsword, { target: { value: 111 } })
    fireEvent.submit(form)

  })

  test('renders all notes it gets from backend', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('.blog')
    )

    // const inputUname = component.container.querySelector('.uname')
    // const inputPsword = component.container.querySelector('.psw')
    // const form = component.container.querySelector('.log')

    // fireEvent.change(inputUname, { target: { value: 'john karas' } })
    // fireEvent.change(inputPsword, { target: { value: 111 } })
    // fireEvent.submit(form)

    // await waitForElement(
    //   () => component.getByText('.blog')
    // )
    component.debug()

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'logo noo'
    )
    expect(component.container).toHaveTextContent(
      'second blog'
    )
    expect(component.container).toHaveTextContent(
      'third blog'
    )
  })
})