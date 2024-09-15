import api from "../../../lib/customInterceptor";

interface MenuListResponse{
    ok: boolean,
    menuList: string[]
}

export const getMainInfo = async (): Promise<MenuListResponse> => {
    const urlComplement = "/main";
    return await api.get(urlComplement);
}