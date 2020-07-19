import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Actions({ icons: Icons }) {
  return (
    <Container>
      {Icons.map((Icon) => (
        <Icon size={20} />
      ))}
    </Container>
  );
}
