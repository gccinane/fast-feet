import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  tbody {
    td {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
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
  background: ${(props) => props.color};
  color: ${(props) => darken(0.15, props.color)};
  margin-right: 5px;
`;
