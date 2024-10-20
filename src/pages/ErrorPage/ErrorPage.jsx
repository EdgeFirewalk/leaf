import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ErrorPage.module.scss';

import PipetsImg from '../../img/nutri-pipets.png';

import Container from '../../components/layout/Container/Container';
import Button from '../../components/ui/Button/Button';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className={styles.page}>
          <img className={styles.img} src={PipetsImg} alt="Error img" />
          <p className={styles.title}>404</p>
          <p className={styles.errText}>
            Кажется, игру не удалось запустить...
          </p>
          <Button onClick={(e) => navigate('/')}>Назад в меню</Button>
        </div>
      </Container>
    </>
  );
};

export default ErrorPage;
