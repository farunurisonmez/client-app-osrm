import axios, {AxiosResponse} from "axios";

interface IOSRM {
    startingCoordinate:[number, number]
    endCoordinate:[number, number]
}

interface IOSRMService {
    fetchRoute(params:IOSRM):Promise<AxiosResponse>
}

const ApiOSRMService: IOSRMService = {
    fetchRoute: async (params:IOSRM): Promise<AxiosResponse> => {
        const config = {
            params:{
                overview:false,
                alternatives:false,
                steps:true
            }
        }
        try{
            const response = axios.get(`http://router.project-osrm.org/route/v1/driving/${params.startingCoordinate};${params.endCoordinate}`, config)
            return response
        }
        catch(err){
            throw err 
        }
    },
}

export default ApiOSRMService