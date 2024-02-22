import axios from '../interceptor'

export function queryInedxData(){
    axios.get('/index')
}