import { server } from '../Plugin/axios'

export default class User{
    getUsers(){
        return server.get('/user/get')
    }
    getAllUsers(){
        return server.get('/user')
    }
    login(body){
        return server.post('/user/login',body)
    }
    createUser(body){
        return server.post('/user',body)
    }
}