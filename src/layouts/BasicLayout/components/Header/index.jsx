import React from 'react';
import { Balloon, Icon, Nav } from '@alifd/next';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from '@/menuConfig';
import Logo from '../Logo';
import styles from './index.module.scss';

export default function Header(props) {
  const { isMobile, className, style } = props;
  return (
    <Layout.Header
      className={`${styles.iceDesignLayoutHeader} ${className}`}
      style={{ ...style }}
    >
      <Logo />

      <div className={styles.iceDesignLayoutHeaderMenu}>
        {/* Header 菜单项 begin */}
        {headerMenuConfig && headerMenuConfig.length > 0 ? (
          <Nav direction="hoz" selectedKeys={[]}>
            {headerMenuConfig.map((nav, idx) => {
              const linkProps = {};
              if (nav.newWindow) {
                linkProps.href = nav.path;
                linkProps.target = '_blank';
              } else if (nav.external) {
                linkProps.href = nav.path;
              } else {
                linkProps.to = nav.path;
              }
              return (
                <Nav.Item key={idx}>
                  {linkProps.to ? (
                    <Link {...linkProps}>
                      {nav.icon ? (
                        <FoundationSymbol type={nav.icon} size="small" />
                      ) : null}
                      <span className={styles.iceHeadNavText}>{!isMobile ? nav.name : null}</span>
                    </Link>
                  ) : (
                    <a {...linkProps}>
                      {nav.icon ? (
                        <FoundationSymbol type={nav.icon} size="small" />
                      ) : null}
                      <span className={styles.iceHeadNavText}>{!isMobile ? nav.name : null}</span>
                    </a>
                  )}
                </Nav.Item>
              );
            })}
          </Nav>
        ) : null}
        {/* Header 菜单项 end */}

        {/* Header 右侧内容块 */}
      {/*  <Balloon
          trigger={(
            <div className={styles.iceDesignHeaderUserpannel}>
              <IceImg
                height={40}
                width={40}
                src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                className={styles.userAvatar}
              />
              <div className={styles.userProfile}>
                <span className={styles.userName}>淘小宝</span>
                <br />
                <span className={styles.userDepartment}>技术部</span>
              </div>
              <Icon
                type="arrow-down"
                size="xxs"
                className={styles.iconDown}
              />
            </div>
          )}
          closable={false}
          className={styles.userProfileMenu}
        >
          <ul>
            <li className={styles.userProfileMenuItem}>
              <Link to="/account/my">
                <FoundationSymbol type="person" size="small" />
                我的主页
              </Link>
            </li>
            <li className={styles.userProfileMenuItem}>
              <Link to="/account/settings">
                <FoundationSymbol type="repair" size="small" />
                设置
              </Link>
            </li>
            <li className={styles.userProfileMenuItem}>
              <Link to="/user/login">
                <FoundationSymbol type="compass" size="small" />
                退出
              </Link>
            </li>
          </ul>
        </Balloon>*/}
      </div>
    </Layout.Header>
  );
}
