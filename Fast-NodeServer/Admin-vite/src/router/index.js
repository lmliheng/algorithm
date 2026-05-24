import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import UserProfile from '../views/privateViews/UserProfile.vue'
import UserInfo from '../views/publicViews/UserInfo.vue'
import ArticleManage from '../views/privateViews/ArticleManage.vue'
import PermissionManage from '../views/privateViews/PermissionManage.vue'
import RoleManage from '../views/privateViews/RoleManage.vue'
import ArticleCreate from '../views/privateViews/ArticleCreate.vue'
import UserManage from '../views/privateViews/UserManage.vue'
import ArticleRank from '../views/publicViews/ArticleRank.vue'
import ArticleDetail from '../views/publicViews/ArticleDetail.vue'
import UserImport from '../views/privateViews/UserImport.vue'

const Routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/user-profile',
        component: HomeView,
        meta: {
            title: '首页',
            icon: 'home',
            private: false,
        },
        children: [
            {
                path: '/user-profile',
                name: 'user-profile',
                component: UserProfile,
                meta: {
                    title: '用户配置',
                    icon: 'user-profile',
                    private: false,
                }
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户',
                    icon: 'user',
                    private: true,
                },
                children: [
                    {
                        path: '/user/user-info/:id',
                        props: true,
                        name: 'user-info',
                        component: UserInfo,
                        meta: {
                            title: '用户信息',
                            icon: 'user-info',
                            private: false,
                        }
                    },
                    {
                        path: '/user/user-manage',
                        name: 'user-manage',
                        component: UserManage,
                        meta: {
                            title: '用户管理',
                            icon: 'user-manage',
                            private: true,
                        },
                    },
                    {
                        path: '/user/user-import',
                        name: 'user-import',
                        component: UserImport,
                        meta: {
                            title: '导入用户',
                            icon: 'user-import',
                            private: true,
                        }
                    },
                    {
                        path: '/user/role-manage',
                        name: 'role-manage',
                        component: RoleManage,
                        meta: {
                            title: '角色管理',
                            icon: 'role-manage',
                            private: true,
                        }
                    },
                    {
                        path: '/user/permission-manage',
                        name: 'permission-manage',
                        component: PermissionManage,
                        meta: {
                            title: '权限管理',
                            icon: 'permission-manage',
                            private: true,
                        }
                    }
                ]
            },
            {
                path: '/article',
                name: 'article',
                meta: {
                    title: '文章',
                    icon: 'article',
                    private: false,
                },
                children: [
                    {
                        path: '/article/article-manage',
                        name: 'article-manage',
                        component: ArticleManage,
                        meta: {
                            title: '文章管理',
                            icon: 'article-manage',
                            private: true,
                        }
                    },
                    {
                        path: '/article/article-create',
                        name: 'article-create',
                        component: ArticleCreate,
                        meta: {
                            title: '文章创建',
                            icon: 'article-create',
                            private: true,
                        }
                    },
                    {
                        path: '/article/article-rank',
                        name: 'article-rank',
                        component: ArticleRank,
                        meta: {
                            title: '文章排名',
                            icon: 'article-rank',
                            private: false,
                        }
                    },
                    {
                        path: '/article/article-detail',
                        name: 'article-detail',
                        component: ArticleDetail,
                        meta: {
                            title: '文章详情',
                            icon: 'article-detail',
                            private: false,
                        }
                    },
                ]
            }
        ]
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthView,
        meta: {
            title: 'auth',
            icon: 'auth',
            private: false,
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [...Routes]
})

export default router
