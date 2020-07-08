import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;

  header {
    width: 100%;
    max-width: 980px;
    margin: 2px auto;
    h1 {
      margin-top: 20px;
      font-size: 22px;
      color: #3f3f3f;
    }

    div {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

export const AddDeliveryButton = styled.button`
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

export const FilterDelivery = styled.input`
  align-items: center;
  max-height: 32px;
  line-height: 0;
  border: none;
  box-shadow: 0 0 1px;
`;

export const DeliveryTable = styled.table`
  margin: 0 auto;
  width: 100%;
  max-width: 980px;
  border-collapse: separate;
  border-spacing: 0 1em;
  color: #2c2c2c;

  thead,
  th {
    color: #101010;
    text-align: left;
    padding: 12px;
  }

  tbody,
  td {
    padding: 16px 12px;
    background: #fff;
    border-radius: 4px;
  }

  td:last-child {
    text-align: center;
    button {
      background: none;
      border: none;
    }
  }
`;

export const DeliveryStatus = styled.div`
  width: 85%;
  min-width: 96px;
  display: flex;
  flex-direction: row;
  padding: 4px;
  background: red;
  border-radius: 12px;
  font-weight: bold;

  figure {
    padding: 6px;
    margin: 2px 4px;
    border-radius: 50%;
    background: ${darken(0.08, '#7159c1')};
  }
`;

export const DeliverymanAvatar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const DeliverymanInitialLetters = styled.div`
  height: 10%;
  padding: 6px;
  border-radius: 50%;
  background: #6b8e23;
  color: ${darken(0.15, '#6b8e23')};
  margin-right: 5px;
`;
