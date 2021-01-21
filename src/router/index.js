import Vue from 'vue'
import store from '../store/index'
import Router from 'vue-router'
import Cookies from 'js-cookie'
// import Home from '../views/Home.vue'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import wxbind from '../views/Wxbind.vue'
import wxlogin from '../views/wxlogin.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ResetResult from '../views/ResetResult.vue'
import Register from '../views/Register.vue'
import RegisterResult from '../views/RegisterResult.vue'
import UserLicense from '../views/UserLicense.vue'
import JobDetail from '../views/JobDetail.vue'
import {
    Notification
} from 'element-ui';
// import Resumes from '../views/Resumes.vue'
import Resume from '../views/Resume.vue'
import Position from '../views/Position.vue'
import Station from '../views/Station.vue'
import JobList from '../views/JobList.vue'
import Personal from '../views/Personal.vue'
import InforChange from '../views/inforchange.vue'
import preview from '../views/preview.vue'
// import captcha from '../components/captcha.vue'
import NewsDetail from '../views/NewsDetail.vue'
import AboutUs from '../views/AboutUs.vue'
import Specialty from '../views/Specialty.vue'
import Gap from '../views/Gap.vue'
import gapDetail from '../views/gapDetail.vue'
import ComingSoon from '../views/ComingSoon.vue'
import Appraise from '../views/appraise/appraise.vue'
import AppraiseDetail from '../views/appraise/appraiseDetail.vue'
// import {Message} from 'element-ui'
// import map from '../views/maps.vue' 
Vue.use(Router);
// Vue.use(Message)
const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'front',
            component: resolve => require(['../layout/front/index'], resolve),
            redirect: '/home',
            children: [{
                path: '/home',
                name: 'home',
                component: Home,
                meta: {
                    name:"baidu-site-verification",
                    title: '[银领人才网]海量技术人才求职_企业招聘_上银领人才网！',
                    // content: {
                    //     keywords: '银领,银领人才,银领招聘,银领人才网,银领英才,灰领,技能人才,工匠',
                    //     description: '银领人才网,是上海银领网络科技有限公司全力打造的"银领人才"招聘网站。专注于银领人才,银领英才,银领匠才,航空航天人才,军工人才等技能技术人才的求职与招聘服务',
                    // },
                    content:"code-JmM5W1gayq"

                }
            }, ]
        },
        {
            path: '/',
            name: 'front',
            component: resolve => require(['../layout/front/index'], resolve),
            redirect: '/home',
            children: [{
                    path: '/resume',
                    name: '简历',
                    component: Resume,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的,
                        title: '银领人才网-简历',
                        content: {
                            keywords: '技术人才,技术人才求职',
                            description: '银领人才网将努力使技能技术人才得到全社会的尊重与认可',
                        },

                    }
                },
                {
                    path: '/position',
                    name: '企业详情',
                    component: Position
                },
                {
                    path: '/personal',
                    name: '百度地图',
                    component: Personal
                },
                {
                    path: '/NewsDetail',
                    name: '消息详情',
                    component: NewsDetail
                },
                {
                    path: '/joblist',
                    name: '职位',
                    component: JobList
                },
                {
                    path: '/comingsoon',
                    name: '敬请期待',
                    component: ComingSoon
                },
                {
                    path: '/appraise',
                    name: '活动中心',
                    component: Appraise
                },
                {
                    path: '/appraiseDetail',
                    name: '活动详情',
                    component: AppraiseDetail
                },
                {
                    path: '/aboutus/:id',
                    name: '联系我们',
                    component: AboutUs,
                    meta: {
                        title: '银领人才网-关于我们',
                        content: {
                            keywords: '上海银领网络科技有限公司,银领求职专业网站',
                            description: '银领人才网将为“既动手又动脑”的银领人才求职提供多维度、精准化的招聘服务，为中国智能制造、制造业强国提供高技能人才的支撑。',
                        },

                    }
                },
                {
                    path: '/specialty',
                    name: '职位',
                    component: Specialty
                },
                {
                    path: '/gap',
                    name: '空白',
                    component: Gap,
                    meta: {
                        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                    }
                },
                {
                    path: '/gapDetail',
                    name: '空白',
                    component: gapDetail,
                    // meta: {
                    //     requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                    // }
                },
                {
                    path: '/station',
                    name: '职位详情',
                    component: Station,
                    meta: {
                        title: '职位管理_银领人才网',
                        content: {
                            keywords: '银领匠才,银领技术招聘,技能技术招聘',
                            description: '银领人才网,将为中国智能制造,国家经济高质量发展提供全方位的高技能人才支撑！银领人才网将解决企业技能人才缺失的核心问题！同时让“银领人才”得到全社会的认可和尊重，实现人才社会价值的提升！',
                        },

                    }
                },
            ]
        },
        {
            path: '/inforchange',
            name: 'inforchange',
            component: InforChange
        },
        {
            path: '/preview',
            name: '预览',
            component: preview
        },

        // {
        //     path: '/captcha',
        //     name: 'captcha',
        //     component: captcha
        // },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                title: '银领人才网-登录',
                content: {
                    keywords: '银领人才求职,银领人才的意思',
                    description: '银领人才是既要能动脑，又要能动手，具有较高知识层次、较强创新能力、熟练掌握高技能的高级技术人才',
                },

            }
        },
       
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/wxbind',
            name: 'wxbind',
            component: wxbind
        },
        {
            path: '/wxlogin',
            name: 'wxlogin',
            component: wxlogin
        },
        {
            path: '/reset-password',
            name: 'reset-password',
            component: ResetPassword
        },
        {
            path: '/reset-result',
            name: 'reset-result',
            component: ResetResult
        },
        {
            path: '/register-result',
            name: 'register-result',
            component: RegisterResult
        },
        {
            path: '/user-license',
            name: 'user-license',
            component: UserLicense
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: JobDetail
        },

    ]
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
    const token = Cookies.get('token')
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (token) { // 通过vuex state获取当前的token是否存在
            next()
        } else {
            Notification.info({
                title: "消息",
                message: '请先登录'
            });
            setTimeout(() => next({
                path: '/login'
                // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            }), 2000)

        }
    } else {
        next()
    }
    /* 路由发生变化修改页面meta */
    if (to.meta.content) {
        let head = document.getElementsByTagName('head');
        let meta = document.createElement('meta');
        document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.content.keywords)
        document.querySelector('meta[name="description"]').setAttribute('content', to.meta.content.description)
        meta.content = to.meta.content;
        head[0].appendChild(meta)
    }
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
})

export default router