import { server } from '../Plugin/axios'

export default class anomalyActionService{
    getAnomalyActionList(id){
        return server.get('/anomaly/action/' + id)
    }
    createAnomalyAction(data){
        return server.post('/anomaly/action',data)
    }
}