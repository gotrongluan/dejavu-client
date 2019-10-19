import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Avatar, Popover, Icon, Divider } from 'antd';
import MessengerPopover from 'components/MessengerPopover';
import NotificationPopover from 'components/NotificationPopover';
import Heart from 'elements/Icon/Heart';
import Coin from 'elements/Icon/Coin';
import Routes from 'config/router.config';
import styles from './index.module.less';

const { Header } = Layout;
const MenuItem = Menu.Item;

const DejavuHeader = (props) => {
    const { location, history } = props;
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
                <Popover
                    arrowPointAtCenter={false}
                    popupAlign={{ offset: [0, 11] }}
                    popupClassName={styles.content}
                    visible
                    content={(
                        <div>
                            <div className={styles.profile} onClick={() => history.push('/account')}>
                                <Icon type="user" style={{ color: 'yellowgreen' }} /><span style={{ marginLeft: 5, fontSize: 12 }}>Profile</span>
                            </div>
                            <div className={styles.pun}>
                                <Heart size={"14"} /><span style={{ marginLeft: 5, fontSize: 12 }}>12577</span>
                            </div>
                            <div className={styles.coins}>
                                <Coin size={"14"} /><span style={{ marginLeft: 5, fontSize: 12 }}>4069</span>
                            </div>
                            <Divider style={{ width: '100%', margin: 5 }}/>
                            <div className={styles.logout}>
                                <Icon type="logout" style={{ color: 'yellowgreen' }}/><span style={{ marginLeft: 5, fontSize: 12 }}>Log out</span>
                            </div>
                        </div>
                    )}
                >
                    <div className={styles.account}>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon="user" size={28} />
                        <span className={styles.name}>Yuna Choi</span>
                    </div>
                </Popover>
                <div className={styles.messengerPopover}><MessengerPopover /></div>
                <div className={styles.notificationPopover}><NotificationPopover /></div>

                {/* <div className={styles.pun}>
                    <Heart size={"28"} /><span className={styles.punAmount}>12577</span>
                </div>
                <div className={styles.coins}>
                    <Coin size={"10"} /><span className={styles.coinAmount}>4069</span>
                </div> */}
                
            </div>
        </Header>
    )
}

export default withRouter(DejavuHeader);