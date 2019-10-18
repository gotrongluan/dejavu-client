export default [
    {
        key: 'home',
        path: '/home',
        text: 'Home Page',
        component: 'Home',
    },
    {
        key: 'streamers',
        path: '/streamers',
        text: 'Streamers',
        component: 'Streamers'
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
        icon: '',
    },
    {
        key: 'notifications',
        path: '/notifications',
        hideInMenu: true,
        component: 'Notification',
        icon: '',
    },
    {
        key: 'account',
        path: '/account',
        hideInMenu: true,
        component: 'Account/Account',
        icon: 'user',
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
        path: '/exception',
        hideInMenu: true,
        routes: [
            {
                key: '404',
                path: '/404',
                component: 'Exception/404'
            },
            {
                key: '403',
                path: '/403',
                component: 'Exception/403'
            },
            {
                key: '500',
                path: '/500',
                component: 'Exception/500'
            },
            {
                key: 'failed',
                redirect: '/exception/404'
            }
        ]
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