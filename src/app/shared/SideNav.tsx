import { Box, Button, List, ListItemButton, ListItemText } from "@mui/material";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useMainInfo } from "../home/hooks/useMenuInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { useClient } from "../hooks/useClient";

const SideNav = () => {
    const { logout } = useClient();
    const navigate = useNavigate();
    const location = useLocation();
    const { menuList, setMenuList } = useMainInfo(location.pathname);
    
    const handleListItemClick = ( url: string ) => {
        const newMenuItems = menuList.map(item => {
            item.selected = url === item.path  
            return item;
        })

        setMenuList(newMenuItems);
        navigate(`/${url}`);
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem("token");
        window.location.replace('/auth/login');
    }

    return (

        <Box sx={{ 
            width: '100%', 
            height: '100%',
            bgcolor: 'background.paper',
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',

            boxShadow: 'rgba(8, 3, 85, 0.2) 0px 2px 8px 0px',
            justifyContent: "space-between" }}>
            <List 
                component="nav" 
                aria-label="main mailbox folders"
                sx={{width: '100%'}} >
                {
                    menuList.map(item => (
                        <ListItemButton
                        key={item.path}
                        selected={item.selected}
                        onClick={() => handleListItemClick( item.path)}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton> 
                    ))
                }
            </List>

            <Button
                sx={{width: '80%', marginBottom:'.5rem'}}
                component="label"
                role={undefined}
                onClick={handleLogout}
                startIcon={<PowerSettingsNewIcon />}
              >
                Cerrar sesión 
            </Button>

        </Box>
    )
}

export default SideNav;