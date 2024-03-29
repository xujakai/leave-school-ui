import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default function Logo() {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logoText}>
          离校管理系统
      </Link>
    </div>
  );
}
