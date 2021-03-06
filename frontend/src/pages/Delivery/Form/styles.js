import styled from 'styled-components';

export const Container = styled.div`
  max-width: 880px;
  width: 100%;

  margin: 42px auto;

  #subheader {
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

    #description {
      display: flex;
      flex-direction: row;

      p:not(:first-child) {
        margin-left: 41.3%;
      }
    }

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

    label {
      border: 2px dashed #eee;
      padding-top: 40px;
      margin: 0 auto;
      width: 160px;
      height: 160px;
      align-items: center;
      display: flex;
      flex-direction: column;
      color: #b9b9b9;
      font-weight: bold;
      border-radius: 50%;

      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }

      input {
        display: none;
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

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
