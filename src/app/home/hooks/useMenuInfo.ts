import { useEffect, useState } from "react"
import { getMainInfo } from "../services/main";


const TEXT_BY_URL = {
    "credit-card": "Tarjetas de credito",
    "debit-card": "Tarjetas de debito",
    "loan": "Prestamos",
    "clients": "Clientes",
}


interface MenuItem { 
    url        : string;
    textToShow : string; 
    selected   : boolean;

}

export const useMainInfo = (path: string) => {
    const [ menuList, setMenuList ] = useState<MenuItem[]>([]);
    
    useEffect(() => {
        
        const getMenuInfo = async() => {
            const data = await getMainInfo();
            const dataMapped: MenuItem[] = data.menuList.map( item => {         
                const p: MenuItem = {
                    url: item,
                    textToShow:TEXT_BY_URL[item as keyof typeof TEXT_BY_URL],
                    selected: path.includes(item)
                }

                return p;
            })
            setMenuList(dataMapped);
        }

        getMenuInfo();
    }, [path]) 

    return {
        menuList,
        setMenuList
    }
}