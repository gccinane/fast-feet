import styled from 'styled-components';

export const Container = styled.div`
  max-width: 980px;
  width: 100%;
  margin: 0 auto;
  div {
    display: flex;
    flex-direction: row;
  }
`;

export const SaveButton = styled.button`
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
