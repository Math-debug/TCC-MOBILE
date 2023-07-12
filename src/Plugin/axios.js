import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER = "http://192.168.100.63:5555";

const server = axios.create({
  baseURL: SERVER,
  headers : { 'Content-Type': 'application/json' }
})

function getToken(){
    return new Promise((resolve,reject)=>{
        const value = AsyncStorage.getItem('@token').then(value=>{
            if (value !== null) {
                resolve(value)
                }else {
                    reject('')
                }
        })
    })
} 

server.interceptors.request.use(
    config => getToken().then(token => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = token;
      }
    
      return config;
    }),
    error => Promise.reject(error)
  );
export {
  server
}