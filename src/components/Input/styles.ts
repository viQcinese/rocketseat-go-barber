import styled, { css } from 'styled-components';

import Tooltip from '../Tootip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border: 2px solid #232129;
  padding: 0 16px;
  width: 100%;

  border-radius: 10px;
  color: #666260;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  /* se o componente estiver focado, aplica os estilos abaixo */
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9900;
      border-color: #ff9900;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9900;
    `}

  input {
    background: transparent;
    flex: 1;
    padding: 16px 0;
    height: 100%;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666260;
    }
  }

  input:-webkit-autofill {
    background: transparent !important;
    background-color: red !important;
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
