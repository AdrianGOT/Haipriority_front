import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useCreditCard } from "./hooks/useCreditCard";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Tab } from "@mui/material";
import { CardList } from "../../components/CardList";
import getIndividualCreditCard from "./components/IndividualCreditCard";
import getIndividualCard from "./components/IndividualCard";
import AddIcon from '@mui/icons-material/Add';
import { useCards } from "./hooks/useCards";
import { useGeneral } from "../../../hooks/useGeneral";
import { ROLES } from "../client/interfaces/client.interfaces";

import { CardDialog } from "./components/CardDialog";
import { CreatCard } from "./interfaces/card";

import "./creditCard.css";
import { EmptyText } from "../../components/EmptyText";


export type TabTypes = "creditCard" | "card";

const CreditCards = () => {
    const [ pageSelected, setPageSelected ] = useState<TabTypes>("creditCard");
    const [openDialog, setOpenDialog] = useState(false)

    const { creditCards, getClientCredictCards } = useCreditCard();
    const { cards, getCardList, createCard } = useCards();
    const { client } = useGeneral();    
    
    useEffect(()=> {
        const getAllInfo = async() => {
            await (Promise.all([
                    getClientCredictCards() , getCardList()
            ]))
        }
        
        getAllInfo();
    }, [])

    useEffect(() => {
        if(cards.length === 0) return;
        const page =creditCards.length > 0? "creditCard" : "card"; 
        setPageSelected(page);
    },[creditCards, cards])

    const showAddCardButton = useMemo(() => 
        client.roles.some(role => ROLES.admin === role)
    , []);

    const handleChange = (_: React.SyntheticEvent, page: TabTypes) => {
        setPageSelected(page);
    }
    
    const tabPadding = {
        card: pageSelected === "card"? "24px": "0px",
        creditCard : pageSelected === "creditCard"? "24px": "0px"
    }

    const openDialogToAddCard = () => {
        setOpenDialog(true);
    }
    
    const closeDialogToAddCard = (data: CreatCard | null) => {
        console.log(data);
     
        if(data) createCard(data)
        
        setOpenDialog(false);
    }

    const isCardListEmpty = creditCards.length === 0;
    const emptyMessageText = useMemo(()=> {
        const isAdmin = client.roles.includes(ROLES.admin);
        return isAdmin? "NO HAY TARJETAS CREADAS" : "NO TIENE TARJETAS ASIGNADAS";
    }, [creditCards])

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
                    
                    {isCardListEmpty && (
                        <EmptyText text={emptyMessageText} />
                    )}

                    {!isCardListEmpty && (
                        <CardList 
                            cards={creditCards || []} 
                            fComponent={getIndividualCreditCard} />
                    )}

                </TabPanel>
                <TabPanel value="card" sx={{  
                    padding: tabPadding.card, 
                    display:'flex', 
                    alignItems: "center",
                    flexDirection: 'column' }} className="tab-container">
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
                                        onClick={openDialogToAddCard}
                                        startIcon={<AddIcon />}
                                        sx={{
                                            width: '80%',
                                            maxWidth: '800px', 
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

export default CreditCards;