import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Actions({
  icons: Icons,
  colors,
  description,
  handlers,
  id,
}) {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible(!visible);
  }
  return (
    <>
      <button type="button" onClick={handleClick}>
        ...
      </button>
      {visible ? (
        <Container isDelivery={Icons.length === 3}>
          {Icons.map((Icon, index) => (
            <button type="button" onClick={() => handlers[index](id)}>
              <Icon size={20} color={colors[index]} />
              <p>{description[index]}</p>
            </button>
          ))}
        </Container>
      ) : null}
    </>
  );
}

Actions.propTypes = {
  icons: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  colors: PropTypes.arrayOf([PropTypes.string]).isRequired,
  description: PropTypes.arrayOf([PropTypes.string]).isRequired,
  handlers: PropTypes.arrayOf([PropTypes.func]).isRequired,
  id: PropTypes.string.isRequired,
};
