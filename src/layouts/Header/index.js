import React from 'react';
import _  from 'lodash';
import { connect } from 'react-redux';
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
    const {
        location,
        history,
        user
    } = props;
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
                    content={(
                        <div>
                            <div className={styles.profile} onClick={() => history.push('/account')}>
                                <Icon type="user" style={{ color: 'yellowgreen' }} /><span style={{ marginLeft: 5 }}>Profile</span>
                            </div>
                            <div className={styles.pun}>
                                <Heart size={"14"} /><span style={{ marginLeft: 5, fontSize: 12 }}>{user.pun}</span>
                            </div>
                            <div className={styles.coins}>
                                <Coin size={"14"} /><span style={{ marginLeft: 5, fontSize: 12 }}>{user.coins}</span>
                            </div>
                            <Divider style={{ width: '100%', margin: 5 }}/>
                            <div className={styles.logout}>
                                <Link to="/user/login"><Icon type="logout" style={{ color: 'yellowgreen' }}/><span style={{ marginLeft: 5, color: 'rgba(0,0,0,0.65)' }}>Log out</span></Link>
                            </div>
                        </div>
                    )}
                >
                    <div className={styles.account}>
                        <Avatar style={{ backgroundColor: '#87d068' }} src={user.avatar} size={28} />
                        <span className={styles.name}>{user.name}</span>
                    </div>
                </Popover>
                <div className={styles.notificationPopover}><NotificationPopover /></div>
                <div className={styles.messengerPopover}><MessengerPopover /></div>              
            </div>          
        </Header>
    )
}

const mapStateToProps = state => ({
    user: state.global.user,
});

export default withRouter(connect(mapStateToProps)(DejavuHeader));