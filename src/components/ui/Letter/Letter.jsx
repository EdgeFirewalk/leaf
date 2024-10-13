import React from 'react';

import styles from './Letter.module.scss';

const Letter = ({ type, letter, ...props }) => {
  return (
    <button className={`${styles.letter} ${styles[type]}`} {...props}>
      {type === 'underline' ? '_' : letter}
    </button>
  );
};

export default Letter;
