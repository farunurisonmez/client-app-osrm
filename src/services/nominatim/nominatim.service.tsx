import axios, {AxiosResponse} from "axios"

interface INominatim {
    search:string
}

interface INominatimService {
    fetchNominatim(params:INominatim):Promise<AxiosResponse>;
}

const ApiNominatimService: INominatimService = {
    fetchNominatim: async (params:INominatim): Promise<AxiosResponse> => {
        const config = {
            params:{
                q:params.search,
                limit:1,
                format:"json"
            }
        }
        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search?",config)
            return response 
        }
        catch (error) {
            throw error
        }
    },
}

export default ApiNominatimService;