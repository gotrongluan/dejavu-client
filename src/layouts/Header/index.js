import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import MessengerPopover from 'components/MessengerPopover';
import NotificationPopover from 'components/NotificationPopover';
import Routes from 'config/router.config';
import styles from './index.module.less';

const { Header } = Layout;
const MenuItem = Menu.Item;

const DejavuHeader = (props) => {
    const { location } = props;
    let selectedKey = location.pathname.slice(1);
    return (
        <Header className={styles.header}>
            <div className={styles.logo}>Dejavu</div>
            <Menu
                className={styles.menu}
                mode="horizontal"
                selectedKeys={[selectedKey]}
                style={{ lineHeight: '64px' }}
            >
                {
                    Routes.filter(route => 
                        !route.hideInMenu && !route.redirect && route.text
                    ).map(route => 
                        <MenuItem key={route.key}>
                            <Link to={route.path} style={{ color: 'inherit' }}>{route.text}</Link>
                        </MenuItem>
                    )
                }
            </Menu>
            <div className={styles.rightContent}>
                <div className={styles.messengerPopover}><MessengerPopover /></div>
                <div className={styles.notificationPopover}><NotificationPopover /></div>
                <div className={styles.account}>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" size={28} />
                    <span className={styles.name}>Yuna Choi</span>
                </div>
            </div>
        </Header>
    )
}

export default withRouter(DejavuHeader);