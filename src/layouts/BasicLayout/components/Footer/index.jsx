import React from 'react';
import Layout from '@icedesign/layout';
import Logo from '../Logo';

import styles from './index.module.scss';

export default function Footer() {
  return (
    <Layout.Footer className={styles.iceDesignLayoutFooter}>
      <div className={styles.iceDesignLayoutFooterBody}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.copyright}>
          © 2019 Theme designed by
          {' '}
          <a
            href="http://www.topme.pro/"
            target="_blank"
            className={styles.copyrightLink}
            rel="noopener noreferrer"
          >
            topme
          </a>
        </div>
      </div>
    </Layout.Footer>
  );
}
