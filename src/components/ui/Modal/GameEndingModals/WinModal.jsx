import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './GameEndingModal.module.scss';

import WinIcon from '../../../../img/party-popper.png';

import Modal from '../Modal';
import Button from '../../Button/Button';

const WinModal = ({ isOpen, word }) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} toggleModal={() => {}}>
      <img className={styles.img} src={WinIcon} alt="Party popper" />
      <p className={styles.title}>ПОБЕДА!</p>
      <p>Вы отгадали слово:</p>
      <p className={styles.word}>"{word}"</p>
      <Button onClick={(e) => navigate('/')}>В меню</Button>
    </Modal>
  );
};

export default WinModal;
