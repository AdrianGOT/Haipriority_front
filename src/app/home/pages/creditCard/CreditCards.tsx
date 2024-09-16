import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useCreditCard } from "./hooks/useCreditCard";
import { useEffect, useState } from "react";
import { Box, Button, Tab } from "@mui/material";
import { CardList } from "../../components/CardList";
import getIndividualCreditCard from "./components/IndividualCreditCard";
import getIndividualCard from "./components/IndividualCard";
import AddIcon from '@mui/icons-material/Add';

type TabTypes = "creditCard" | "card";

const CreditCard = () => {
    const {cardList} = useCreditCard();
    const [pageSelected, setPageSelected] = useState<TabTypes>("creditCard")
    
    useEffect(()=> {
        const creditCards = cardList?.creditCards; 
        const page = creditCards?.length > 0? "creditCard" : "card";
        setPageSelected(page);

    }, [cardList])

    // TODO aqui se debe obtener el estado global del usuario para saber sus roles y poder indicar si se muestra o no botones en el lado de card
    const handleChange = (event: React.SyntheticEvent, page: TabTypes) => {
        setPageSelected(page)
    }
    
    return (
        <>
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
                <TabPanel value="creditCard" sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center'
                }}>
                    
                    <CardList 
                        cards={cardList.creditCards} 
                        fComponent={getIndividualCreditCard} />

                </TabPanel>
                <TabPanel value="card" sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center'
                }}>
                    <Box sx={{ width: '100%', textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Tarjetas disponibles para ser solicitadas 
                    </Box>

                    <CardList 
                        cards={cardList.cards} 
                        fComponent={getIndividualCard} />

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

                </TabPanel>
            </TabContext>
        </>

    )
}

export default CreditCard;