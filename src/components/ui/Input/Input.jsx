import React, { forwardRef } from 'react';

import styles from './Input.module.scss';

const Input = forwardRef(({ className, isValid, errorText, ...props }, ref) => {
  return (
    <div className={className}>
      <input
        ref={ref}
        className={`${styles.input} ${isValid ? '' : styles.invalid}`}
        {...props}
      />
      <p className={`${styles.errorText} ${isValid ? '' : styles.visible}`}>
        {errorText}
      </p>
    </div>
  );
});

export default Input;
