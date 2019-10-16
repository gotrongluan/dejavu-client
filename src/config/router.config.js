export default [
    {
        key: 'home',
        path: '/home',
        text: 'Home Page',
        component: 'Home',
    },
    {
        key: 'livestream',
        path: '/livestream',
        text: 'Live Stream',
        component: 'LiveStream/Stream',
    },
    {
        key: 'messenger',
        path: '/messenger:converId',
        hideInMenu: true,
        component: 'Messenger',
    },
    {
        key: 'notifications',
        path: '/notifications',
        hideInMenu: true,
        component: 'Notification',
    },
    {
        key: 'account',
        path: '/account',
        hideInMenu: true,
        component: 'Account/Account',
    },
    {
        key: 'streamer-account',
        path: '/streamer/:streamerId',
        hideInMenu: true,
        component: 'Account/StreamerAccount',
    },
    {
        key: 'view',
        path: '/view:streamerId',
        hideInMenu: true,
        component: 'LiveStream/View'
    },
    {
        key: 'exception',
        path: '/exception:type',
        hideInMenu: true,
        component: 'Exception',
    },
    {
        key: 'default',
        path: '/',
        redirect: '/home',
    },
    {
        key: 'notfound',
        redirect: '/exception/404'
    }
];