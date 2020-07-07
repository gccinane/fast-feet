import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #7159c1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  background: #fff;
  border-radius: 4px;
  text-align: center;

  img {
    margin-top: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 24px;

    p {
      text-align: left;
      margin-bottom: 4px;
      font-weight: bold;
      color: #343434;
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      padding: 8px;
      margin: 0 0 10px;
    }

    button {
      margin: 4px 0 32px;
      background: #7159c1;
      border: 0;
      border-radius: 4px;
      padding: 8px;
      color: #fff;
    }
  }
`;
