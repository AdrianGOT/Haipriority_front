import { useEffect, useState } from "react";
import { useCards } from "./hooks/useCard";
import { useDebitCard } from "./hooks/useDebitCard";
import { useGeneral } from "../../../hooks/useGeneral";
import { ROLES } from "../client/interfaces/client.interfaces";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import { CardList } from "../../components/CardList";
import AddIcon from '@mui/icons-material/Add';

import "./debitCard.css";
import getIndividualDebitCard from "./components/IndividualDebitCard";
import getIndividualCard from "./components/IndividualCard";
import { CardDialog } from "./components/CardDialog";
import { CreateCard } from "./interfaces/card";

export type TabTypes = "debitCard" | "card";

const DebitCard = () => {
    
    const [ pageSelected, setPageSelected ] = useState<TabTypes>("debitCard");
    const [openDialog, setOpenDialog] = useState(false);
    const { debitCards, getClientDebitCards } = useDebitCard();
    const { cards, getCardList, createCard } = useCards();
    const { client } = useGeneral();

    useEffect(()=> {
        setTimeout(async () => {
            await Promise.all([
                getClientDebitCards() , getCardList()
            ])
        })
    }, [])

    useEffect(() => {
        const page =debitCards.length > 0? "debitCard" : "card";
        setPageSelected(page);
    },[debitCards])

    const showAddCardButton = client.roles.some(role => ROLES.admin === role);

    const handleChange = (_: React.SyntheticEvent, page: TabTypes) => {
        setPageSelected(page);
    }

    const tabPadding = {
        card: pageSelected === "card"? "24px": "0px",
        creditCard : pageSelected === "debitCard"? "24px": "0px"
    }

    const closeDialogToAddCard = (data: CreateCard | null) => {

        if(data) createCard(data);

        setOpenDialog(false);
    }



    return (
        <TabContext value={pageSelected}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList 
                onChange={handleChange} 
                variant="fullWidth"
                aria-label="lab API tabs example">
                <Tab label="Mis tarjetas" value="debitCard" />
                <Tab label="Disponibles" value="card" />
            </TabList>
        </Box>
        
        <TabPanel value="debitCard" className="tab-container" sx={{ padding: tabPadding.creditCard }}>
            
            <CardList 
                cards={debitCards || []} 
                fComponent={getIndividualDebitCard} />

        </TabPanel>

        <TabPanel value="card" sx={{  
                    padding: tabPadding.card, 
                    display:'flex', 
                    alignItems: "center",
                    flexDirection: 'column' }}
                className="tab-container">

            <Box sx={{ width: '100%', textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem' }}>
                Tarjetas disponibles para ser solicitadas 
            </Box>

            <CardList 
                cards={cards || []} 
                fComponent={getIndividualCard} />

                {
                    showAddCardButton && (
                        <>
                            <Button 
                                variant="outlined" 
                                size="medium" 
                                startIcon={<AddIcon />}
                                onClick={() => setOpenDialog(true)}
                                sx={{
                                    width: '80%', 
                                    textAlign: 'center',
                                    marginTop: '2rem'
                                    
                                }}>
                                    Agregar tarjeta modelo
                            </Button>

                            <CardDialog open={openDialog} onClose={closeDialogToAddCard} />
                        </>
                    )
                }

        </TabPanel>
        
    </TabContext>
    )
}

export default DebitCard;