// import { useAuthStore } from '../store/auto'
import router from './index'

router.beforeEach((to, from, next) => {
    //const authStore = useAuthStore() // 在导航时调用，避免加载router配置后立即调用
    // 为什么这里使用store token ，一刷新就会回到登录页 ，也就是没拿到token
    const whiteList = ['/auth']
    if (localStorage.getItem('token')) {
        if (to.path === '/auth') {
            next('/')
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/auth')
        }
    }
})

