import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './GamePage.module.scss';

import Container from '../../components/layout/Container/Container';
import Letter from '../../components/ui/Letter/Letter';

const GamePage = () => {
  const location = useLocation();

  const [word, setWord] = useState('');
  const [triesLeft, setTriesLeft] = useState(5);

  const [checkedLetters, setCheckedLetters] = useState([]);
  const [rightLetters, setRightLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  const toggleGameOverModal = () => {
    console.log('Player has WON or LOST!');
    setIsGameOverModalOpen(true);
  };

  const checkLetterInWord = (letter) => {
    // Добавляем букву в массив checkedLetters
    setCheckedLetters([...checkedLetters, letter]);

    const wordArray = word.split('');

    if (wordArray.includes(letter)) {
      // Ищем все вхождения буквы в загаданное слово
      const newRightLetters = wordArray
        .map((char, index) => (char === letter ? index : null))
        .filter((index) => index !== null);

      // Добавляем ВСЕ вхождения буквы в rightLetters, потому что победа определяется по тому
      // равна ли длина этого массива длине word (загаданного слова)
      setRightLetters((prevRightLetters) => {
        const updatedRightLetters = [...prevRightLetters, ...newRightLetters];

        // Проверяем, выиграл ли игрок
        if (updatedRightLetters.length === word.length) {
          toggleGameOverModal();
        }

        return updatedRightLetters;
      });
    } else {
      // Добавляем букву в wrongLetters, если она ещё не там
      setWrongLetters((prevWrongLetters) => {
        if (!prevWrongLetters.includes(letter)) {
          return [...prevWrongLetters, letter];
        }
        return prevWrongLetters;
      });

      // Убираем одну попытку
      setTriesLeft((tries) => {
        const newTries = tries - 1;

        // Проверяем, проиграл ли игрок
        if (newTries === 0) {
          toggleGameOverModal();
        }

        return newTries;
      });
    }
  };

  useEffect(() => {
    if (!location.state) {
      // TODO: Перенаправить на ErrorPage
      return;
    }

    setWord(location.state.word.toUpperCase());
  }, [location.state]);

  const correctPositions = new Array(word.length).fill(false);
  rightLetters.forEach((index) => {
    correctPositions[index] = true;
  });

  return (
    <div>
      <Container>
        {/*<p>Загаданное слово: {word}</p>*/}
        <p>Попыток осталось: {triesLeft}</p>
        <div className={styles.wrongLetters}>
          {wrongLetters.map((letter, index) => (
            <Letter key={index} type="wrong" letter={letter} />
          ))}
        </div>
        <div className={styles.word}>
          {word
            .split('')
            .map((letter, index) =>
              correctPositions[index] ? (
                <Letter key={index} type="right" letter={letter} />
              ) : (
                <Letter key={index} type="underline" letter={letter} />
              ),
            )}
        </div>

        <div className={styles.allLetters}>
          {[
            'А',
            'Б',
            'В',
            'Г',
            'Д',
            'Е',
            'Ё',
            'Ж',
            'З',
            'И',
            'Й',
            'К',
            'Л',
            'М',
            'Н',
            'О',
            'П',
            'Р',
            'С',
            'Т',
            'У',
            'Ф',
            'Х',
            'Ц',
            'Ч',
            'Ш',
            'Щ',
            'Ъ',
            'Ы',
            'Ь',
            'Э',
            'Ю',
            'Я',
          ].map((letter, index) =>
            checkedLetters.includes(letter) ? (
              <Letter key={index} type="hidden" letter={letter} />
            ) : (
              <Letter
                key={index}
                type="default"
                letter={letter}
                onClick={() => checkLetterInWord(letter)}
              />
            ),
          )}
        </div>
      </Container>
    </div>
  );
};

export default GamePage;
