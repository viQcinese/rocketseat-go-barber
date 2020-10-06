import React from 'react'
import { fireEvent, render, wait } from '@testing-library/react'
import SignUp from '../../pages/SignUp'

const mockedHistoryPush = jest.fn()
const mockedAddToast = jest.fn()
const mockedApiPost = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

jest.mock('../../context/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    })
  }
})

jest.mock('../../services/api', () => {
  return {
    post: () => mockedApiPost()
  }
})

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear()
    mockedApiPost.mockClear()
    mockedAddToast.mockClear()
  })

  it('should be able to register a new user', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />)

    const nameField = getByPlaceholderText('nome')
    const emailField = getByPlaceholderText('email')
    const passwordField = getByPlaceholderText('senha')
    const buttonElement = getByText('Cadastrar')

    fireEvent.change(nameField, { target: { value: 'User' } })
    fireEvent.change(emailField, { target: { value: 'user@email.com' } })
    fireEvent.change(passwordField, { target: { value: '123123' } })

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/')
    })
  })

  it('should not be able to register with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />)

    const nameField = getByPlaceholderText('nome')
    const emailField = getByPlaceholderText('email')
    const passwordField = getByPlaceholderText('senha')
    const buttonElement = getByText('Cadastrar')

    fireEvent.change(nameField, { target: { value: 'User' } })
    fireEvent.change(emailField, { target: { value: 'invalid-email' } })
    fireEvent.change(passwordField, { target: { value: 'not' } })

    fireEvent.click(buttonElement)

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled()
    })
  })

  it('should display an error if signup fails', async () => {
    mockedApiPost.mockImplementation(() => {
      throw new Error()
    })

    const { getByPlaceholderText, getByText } = render(<SignUp />)

    const nameField = getByPlaceholderText('nome')
    const emailField = getByPlaceholderText('email')
    const passwordField = getByPlaceholderText('senha')
    const buttonElement = getByText('Cadastrar')

    fireEvent.change(nameField, { target: { value: 'User' } })
    fireEvent.change(emailField, { target: { value: 'user@email.com' } })
    fireEvent.change(passwordField, { target: { value: '123123' } })

    fireEvent.click(buttonElement)

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(expect.objectContaining({
        type: 'error'
      }))
    })
  })
})
