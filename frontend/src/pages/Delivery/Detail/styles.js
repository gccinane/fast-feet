import styled from 'styled-components';

export const Container = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  padding: 15px;
  background: #fff;
  box-shadow: 10px 10px 10px 10000px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 3;
  svg {
    align-self: flex-end;
    &:hover {
      cursor: pointer;
    }
  }

  padding: 0 15px 15px;
  div {
    display: flex;
    flex-direction: column;
    & + div {
      margin-top: 15px;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }
  }
  strong {
    margin-top: 10px;
    margin-bottom: 10px;
    color: #444;
  }
  p {
    color: #666;
    border: none;
    background: none;
    font-size: 16px !important;
    & + p {
      margin-top: 5px;
    }
  }
  img {
    width: 100px;
    margin: 0 auto;
  }
`;
