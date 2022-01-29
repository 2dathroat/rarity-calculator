import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {observer} from "mobx-react-lite";
import {StoreContext} from './StoreContext';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {UpsertItemDialog} from "./UpsertItemDialog";
import {Variants} from "./Variants";
import Divider from "@mui/material/Divider";
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import Alert from "@mui/material/Alert";

export const Trait = observer(({type, id, variants, zIndex}) => {
    const store = React.useContext(StoreContext);
    const [showShowAddVariantDialog, setShowShowAddVariantDialog] = React.useState(false);
    const [showShowEditDialog, setShowShowEditDialog] = React.useState(false);

    const updateTrait = (nextData) => store.updateTrait(id, nextData);
    const addVariant = (variant) => store.addVariant(id, variant);

    return (
        <Box>
            <Grid container sx={{mb: '15px'}} direction="column" alignItems="center" justifyContent="center">
                <Grid item>
                    <ButtonGroup>
                        <Button variant="contained" onClick={() => store.removeTrait(id)} startIcon={<Delete/>}>
                            Remove
                        </Button>
                        <Button variant="contained" onClick={() => setShowShowEditDialog(true)} startIcon={<Edit/>}>
                            Edit
                        </Button>
                        <Button variant="contained" onClick={() => setShowShowAddVariantDialog(true)}
                                startIcon={<Add/>}>
                            Add Variant
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>

            <Divider/>

            <Typography variant="h6"
                        sx={{mt: '15px'}}>Variants{variants.length > 0 && ` (${variants.length})`}</Typography>

            {variants.length === 0 && (<Alert severity="warning">This trait doesn't have any variants yet.</Alert>)}

            <Variants variants={variants} traitId={id}/>

            <UpsertItemDialog label="Trait type" hasWeight={false} onSave={updateTrait}
                              initialValue={type} open={showShowEditDialog} initialZIndex={zIndex}
                              title="Edit trait" isInEditMode={true} hasZIndex={true}
                              handleClose={() => setShowShowEditDialog(false)}/>
            <UpsertItemDialog label="Variant type" hasWeight={true}
                              onSave={addVariant} open={showShowAddVariantDialog}
                              title="Add variant"
                              handleClose={() => setShowShowAddVariantDialog(false)}/>
        </Box>
    );
});
