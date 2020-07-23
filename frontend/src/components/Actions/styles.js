import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 12px;
  position: absolute;
  right: ${(props) => (props.isDelivery ? '11%' : '11.21%')};
  background: #fff;
  box-shadow: 0 0 1px;
  border-radius: 4px;
  z-index: 2;

  button {
    display: flex;
    flex-direction: row;
    padding: 8px;

    p {
      margin-left: 10px;
      margin-top: 2px;
      color: #505050;
      font-size: 16px;
      font-weight: normal;
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: ${(props) => (props.isDelivery ? '43%' : '33%')};
    top: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #7159c1;
  }
`;
