import React from 'react'
import { fireEvent, render, wait } from '@testing-library/react'
import ForgotPassword from '../../pages/ForgotPassword'

const mockedAddToast = jest.fn()
const mockedApiPost = jest.fn()

jest.mock('../../services/api', () => {
  return {
    post: () => mockedApiPost()
  }
})

jest.mock('../../context/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    })
  }
})

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children
  }
})

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    mockedApiPost.mockClear()
    mockedAddToast.mockClear()
  })

  it('should be able to reset password', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />)

    const emailField = getByPlaceholderText('email')
    const buttonElement = getByText('Recuperar')

    fireEvent.change(emailField, { target: { value: 'user@email.com' } })

    fireEvent.click(buttonElement)

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(expect.objectContaining({
        type: 'success'
      }))
    })
  })

  it('should not be able to reset password with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />)

    const emailField = getByPlaceholderText('email')
    const buttonElement = getByText('Recuperar')

    fireEvent.change(emailField, { target: { value: 'invalid-email' } })

    fireEvent.click(buttonElement)

    await wait(() => {
      expect(mockedAddToast).not.toHaveBeenCalled()
    })
  })

  it('should display an error if reset password fails', async () => {
    mockedApiPost.mockImplementation(() => {
      throw new Error()
    })

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />)

    const emailField = getByPlaceholderText('email')
    const buttonElement = getByText('Recuperar')

    fireEvent.change(emailField, { target: { value: 'user@email.com' } })

    fireEvent.click(buttonElement)

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(expect.objectContaining({
        type: 'error'
      }))
    })
  })
})
