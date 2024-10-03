import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Container from '../../components/layout/Container/Container';

const GamePage = () => {
  const location = useLocation();

  const [word, setWord] = useState('');

  useEffect(() => {
    if (!location.state) {
      // TODO: Перенаправить на ErrorPage
    }

    setWord(location.state.word);
  }, []);

  return (
    <div>
      <Container>
        <p>The word is: {word}</p>
      </Container>
    </div>
  );
};

export default GamePage;
