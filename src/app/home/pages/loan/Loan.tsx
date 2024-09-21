import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import { CardList } from "../../components/CardList";
import AddIcon from '@mui/icons-material/Add';
import { useLoan } from "./hooks/useLoan";
import { useInitLoan } from "./hooks/useInitLoan";
import { useEffect, useState } from "react";
import { useClient } from "../../../hooks/useClient";
import { ROLES } from "../client/interfaces/client.interfaces";
import getIndividualLoan from "./components/IndividualLoan";
import getIndividualInitLoan from "./components/IndividualInitLoan";
import "./loans.css"


export type TabTypes = "creditCard" | "card";


const Loan = () => {
    const { loans, getClientLoans } = useLoan();
    const { initLoans, getInitLoans} = useInitLoan();
    const [ pageSelected, setPageSelected ] = useState<TabTypes>("creditCard");
    const { client } = useClient();

    useEffect(()=> {
        setTimeout(async () => {            
            await Promise.all([
                getClientLoans() , 
                getInitLoans()
            ])
        })
    }, [])

    useEffect(() => {
        const page =loans.length > 0? "creditCard" : "card";
        setPageSelected(page);
    },[loans])

    const showAddCardButton = client.roles.some(role => ROLES.admin === role);

    const handleChange = (_: any, page: TabTypes) => {
        setPageSelected(page);
    }
    
    const tabPadding = {
        card: pageSelected === "card"? "24px": "0px",
        creditCard : pageSelected === "creditCard"? "24px": "0px"
    }

    return (
            <TabContext value={pageSelected}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList 
                        onChange={handleChange} 
                        variant="fullWidth"
                        aria-label="lab API tabs example">
                        <Tab label="Mis tarjetas" value="creditCard" />
                        <Tab label="Disponibles" value="card" />
                    </TabList>
                </Box>
                
                <TabPanel 
                    value="creditCard" 
                    className="tab-container" 
                    sx={{ padding: tabPadding.creditCard }}>
                    
                    <CardList 
                        cards={loans || []} 
                        fComponent={getIndividualLoan} />

                </TabPanel>
                <TabPanel 
                    value="card" 
                    className="tab-container"
                    sx={{  padding: tabPadding.card,  }} >
                    
                    <Box 
                        sx={{ width: '100%', textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Estos son los prestamos disponibles 
                    </Box>

                    <CardList 
                        cards={initLoans || []} 
                        fComponent={getIndividualInitLoan} />

                        {
                            showAddCardButton && (
                                <Button 
                                    variant="outlined" 
                                    size="medium" 
                                    startIcon={<AddIcon />}
                                    sx={{
                                        width: '80%', 
                                        textAlign: 'center',
                                        marginTop: '2rem'
                                        
                                    }}>
                                        Agregar prestamo modelo
                                </Button>
                            )
                        }

                </TabPanel>
            </TabContext>


    )
}

export default Loan;