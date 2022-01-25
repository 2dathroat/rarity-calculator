import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Copyright} from "./Copyright";
import {observer} from "mobx-react-lite";
import {StoreContext} from './StoreContext';
import {Trait} from "./Trait";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {CollectionSummary} from "./CollectionSummary";
import {UpsertItemDialog} from "./UpsertItemDialog";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {Characters} from "./Characters";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import {traits as traitsAutoComplete} from "./Autocomplete";

const App = observer(() => {
    const store = React.useContext(StoreContext);
    const [shouldShowAddCharDialog, setShouldShowAddCharDialog] = React.useState(false);
    const [shouldShowAddTraitDialog, setShouldShowAddTraitDialog] = React.useState(false);

    return (
        <Box sx={{width: '100%', height: '100%', padding: '10px'}}>
            <Container maxWidth="md">
                <Box sx={{mb: '20px'}}>
                    <CollectionSummary/>
                </Box>

                <Card variant="outlined" sx={{mb: '20px'}}>
                    <CardHeader
                        sx={{bgcolor: 'primary.dark', color: 'primary.contrastText'}}
                        title="Characters"
                        action={
                            <IconButton aria-label="settings" onClick={() => setShouldShowAddCharDialog(true)}>
                                <Add sx={{color: 'primary.contrastText'}}/>
                            </IconButton>
                        }
                    />
                    <Characters/>
                    <UpsertItemDialog label="Character name" hasWeight={true}
                                      onSave={store.addCharacter} open={shouldShowAddCharDialog}
                                      title="Add new character"
                                      handleClose={() => setShouldShowAddCharDialog(false)}/>
                </Card>

                <Card variant="outlined" sx={{mb: '20px', backgroundColor: 'grey.200'}}>
                    <CardHeader
                        sx={{bgcolor: 'primary.dark', color: 'primary.contrastText'}}
                        title="Traits"
                        action={
                            <IconButton aria-label="settings" onClick={() => setShouldShowAddTraitDialog(true)}>
                                <Add sx={{color: 'primary.contrastText'}}/>
                            </IconButton>
                        }
                    />

                    {
                        store.traits.map(trait =>
                            <Accordion key={trait.id}>
                                <AccordionSummary>
                                    <Typography variant="h5">
                                        {trait.type}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Trait {...trait}/>
                                </AccordionDetails>
                            </Accordion>)
                    }

                    <UpsertItemDialog label="Trait type" hasWeight={false}
                                      onSave={store.addTrait} open={shouldShowAddTraitDialog}
                                      title="Add new trait" autoCompleteStore={traitsAutoComplete}
                                      handleClose={() => setShouldShowAddTraitDialog(false)}/>
                </Card>

                <Divider sx={{mt: '30px'}}/>

                <Box sx={{mt: '30px', mb: '15px'}}>
                    <Copyright/>
                </Box>
            </Container>
        </Box>
    )
})

export default App;
