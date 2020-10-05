import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn()
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush
    }),
    // Tipagem de children ou qualquer outro JSX, seja componente ou texto: React.ReactNode
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

jest.mock('../../context/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn
    })
  }
})

jest.mock('../../context/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    })
  }
})

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear()
  })

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('email');
    const passwordField = getByPlaceholderText('senha')
    const buttonElement = getByText('Entrar')

    fireEvent.change(emailField, { target: { value: 'user@email.com' }})
    fireEvent.change(passwordField, { target: { value: '123123' }})

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('email');
    const passwordField = getByPlaceholderText('senha')
    const buttonElement = getByText('Entrar')

    fireEvent.change(emailField, { target: { value: 'not-valid-email' }})
    fireEvent.change(passwordField, { target: { value: '123123' }})

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled()
    })
  })

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error()
    })

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('email')
    const passwordField = getByPlaceholderText('senha')
    const buttonElement = getByText('Entrar')

    fireEvent.change(emailField, { target: { value: 'user@email.com' }})
    fireEvent.change(passwordField, { target: { value: '123123' }})

    fireEvent.click(buttonElement)

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(expect.objectContaining({
        type: 'error'
      }))
    })
  })
})
