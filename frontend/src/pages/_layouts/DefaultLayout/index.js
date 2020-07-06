import React from 'react';
import PropTypes from 'prop-types';
import { Content, Wrapper } from './styles';

function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
