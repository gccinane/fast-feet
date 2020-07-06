import React from 'react';
import PropTypes from 'prop-types';
import { Content, Wrapper } from './styles';

function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
