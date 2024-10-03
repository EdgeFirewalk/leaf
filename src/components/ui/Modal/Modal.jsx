import React from 'react';

import styles from './Modal.module.scss';

import Container from '../../layout/Container/Container';

const Modal = ({ isOpen, toggleModal, children }) => {
  return (
    <div
      className={`${styles.mask} ${isOpen ? styles.open : ''}`}
      onClick={(e) => {
        toggleModal();
      }}
    >
      <Container>
        <div
          className={`${styles.body} ${isOpen ? styles.open : ''}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </Container>
    </div>
  );
};

export default Modal;
