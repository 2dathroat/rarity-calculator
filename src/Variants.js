import * as React from 'react';
import TextField from '@mui/material/TextField';
import {observer} from "mobx-react-lite";
import {StoreContext} from './StoreContext';
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

export const Variants = observer(({variants, traitId}) => {
    const store = React.useContext(StoreContext);
    const [editVariantId, setEditVariantId] = React.useState(null);

    return (
        <List>
            {
                variants.map(variant =>
                    <ListItem key={variant.id} sx={{height: '60px', mb: '7px'}}>
                        {editVariantId === variant.id ? (
                            <>
                                <TextField id="standard-basic" label="Variant type" value={variant.type}
                                           sx={{mr: '10px'}}
                                           onChange={(e) =>
                                               store.changeVariantType(traitId, variant.id, e.target.value)}
                                />
                                <TextField id="standard-basic" label="Weight" value={variant.weight} type="number"
                                           InputProps={{inputProps: {min: 0, max: 100}}}
                                           onChange={(e) =>
                                               store.changeVariantWeight(traitId, variant.id, e.target.value)}
                                />
                            </>
                        ) : (
                            <ListItemText>
                                {variant.type} ({store.calcVariantPortion(traitId, variant.id).toFixed(2)}%)
                            </ListItemText>
                        )}
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => setEditVariantId(editVariantId === variant.id ? null : variant.id)}>
                                <Edit/>
                            </IconButton>
                            <IconButton onClick={() => store.removeVariant(traitId, variant.id)}>
                                <Delete/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }
        </List>);
});