import React from 'react';

import styles from './Input.module.scss';

const Input = ({ className, isValid, errorText, ...props }) => {
  return (
    <div className={className}>
      <input
        className={`${styles.input} ${isValid ? '' : styles.invalid}`}
        {...props}
      />
      <p className={`${styles.errorText} ${isValid ? '' : styles.visible}`}>
        {errorText}
      </p>
    </div>
  );
};

export default Input;
