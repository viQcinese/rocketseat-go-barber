import React from 'react'
import { fireEvent, render, wait } from '@testing-library/react'
import { IconType } from 'react-icons'
const mockIcon = {} as IconType

import Input from '../../components/Input'

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      }
    }
  }
})

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="email"
    />)

    expect(getByPlaceholderText('email')).toBeTruthy()
  })

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="email" />
    )

    const inputElement = getByPlaceholderText('email')
    const containerElement = getByTestId('input-container')

    fireEvent.focus(inputElement)

    // await wait(() => {
    //   expect(containerElement).toHaveStyle('padding: 0 16px;')

    //   // expect(containerElement).toHaveStyle('border-color: #ff9000;')
    //   expect(containerElement).toHaveStyle('color: #666260;')


    // })

    await wait(() => {
      expect(containerElement).toHaveStyleRule('border-color', '#ff9000');
      expect(containerElement).toHaveStyleRule('color', '#ff9000');
    });
  })
})
