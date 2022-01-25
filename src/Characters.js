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

export const Characters = observer(() => {
    const store = React.useContext(StoreContext);
    const [editCharId, setEditCharId] = React.useState(null);

    if (store.characters.length === 0) {
        return null;
    }

    return (
        <List>
            {
                store.characters.map(character =>
                    <ListItem key={character.id} sx={{height: '60px', mb: '7px'}}>
                        {editCharId === character.id ? (
                            <>
                                <TextField id="standard-basic" label="Character name" value={character.name}
                                           sx={{mr: '10px'}}
                                           onChange={(e) => store.renameCharacter(character.id, e.target.value)}/>
                                <TextField id="standard-basic" label="Weight" value={character.weight} type="number"
                                           InputProps={{inputProps: {min: 0, max: 100}}}
                                           onChange={(e) => store.changeCharacterWeight(character.id, e.target.value)}/>
                            </>
                        ) : (
                            <ListItemText>
                                {character.name} ({store.calcCharacterPortion(character.id).toFixed(2)}%)
                            </ListItemText>
                        )}
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => setEditCharId(editCharId === character.id ? null : character.id)}>
                                <Edit/>
                            </IconButton>
                            <IconButton onClick={() => store.removeCharacter(character.id)}>
                                <Delete/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }
        </List>);
});
