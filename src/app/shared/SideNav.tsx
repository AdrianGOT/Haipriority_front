import { Box, Button, List, ListItemButton, ListItemText } from "@mui/material";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useMainInfo } from "../home/hooks/useMenuInfo";
import { useLocation, useNavigate } from "react-router-dom";

const SideNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { menuList, setMenuList } = useMainInfo(location.pathname);
 
    const handleListItemClick = ( url: string ) => {
        
        setMenuList(preList => preList.map(item => {
            item.selected = (item.url === url);
            return item;
        }))

        navigate(`/${url}`);
    };

    return (

        <Box sx={{ 
            width: '100%', 
            height: '100%',
            bgcolor: 'background.paper',
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            boxShadow: 'rgba(8, 3, 85, 0.2) 0px 2px 8px 0px',
            justifyContent: "space-between" }}>
            <List 
                component="nav" 
                aria-label="main mailbox folders"
                sx={{width: '100%'}} >
                {
                    menuList.map(item => (
                        <ListItemButton
                        key={item.url}
                        selected={item.selected}
                        onClick={() => handleListItemClick( item.url)}
                        >
                            <ListItemText primary={item.textToShow} />
                        </ListItemButton> 
                    ))
                }
            </List>

            <Button
                sx={{width: '80%', marginBottom:'.5rem'}}
                component="label"
                role={undefined}
                startIcon={<PowerSettingsNewIcon />}
              >
                Cerrar sesión 
            </Button>

        </Box>
    )
}

export default SideNav;