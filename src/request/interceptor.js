import axios from 'axios'
import Cookies from 'js-cookie'
import router from '../router';

const instance = axios.create()
instance.defaults.baseURL='http://localhost:5051';
let token = Cookies.get('Authorization')

instance.interceptors.request.use(res=>{
    // if(token){
    //     res.headers['Authorization'] = token;
    // }else{
    //     router.push('/login')
    // }
    return res;
},
err=>{
    return Promise.reject(err)
})

instance.interceptors.response.use(res=>{
    return res;
},
err=>{
    return Promise.reject(err)
})
export default instance