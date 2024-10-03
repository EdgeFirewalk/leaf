import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './HomePage.module.scss';

import Leaf from '../../img/leaf.png';

import Modal from '../../components/ui/Modal/Modal';
import Container from '../../components/layout/Container/Container';
import Button from '../../components/ui/Button/Button';

const HomePage = () => {
  const navigate = useNavigate();

  const [wordToGuess, setWordToGuess] = useState('');
  const [isWordInputModalOpen, setIsWordInputModalOpen] = useState(false);

  const toggleWordInputModal = () => {
    setIsWordInputModalOpen((isOpen) => !isOpen);
  };

  const startGame = (withRandomWord) => {
    if (withRandomWord) {
      // TODO: Сгенерировать слово и перекинуть на GamePage с ним

      navigate('/game', { state: { word: 'Случайное' } });
    }

    // TODO: Кинуть на страницу GamePage вместе с wordToGuess
  };

  return (
    <>
      <Modal
        isOpen={isWordInputModalOpen}
        toggleModal={toggleWordInputModal}
      ></Modal>
      <Container>
        <div className={styles.page}>
          <div className={styles.logo}>
            <img src={Leaf} alt="Leaf icon" />
            <p className={styles.logoText}>Лист</p>
          </div>
          <div className={styles.buttons}>
            <Button className={styles.button} onClick={(e) => startGame(true)}>
              Случайное слово
            </Button>
            <Button
              className={styles.button}
              onClick={(e) => toggleWordInputModal()}
            >
              Загадать слово
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
