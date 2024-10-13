import React, { useState } from 'react';

import styles from './WordInputModal.module.scss';

import Modal from '../Modal';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

const WordInputModal = ({
  isOpen,
  toggleModal,
  wordToGuess,
  setWordToGuess,
  startGame,
}) => {
  const [isValidWord, setIsValidWord] = useState(false);

  const validateWord = (word) => {
    const regex = /^[А-Яа-яЁё]+$/;

    if (!regex.test(word)) {
      setIsValidWord(false);
    } else {
      setIsValidWord(true);
    }

    setWordToGuess(word);
  };

  return (
    <Modal isOpen={isOpen} toggleModal={toggleModal}>
      <Button className={styles.closeButton} onClick={(e) => toggleModal()}>
        X
      </Button>
      <p className={styles.title}>Какое слово загадать?</p>
      <Input
        className={styles.input}
        type="text"
        placeholder="Ваше слово"
        value={wordToGuess}
        onChange={(e) => validateWord(e.target.value)}
        isValid={isValidWord}
        errorText="Введите слово без пробелов, цифр и других спецсимволов"
      />
      <Button onClick={(e) => startGame(false)} disabled={!isValidWord}>
        Начать игру!
      </Button>
    </Modal>
  );
};

export default WordInputModal;
