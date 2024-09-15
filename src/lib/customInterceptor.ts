
import toast from "react-hot-toast";

class CustomApi {
    static _instance: CustomApi;

    private headerInit!: HeadersInit;
    private baseURL!: string;

    constructor(baseUrl: string){
        this.baseURL = baseUrl;
        this.headerInit = {
            'Content-type': "application/json; charset=utf-8"
            ,
        }
    }

    public static get instance(): CustomApi{
        if(!CustomApi._instance){
            CustomApi._instance = new CustomApi("http://localhost:3005/api");
        }
        return CustomApi._instance;
    }

    get = async (complement: string) => {
        const url = this.baseURL + complement;
        return this.interceptor(url);
    }

    post = async (complement: string, payload = {}) => {
        
        const newPayload = this.JsonConvert(payload);
        const url = this.baseURL + complement;
        const option: RequestInit = {
            method: "POST",
            body: newPayload
        }


        return  this.interceptor(url, option);
    }

    put = async (complement: string, payload = {}) => {
        
        const newPayload = this.JsonConvert(payload);    
        const url = this.baseURL + complement;
        const option: RequestInit = {
            method: "PUT",
            body: newPayload
        }
        
        return this.interceptor(url, option);
    }

    delete = async (complement: string) => {
        const url = this.baseURL + complement;
        const option: RequestInit = {
            method: "DELETE"
        }
        return this.interceptor(url,  option);
    }

    private JsonConvert = (payload = {}): string => {
        return JSON.stringify(payload);
    }

    private interceptor = async (url: string, option = {}) => {
        
        const token = localStorage.getItem("token") || '';
        const authorizationText = `Bearer ${token}`;
        
        const options: RequestInit = {
            ...option,
            credentials: 'include',
            headers: {
                ...this.headerInit,
                Authorization : authorizationText 
            }

        }

        try {
            
            const response = await fetch(url, options);
            const data = await response.json();

            if(response.status === 401){
                localStorage.removeItem("token");
                window.location.assign('/')
            }
            
            if( data && "token" in data ){
                const {token} = data;
                localStorage.setItem('token', token);
            }
            
            if(!response.ok) throw new Error(data.msg);
            
            
            return data;
        
        } catch (error) {
            toast.error(`${error}`, { duration: 2000 })
            throw new Error(`Error en la petición ${error}`)
        }


    }

}


export default CustomApi.instance;


