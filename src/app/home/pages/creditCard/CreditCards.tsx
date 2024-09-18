import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useCreditCard } from "./hooks/useCreditCard";
import { useEffect, useState } from "react";
import { Box, Button, Tab } from "@mui/material";
import { CardList } from "../../components/CardList";
import getIndividualCreditCard from "./components/IndividualCreditCard";
import getIndividualCard from "./components/IndividualCard";
import AddIcon from '@mui/icons-material/Add';
import { useCards } from "./hooks/useCards";
import { useClient } from "../../../hooks/useClient";
import { ROLES } from "../../../../interfaces/client.interfaces";

import "./creditCard.css";

export type TabTypes = "creditCard" | "card";

const CreditCards = () => {
    const { creditCards, getClientCredictCards } = useCreditCard();
    const { cards, getCardList } = useCards();
    const [ pageSelected, setPageSelected ] = useState<TabTypes>("creditCard");
    const { client } = useClient();

    useEffect(()=> {
        setTimeout(async () => {
            await Promise.all([
                getClientCredictCards() , getCardList()
            ])
        })
    }, [])

    useEffect(() => {
        const page =creditCards.length > 0? "creditCard" : "card";
        setPageSelected(page);
    },[creditCards])

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
                
                <TabPanel value="creditCard" className="tab-container" sx={{ padding: tabPadding.creditCard }}>
                    
                    <CardList 
                        cards={creditCards || []} 
                        fComponent={getIndividualCreditCard} />

                </TabPanel>
                <TabPanel value="card" sx={{  padding: tabPadding.card,  }} className="tab-container">
                    <Box sx={{ width: '100%', textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Tarjetas disponibles para ser solicitadas 
                    </Box>

                    <CardList 
                        cards={cards || []} 
                        fComponent={getIndividualCard} />

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
                                        Agregar tarjeta modelo
                                </Button>
                            )
                        }

                </TabPanel>
            </TabContext>


    )
}

export default CreditCards;