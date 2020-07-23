import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  label {
    border: 2px dashed #7159c1;
    margin: 0 auto;
    width: 160px;
    height: 160px;
    align-items: center;
    display: flex;
    flex-direction: column;
    color: #b9b9b9;
    font-weight: bold;
    border-radius: 50%;
    svg {
      position: absolute;
      margin-top: 40px;
    }
    cursor: pointer;

    img {
      margin-top: -3px;
      width: 164px;
      height: 164px;
      border-radius: 50%;
    }

    &:hover {
      opacity: 0.6;
    }

    input {
      display: none;
    }
  }
`;
