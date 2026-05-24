import router from './index'

router.beforeEach((to, from, next) => {
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
