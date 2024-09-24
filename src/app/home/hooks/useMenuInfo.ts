import { useEffect, useState } from "react"
import { getMainInfo } from "../services/main";
import { ItemList } from "../interfaces/sideNav";

export const useMainInfo = (path: string) => {
    const [ menuList, setMenuList ] = useState<ItemList[]>([]);
    
    useEffect(() => {
        
        if(menuList.length > 0) return;

        const getMenuInfo = async() => {
            const data = await getMainInfo();

            setMenuList(getActiveRoute( data.menuList ));
        }

        getMenuInfo();
    
    }, [path])

    useEffect(()=>{
        if( path === "/" ) return;
        setMenuList( getActiveRoute(menuList) );
       
    }, [path])

    const getActiveRoute = (itemList: ItemList[]) => {
        return itemList.map(item => {      
                item.selected = path.includes(item.path); 
                return item;
            }
        )
    }

    return {
        menuList,
        setMenuList
    }
}