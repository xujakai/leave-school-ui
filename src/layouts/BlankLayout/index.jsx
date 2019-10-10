import React from 'react';
import styles from './index.module.scss';

export default function BlankLayout(props) {
    return (
        <div className={styles.container}>
             <div className={styles.form}>
                        {props.children}
             </div>
        </div>
    );
}
