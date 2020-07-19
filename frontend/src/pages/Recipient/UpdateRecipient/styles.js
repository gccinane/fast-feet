import styled from 'styled-components';

export const Container = styled.div`
  max-width: 880px;
  width: 100%;

  margin: 42px auto;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h1 {
      flex: 1;
      font-size: 22px;
      color: #3f3f3f;
    }
  }

  form {
    margin-top: 20px;
    padding: 40px;
    background: #fff;
    border-radius: 4px;
    text-align: center;
    p {
      font-weight: bold;
      color: #2a2a2a;
      margin-top: 16px;
      margin-bottom: 8px;
      text-align: start;
      position: relative;
    }

    input {
      border: none;
      box-shadow: 0 0 1px;
      padding: 8px;
      width: 100%;
    }

    p {
      display: flex;
      flex-direction: row;
    }

    #streetInputs {
      display: flex;
      flex-direction: row;

      input:first-child {
        width: 75%;
      }

      input:not(:first-child) {
        width: 20%;
      }

      input:nth-child(2) {
        margin: 0 16px;
      }
    }

    #stateInputs {
      input:nth-child(2) {
        margin: 0 16px;
      }
    }
  }
`;

export const BackButton = styled.button`
  padding: 8px;
  font-size: 15px;
  color: #fff;
  align-items: center;
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-weight: bold;
  background: #d2d2d2;
  margin-right: 12px;
`;

export const SaveButton = styled.button`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  max-height: 40px;
  border: none;
  background: #7159c1;
  border-radius: 4px;
  color: #eee;
  font-weight: bold;
`;

export const StreetInputDescription = styled.div`
  display: flex;
  flex-direction: row;

  p:first-child {
    flex: 1;
  }

  p:last-child {
    margin-right: 42px;
  }

  p:nth-child(2) {
    margin-right: 100px;
  }
`;

export const StateInputDescription = styled.div`
  p:nth-child(2) {
    margin-right: 2px;
  }

  p:last-child {
    margin-right: 228px;
  }
`;
