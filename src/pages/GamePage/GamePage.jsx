import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './GamePage.module.scss';

import WinModal from '../../components/ui/Modal/GameEndingModals/WinModal';
import GameOverModal from '../../components/ui/Modal/GameEndingModals/GameOverModal';
import Container from '../../components/layout/Container/Container';
import Letter from '../../components/ui/Letter/Letter';

const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [word, setWord] = useState('');
  const [triesLeft, setTriesLeft] = useState(5);

  const [checkedLetters, setCheckedLetters] = useState([]);
  const [rightLetters, setRightLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  const toggleGameEndingModal = (hasWonTheGame) => {
    hasWonTheGame ? setIsWinModalOpen(true) : setIsGameOverModalOpen(true);
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
          toggleGameEndingModal(true);
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
          toggleGameEndingModal(false);
        }

        return newTries;
      });
    }
  };

  useEffect(() => {
    // Если слова нет вообще, то кидаем на страницу ошибки
    // Такое может произойти, если игрок просто так перейдёт на адрес /game
    if (!location.state) {
      navigate('/error');
      return;
    }

    const newWord = location.state.word.toUpperCase();
    setWord(newWord);

    const wordLength = newWord.length;

    /* БОЛЬШОЕ СПАСИБО ДУБИЦКОМУ КИРИЛЛУ ЗА ФИДБЕК ОБ ИГРЕ И СОВЕТЫ ПО РЕАЛИЗАЦИИ */
    /* СЛЕДУЮЩЕГО АЛГОРИТМА ОПРЕДЕЛЕНИЯ КОЛИЧЕСТВА ПОПЫТОК НА СЛОВО */

    // ====== Если слишком маленькое слово
    if (wordLength <= 4) {
      setTriesLeft(wordLength + 2);
      return;
    }

    if (wordLength <= 6) {
      setTriesLeft(wordLength);
      return;
    }

    // ====== Если слово уже побольше
    // Создаем объект для подсчета количества каждой буквы
    const letterCount = {};
    for (const letter of newWord) {
      if (letterCount[letter]) {
        letterCount[letter]++;
      } else {
        letterCount[letter] = 1;
      }
    }

    // Подсчитываем количество уникальных букв
    const uniqueLettersCount = Object.keys(letterCount).length;

    // Вычисляем количество попыток (вычитаем из длины слова повторяющиеся буквы, чтобы не было слишком просто)
    const triesLeft = wordLength - (wordLength - uniqueLettersCount);

    setTriesLeft(triesLeft);
  }, [location.state]);

  const correctPositions = new Array(word.length).fill(false);
  rightLetters.forEach((index) => {
    correctPositions[index] = true;
  });

  return (
    <>
      <WinModal isOpen={isWinModalOpen} word={word}></WinModal>
      <GameOverModal isOpen={isGameOverModalOpen} word={word} />
      <Container>
        <p className={styles.tries}>Попыток осталось: {triesLeft}</p>
        <div
          className={styles.wrongLetters}
          style={
            // Этот трюк со стилями нужен, чтобы анимировать высоту блока с неправильными буквами
            wrongLetters.length ? { maxHeight: '500px' } : { maxHeight: 0 }
          }
        >
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
    </>
  );
};

export default GamePage;
