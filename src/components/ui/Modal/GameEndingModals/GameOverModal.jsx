import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './GameEndingModal.module.scss';

import LooseIcon from '../../../../img/pensive-face.png';

import Modal from '../Modal';
import Button from '../../Button/Button';

const GameOverModal = ({ isOpen, word }) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} toggleModal={() => {}}>
      <img className={styles.img} src={LooseIcon} alt="Sad face" />
      <p className={styles.title}>Поражение...</p>
      <p>Вы НЕ отгадали слово:</p>
      <p className={styles.word}>"{word}"</p>
      <Button onClick={(e) => navigate('/')}>В меню</Button>
    </Modal>
  );
};

export default GameOverModal;
