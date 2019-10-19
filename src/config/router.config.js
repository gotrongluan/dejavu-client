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
        path: '/messenger',
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
        routes: [
            {
                key: 'setting',
                path: '/setting',
                component: 'Account/Setting'
            },
            {
                key: 'photo',
                path: '/photos',
                component: 'Account/Photos',
            },
            {
                key: 'follower',
                path: '/followers',
                component: 'Account/Follower',
            },
            {
                key: 'following',
                path: '/following',
                component: 'Account/Following',
            },
            {
                key: 'coin',
                path: '/coin',
                component: 'Account/Coin',
            },
            {
                key: 'default',
                path: '/',
                redirect: '/account/setting',
            },
            {
                key: 'error',
                redirect: '/exception/404',
            }
        ]
    },
    {
        key: 'streamer-account',
        path: '/streamer/:streamerId',
        hideInMenu: true,
        routes: [
            {
                key: 'info',
                path: '/info',
                component: 'Streamer/Info'
            },
            {
                key: 'photo',
                path: '/photos',
                component: 'Streamer/Photos',
            },
            {
                key: 'follower',
                path: '/followers',
                component: 'Streamer/Follower',
            },
            {
                key: 'following',
                path: '/following',
                component: 'Streamer/Following',
            },
            {
                key: 'error',
                redirect: '/exception/404',
            }
        ]
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