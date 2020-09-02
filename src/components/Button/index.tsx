import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Equivalente a uma Interface vazia
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Input: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
};

export default Input;
