import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 980px;
  width: 70%;
`;

export const PageButton = styled.button`
  border: none;
  color: #7159c1;
  background: none;
  ${(props) =>
    props.firstpage &&
    css`
      color: #000;
      cursor: not-allowed;
      opacity: 0.4;
    `}
`;
