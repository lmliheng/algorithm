const axios = require('axios')
const getImageFromUrl = (url) => {
    const image = axios({
        method: 'get',
        url,
        responseType: 'base64string'
    }).then(res => {
        console.log(res.data)
    })}


    getImageFromUrl('https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png')

   