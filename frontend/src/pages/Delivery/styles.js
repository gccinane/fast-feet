import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;

  p {
    font-size: 80px;
    font-weight: bold;
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

export const Filter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const FilterDelivery = styled.input`
  max-height: 28px;
  padding: 16px;
  border: none;
  box-shadow: 0 0 1px;
  padding: 1rem 0rem 1rem 3.5rem;
  width: 100%;
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

export const DeliveryStatus = styled.div`
  figure {
    padding: 6px;
    margin: 2px 4px;
    border-radius: 50%;
    background: ${(props) => props.color};
  }

  display: flex;
  max-width: 120px;
  flex-direction: row;
  padding: 4px 0 4px 4px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border-radius: 12px;
  font-weight: bold;
`;
