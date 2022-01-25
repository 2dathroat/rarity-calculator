import * as React from 'react';
import TextField from '@mui/material/TextField';
import {observer} from "mobx-react-lite";
import {StoreContext} from './StoreContext';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import {toJS} from 'mobx';

export const CollectionSummary = observer(() => {
    const store = React.useContext(StoreContext);

    return (
        <Card variant="outlined">
            <CardHeader title="Collection summary" sx={{bgcolor: 'primary.dark', color: 'primary.contrastText'}}/>
            <CardContent>
                <TextField label="Collection size" value={store.size} variant="outlined"
                           type="number"
                           helperText="How many NFTs do you want to generate?"
                           InputProps={{inputProps: {min: 1, step: 1}}}
                           onChange={(e) => store.size = e.target.value}/>
                <Typography sx={{mt: '15px'}}>The maximum amount of NFTs you're able to generate with your current
                    configuration is {store.maxSize}.</Typography>

                <Button variant="outlined" sx={{mt: '25px'}}>
                    <a href={`data:plain/text,${JSON.stringify(toJS(store))}`} download="data.json">
                        Download configuration
                    </a>
                </Button>
                {store.maxSize < store.size &&
                <Alert severity="error" sx={{mt: '15px'}}>{store.size - store.maxSize} possible items are missing,
                    either add more characters, traits, variants or reduce the size of the collection.</Alert>}
                {store.maxSize == store.size &&
                <Alert severity="info" sx={{mt: '15px'}}>Your collection size is exactly the same as the possible
                    options, it won't be randomly generated.</Alert>}
            </CardContent>
        </Card>
    );
});
