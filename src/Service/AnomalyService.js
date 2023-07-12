import { server } from '../Plugin/axios'

export default class anomalyService{
    getAnomalys(){
        return server.get('/anomaly')
    }
}