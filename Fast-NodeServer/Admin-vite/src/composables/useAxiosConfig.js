import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:7000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',

    }

})

api.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers.authorization = localStorage.getItem('token')
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export { api }
