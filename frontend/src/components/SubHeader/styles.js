import styled from 'styled-components';

export const Header = styled.header`
  padding-top: 2px;
  width: 100%;
  max-width: 980px;
  margin: 2px auto;
  margin-top: 20px;

  h1 {
    margin-top: 20px;
    font-size: 22px;
    color: #3f3f3f;
  }

  div {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const AddButton = styled.button`
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-height: 40px;
  border: none;
  background: #7159c1;
  border-radius: 4px;
  color: #eee;
  font-weight: bold;
`;

export const Filter = styled.input`
  max-height: 28px;
  padding: 16px;
  border: none;
  box-shadow: 0 0 1px;
  padding: 1rem 0rem 1rem 3.5rem;
  width: 100%;
`;
