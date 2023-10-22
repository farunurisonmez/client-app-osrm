import axios, {AxiosResponse} from "axios"

interface Nominatim {
    search:string
}

interface NominatimService {
    fetchNominatim(params:Nominatim):Promise<AxiosResponse>;
}

const ApiNominatimService: NominatimService = {
    fetchNominatim: async (params:Nominatim): Promise<AxiosResponse> => {
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