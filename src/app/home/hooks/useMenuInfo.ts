import { useEffect, useState } from "react"
import { getMainInfo } from "../services/main";
import { ItemList } from "../interfaces/sideNav";

export const useMainInfo = (path: string) => {
    const [ menuList, setMenuList ] = useState<ItemList[]>([]);
    
    useEffect(() => {
        
        const getMenuInfo = async() => {
            const data = await getMainInfo();
            const dataMapper = data.menuList.map(item => {
                item.selected = path.includes(item.path);  
                return item;
            })
            setMenuList(dataMapper);
        }

        getMenuInfo();
    }, []) 

    return {
        menuList,
        setMenuList
    }
}