export default {
    menus: [ // 菜单相关路由
        {
            key: '/app/videoPlay', title: '首页', icon: 'star', component: 'VideoPlay'
        },
        { key: '/app/dashboard/index', title: '数据报表', icon: 'mobile', component: 'Dashboard' },
        // {
        //     key: '/subs4', title: '页面', icon: 'switcher',
        //     subs: [
        //         { key: '/login', title: '登录' },
        //         { key: '/404', title: '404' },
        //     ],
        // },
        {
            key: '/app/auth', title: '权限管理', icon: 'safety',
            subs: [
                { key: '/app/auth/basic', title: '用户权限升级', component: 'AuthBasic' },
                // { key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
            ],
        },
    ],
    others: [] // 非菜单相关路由
}