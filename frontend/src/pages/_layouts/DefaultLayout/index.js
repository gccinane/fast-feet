import React from 'react';
import PropTypes from 'prop-types';
import { Content, Wrapper } from './styles';

import Header from '~/components/Header';

function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
