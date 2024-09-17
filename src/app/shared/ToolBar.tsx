import { Avatar, Box } from "@mui/material"
import { useClient } from "../hooks/useClient"

export const ToolBar = () => {
    const { client } = useClient();

    const initials = client?.name.split(" ")
                        .reduce((pr, curr) => pr + curr.charAt(0) ,"")
                        .slice(0, 3)
    
    return (
        <Box sx={{
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '0.8rem  2rem',  
            backgroundColor: 'red'}}>
            <h2>Bank App</h2>
            <Avatar>{ initials }</Avatar>
        </Box>
    )
}