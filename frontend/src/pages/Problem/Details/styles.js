import styled from 'styled-components';

export const Container = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  border-radius: 4px;
  background: #fff;
  z-index: 600;
  top: 25%;
  left: 35%;
  box-shadow: 10px 10px 10px 10000px rgba(0, 0, 0, 0.5);
  border: 1px solid transparent;
  padding: 20;
  height: 260px;
  width: 450px;

  z-index: 3;
  svg {
    align-self: flex-end;
    &:hover {
      cursor: pointer;
    }
  }

  div {
    display: flex;
    flex-direction: column;
  }
  strong {
    margin-bottom: 15px;
    color: #444;
  }
  textarea {
    font-size: 16px;
    color: #666;
    border: 0;
    resize: unset;
  }
`;
