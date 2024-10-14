import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './GameOverModal.module.scss';

import WinIcon from '../../../../img/party-popper.png';
import LooseIcon from '../../../../img/pensive-face.png';

import Modal from '../Modal';
import Button from '../../Button/Button';

const GameOverModal = ({ isOpen, word, hasWon }) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} toggleModal={() => {}}>
      {hasWon ? (
        <>
          <img className={styles.img} src={WinIcon} alt="Party popper" />
          <p className={styles.title}>ПОБЕДА!</p>
          <p>Вы отгадали слово:</p>
        </>
      ) : (
        <>
          <img className={styles.img} src={LooseIcon} alt="Party popper" />
          <p className={styles.title}>Поражение...</p>
          <p>Вы НЕ отгадали слово:</p>
        </>
      )}
      <p className={styles.word}>"{word}"</p>
      <Button onClick={(e) => navigate('/')}>В меню</Button>
    </Modal>
  );
};

export default GameOverModal;
