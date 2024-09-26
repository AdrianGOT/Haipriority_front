import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import { useGeneral } from "../hooks/useGeneral"
import { useState } from "react";
import { ClientDialog } from "../home/components/ClientDialog";
import { ClientUpdate } from "../home/pages/client/interfaces/client.interfaces";
import { useKey } from "../auth/hooks/useKey";
import { encryptDataV2 } from "../helpers/encryptData";

export const ToolBar = () => {
    const { client, updateClient } = useGeneral();
    const [ openMenu, setOpenMenu ] = useState<boolean>(false);
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
    const [ openEditDialog, setOpeneditDialog ] = useState(false); 
    const { publicKey } = useKey();



    const initials = client?.name.split(" ")
                        .reduce((pr, curr) => pr + curr.charAt(0).toUpperCase() ,"")
                        .slice(0, 3)
    
    const handleAvatarClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(ev.currentTarget);
        setOpenMenu(true);
    }

    const handleEditCLient = () => {
        setOpeneditDialog(true);
    }

    const handleCloseEditDialog = async (values: ClientUpdate) => {
        setOpeneditDialog(false);
        handleClose();

        if(!values) return;

        if("password" in values){
            const passwordEncrypted = await encryptDataV2(values.password!, publicKey);
            values.password = passwordEncrypted;  
        }

        await updateClient(values)
    }

    const handleClose = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    }

    return (
        <Box
            className="box-content" 
            sx={{
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.8rem  2rem',  
            backgroundColor: 'red'}}>
            <h2>Bank App</h2>
            <IconButton
                id="button-client"
                aria-controls={openMenu? "client-menu" : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                aria-label="menu"
                size="small"
                onClick={handleAvatarClick} className="avatar-clickable"
                >

                <p>{initials}</p>
            </IconButton>

            
            <Menu
                id="client-menu"
                aria-labelledby="button-client"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                >
                <MenuItem onClick={handleEditCLient}>Editar</MenuItem>
            </Menu>

            <ClientDialog open={openEditDialog} onClose={handleCloseEditDialog} clientSelected={client}/>

        </Box>

        
    )
}