import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    margin-left: 11.5rem;
    margin-top: 42px;
    margin-bottom: 20px;
    font-size: 22px;
    color: #3f3f3f;
  }

  td:nth-child(2) {
    max-width: 790px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
