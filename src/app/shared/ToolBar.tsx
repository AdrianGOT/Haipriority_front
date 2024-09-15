import { Avatar, Box } from "@mui/material"

export const ToolBar = () => {
    return (
        <Box sx={{
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '0.8rem  2rem',  
            backgroundColor: 'red'}}>
            <h2>My Bank App</h2>
            <Avatar>AGO</Avatar>
        </Box>
    )
}