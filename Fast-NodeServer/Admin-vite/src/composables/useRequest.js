import { api } from './useAxiosConfig'
// import md5 from 'md5'
export const login = (account, password) => api({
    url: '/login',
    method: 'post',
    data: {
        username: account,
        password: password
    }
})

export const requestUserInfo = () => api({
    url: '/userInfo',
    method: 'get'
})

export const requestUser = () => api({
    url: '/getAllUserInfo',
    method: 'get'
})

export const requestUserDetail = (id) => api({
    url: `/user-manage/detail/${id}`,
    method: 'get'
})

export const requestRoleList = () => api({
    url: `/role/getAll`,
    method: 'get'
})

export const requestPermissionList = () => api({
    url: `/permission/getAll`,
    method: 'get'
})

export const requestArticleList = () => api({
    url: `/article/getAll`,
    method: 'get'
})
