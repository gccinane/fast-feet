import styled from 'styled-components';

export const Container = styled.table`
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
    text-align: right;
    padding-right: 16px;
    button {
      background: none;
      border: none;
    }
  }

  th:last-child {
    text-align: right;
  }
`;
