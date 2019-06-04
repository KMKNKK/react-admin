export default {
    menus: [ // 菜单相关路由
        {
            key: '/app/videoPlay', title: '视频管理', icon: 'star', component: 'VideoPlay'
        },
        { 
            key: '/app/dashboard/index', title: '数据报表', icon: 'area-chart', component: 'Dashboard' 
        },
        {
            key: '/app/dashboard/VisitList', title: '用户访问记录', icon: 'ordered-list', component: 'VisitList'
        },
        {
            key: '/app/auth/basic', title: '用户权限管理', icon: 'safety', component: 'AuthBasic'
        },


        {
            key: '/app/forms/ChangeInfo', title: '账号信息更改', icon: 'solution', component: 'ChangeInfo'
        },
        {
            key: '/app/pages/Notice', title: '发送公告', icon: 'message', component: 'Notice'
        },
        {
            key: '/app/pages/FeedBack', title: '查看用户反馈', icon: 'bell', component: 'FeedBack'
        },
    ],
    others: [] // 非菜单相关路由
}