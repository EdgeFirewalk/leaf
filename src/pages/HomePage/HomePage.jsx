import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRandomWord } from '../../utils/Dictionary';

import styles from './HomePage.module.scss';

import Leaf from '../../img/leaf.png';

import WordInputModal from '../../components/ui/Modal/WordInputModal/WordInputModal';
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
      const randWord = getRandomWord();

      navigate('/game', { state: { word: randWord } });
      return;
    }

    navigate('/game', { state: { word: wordToGuess } });
  };

  return (
    <>
      <WordInputModal
        isOpen={isWordInputModalOpen}
        toggleModal={toggleWordInputModal}
        wordToGuess={wordToGuess}
        setWordToGuess={setWordToGuess}
        startGame={startGame}
      />
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
