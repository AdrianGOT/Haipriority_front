import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

import { CardList } from "../../components/CardList";
import { useLoan } from "./hooks/useLoan";
import { useInitLoan } from "./hooks/useInitLoan";
import { useEffect, useMemo, useState } from "react";
import { useGeneral } from "../../../hooks/useGeneral";
import { ROLES } from "../client/interfaces/client.interfaces";
import getIndividualLoan from "./components/IndividualLoan";
import getIndividualInitLoan from "./components/IndividualInitLoan";
import { InitLoanDialog } from "./components/InitLoanDialog";
import { CreateLoanInit } from "./interfaces/initLoans";

import "./loans.css"
import { EmptyText } from "../../components/EmptyText";

export type TabTypes = "loans" | "init_loans";


const Loan = () => {
    const [ pageSelected, setPageSelected ] = useState<TabTypes>("loans");
    const [openDialog, setOpenDialog] = useState(false);

    const { initLoans, getInitLoans} = useInitLoan();
    const { loans, getClientLoans, createInitLoans } = useLoan();
    const { client } = useGeneral();

    useEffect(()=> {
        setTimeout(async () => {            
            await Promise.all([
                getClientLoans() , 
                getInitLoans()
            ])
        })
    }, [])

    useEffect(() => {
        const page =loans.length > 0? "loans" : "init_loans";
        setPageSelected(page);
    },[loans])

    const tabPadding = {
        card: pageSelected === "init_loans"? "24px": "0px",
        creditCard : pageSelected === "loans"? "24px": "0px"
    }
    
    const showAddCardButton = client.roles.some(role => ROLES.admin === role);

    const handleChange = (_: React.SyntheticEvent, page: TabTypes) => {
        setPageSelected(page);
    }
    
    const closeDialogToAddLoan = (data: CreateLoanInit | null) => {
        
        if(data) createInitLoans(data)

        setOpenDialog(false);
        
    }
    

    const isLoansEmpty = loans.length === 0;
    const emptyMessageText = useMemo(()=> {
        const isAdmin = client.roles.includes(ROLES.admin);
        return isAdmin? "NO HAY PRESTAMOS SOLICITADOS" : "NO TIENE PRESTAMOS APROBADOS";
    }, [loans])
    

    
    return (
            <TabContext value={pageSelected}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList 
                        onChange={handleChange} 
                        variant="fullWidth"
                        aria-label="lab API tabs example">
                        <Tab label="Mis prestamos" value="loans" />
                        <Tab label="Prestamos disponibles" value="init_loans" />
                    </TabList>
                </Box>
                
                <TabPanel 
                    value="loans" 
                    className="tab-container" 
                    sx={{ padding: tabPadding.creditCard }}>

                    {isLoansEmpty && (
                        <EmptyText text={emptyMessageText} />
                    )}

                    {!isLoansEmpty && (
                        <CardList 
                            cards={loans || []} 
                            fComponent={getIndividualLoan} />
                    )}
                    

                </TabPanel>
                <TabPanel 
                    value="init_loans" 
                    className="tab-container"
                    sx={{    
                        padding: tabPadding.card, 
                        display:'flex', 
                        alignItems: "center",
                        flexDirection: 'column' }} >
                    
                    <Box 
                        sx={{ width: '100%', textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Estos son los prestamos disponibles 
                    </Box>

                    <CardList 
                        cards={initLoans || []} 
                        fComponent={getIndividualInitLoan} />

                        {
                            showAddCardButton && (
                                <>
                                    <Button 
                                        variant="outlined" 
                                        size="medium" 
                                        onClick={() => setOpenDialog(true)}
                                        startIcon={<AddIcon />}
                                        sx={{
                                            width: '80%', 
                                            textAlign: 'center',
                                            marginTop: '2rem'
                                            
                                        }}>
                                            Agregar prestamo modelo
                                    </Button>

                                    <InitLoanDialog open={openDialog} onClose={closeDialogToAddLoan}/>
                                </>
                            )
                        }

                </TabPanel>
            </TabContext>


    )
}

export default Loan;