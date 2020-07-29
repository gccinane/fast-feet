import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Container, PageButton } from './styles';

export default function Pagination({ page, handlePage }) {
  function incrementPage() {
    return handlePage(page + 1);
  }

  function decrementPage() {
    return handlePage(page - 1);
  }

  return (
    <Container>
      <PageButton firstpage={page === 1} onClick={decrementPage}>
        <FiArrowLeft size={24} />
      </PageButton>

      <PageButton onClick={incrementPage}>
        <FiArrowRight size={24} />
      </PageButton>
    </Container>
  );
}
