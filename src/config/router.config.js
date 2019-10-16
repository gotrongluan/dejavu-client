export default [
    {
        key: 'home',
        path: '/home',
        text: 'Home Page',
        component: 'pages/Home',
    },
    {
        key: 'livestream',
        path: '/livestream',
        text: 'Live Stream',
        component: 'pages/LiveStream/Stream',
    },
    {
        key: 'messenger',
        path: '/messenger:converId',
        hideInMenu: true,
        component: 'pages/Messenger',
    },
    {
        key: 'notifications',
        path: '/notifications',
        hideInMenu: true,
        component: 'pages/Notification',
    },
    {
        key: 'account',
        path: '/account',
        hideInMenu: true,
        component: 'pages/Account/Account',
    },
    {
        key: 'streamer-account',
        path: '/streamer/:streamerId',
        hideInMenu: true,
        component: 'pages/Account/StreamerAccount',
    },
    {
        key: 'view',
        path: '/view:streamerId',
        hideInMenu: true,
        component: 'pages/LiveStream/View'
    },
    {
        key: 'exception',
        path: '/exception:type',
        hideInMenu: true,
        component: 'pages/Exception',
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