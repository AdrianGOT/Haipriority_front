import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useClients } from '../client/hooks/useClients';
import { generateDateToString } from '../../../helpers/dateHelper';
import { Chip, IconButton } from '@mui/material';
import { useMemo, useState } from 'react';
import { ClientDialog } from '../../components/ClientDialog';
import { ClientUpdate } from './interfaces/client.interfaces';
import { encryptDataV2 } from '../../../helpers/encryptData';
import { useKey } from '../../../auth/hooks/useKey';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useGeneral } from '../../../hooks/useGeneral';

const Clients = () => {
    const { 
      clients,
      deleteClient,
      updateClient,
      toggleState,

     } = useClients();
    const { client } = useGeneral();
    const { publicKey } = useKey();
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const clientList = useMemo( () => {
      return clients.filter(c => client.id != c.id)
    }, [clients]);

    const handleDeleteClient = (clientId: number) => {
      deleteClient(clientId);
        console.log("handleDeleteClient");
    }

    const handleEditClient = () => setOpenEditDialog(true);      
    

    const handleCloseEditDialog = async(clientInfo: ClientUpdate) => {
      setOpenEditDialog(false);
      console.log(clientInfo);
      
      if("password" in clientInfo){
        console.log("publicKey ==> ", publicKey);
        
        const passwordEncrypted = await encryptDataV2(clientInfo.password!, publicKey);
        clientInfo.password = passwordEncrypted;  
      }
      
      const clientId = "id" in clientInfo? clientInfo["id"] : 0;      
      updateClient(clientInfo, clientId as number)
    }

    const toggleclientState = (clientId: number, stateTo: boolean) => {
      toggleState(clientId, stateTo);
    }


    // const clientDefaultValues: InitClient = {
    //   id: 0,
    //   name: '',
    //   email: '',
    //   roles: [],
    //   phoneNumber: ''
    // }

    return(
     <>
        <TableContainer component={Paper}>
          <Table aria-label="simple">
          
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Correo electronico</TableCell>
                <TableCell align="right">Número de telefono</TableCell>
                <TableCell align="right">Fecha de creación</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clientList.map((clientRow) => (
                <TableRow
                  key={clientRow.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } , height: "100%"}}
                >
                  <TableCell component="th" scope="row">
                    {clientRow.name}
                  </TableCell>
                  <TableCell align="right">{clientRow.email}</TableCell>
                  <TableCell align="right">{clientRow.phoneNumber}</TableCell>
                  <TableCell align="right">{generateDateToString(new Date(clientRow.createdAt!))}</TableCell>
                  <TableCell align="right" sx={{width: "103px"}}>{
                    clientRow.state? 
                      <Chip sx={{width: "100%"}} label="Activo" color="success"  onClick={() => toggleclientState(clientRow.id, !clientRow.state)}/>
                      : <Chip sx={{width: "100%"}} label="Inactivo" color="warning" onClick={() => toggleclientState(clientRow.id, !clientRow.state)}/>
                  
                  }</TableCell>
                  <TableCell sx={{display: "flex"}} >
                    <IconButton sx={{color: "#ffa000"}}
                      aria-label="editar"
                      onClick={handleEditClient}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton
                      sx={{color: "#ff5722"}} 
                      aria-label="delete"
                      onClick={() => handleDeleteClient(clientRow.id)}>
                      <DeleteIcon />
                    </IconButton>


                    <ClientDialog open={openEditDialog} onClose={handleCloseEditDialog} clientSelected={clientRow}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        
          </Table>
      </TableContainer>
      {/* <ClientDialog open={openCreateDialog} onClose={handleCloseCreateDialog} clientSelected={clientDefaultValues}/> */}

     </>
    )
}

export default Clients;