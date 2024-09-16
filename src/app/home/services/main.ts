import api from "../../../lib/customInterceptor";
import { ItemList } from "../interfaces/sideNav";

interface MenuListResponse{
    ok: boolean,
    menuList: ItemList[]
}

export const getMainInfo = async (): Promise<MenuListResponse> => {
    const urlComplement = "/main";
    return await api.get(urlComplement);
}