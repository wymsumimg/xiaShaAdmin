import fetch from '../request'
//获取ossToken
export const getOssToken=(params)=> {
    return fetch.get('/oss/token',{
        params
    })
};
