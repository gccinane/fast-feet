import React from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Filter, AddButton, Header } from './styles';

export default function SubHeader({
  search,
  setSearch,
  title,
  placeholder,
  navigateTo,
}) {
  return (
    <Header>
      <h1>{title}</h1>
      <div>
        <div>
          <FiSearch
            style={{ marginLeft: '1rem', position: 'absolute' }}
            size={16}
            color="#696969"
          />
          <Filter
            type="search"
            placeholder={placeholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <AddButton to={navigateTo}>
          <FiPlus size={24} color="#eee" style={{ marginRight: '4px' }} />
          CADASTRAR
        </AddButton>
      </div>
    </Header>
  );
}

SubHeader.propTypes = {
  search: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  navigateTo: PropTypes.string.isRequired,
};
