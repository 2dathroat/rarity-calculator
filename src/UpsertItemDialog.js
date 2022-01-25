import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import {observer} from "mobx-react-lite";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Typography from "@mui/material/Typography";
import ButtonGroup from '@mui/material/ButtonGroup';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

export const UpsertItemDialog = observer(({
                                              onSave, label, open, handleClose, hasWeight, initialValue,
                                              initialWeight, title, isInEditMode, autoCompleteStore
                                          }) => {
    const [weight, setWeight] = React.useState(initialWeight || 1);
    const [value, setValue] = React.useState(initialValue || '');
    const [shouldCloseDialogAfterSave, setShouldCloseDialogAfterSave] = React.useState(true);
    const [isPopperOpen, setIsPopperOpen] = React.useState(false);

    React.useEffect(() => {
        setValue(initialValue || '');
    }, [initialValue]);

    React.useEffect(() => {
        setWeight(initialWeight || 1);
    }, [initialWeight])

    const anchorRef = React.useRef(null);

    const _onSave = () => {
        onSave(value, weight);
        setWeight(1);
        setValue('');
        if (shouldCloseDialogAfterSave) {
            handleClose();
        }
    }

    const handleToggle = () => setIsPopperOpen((prevOpen) => !prevOpen);

    const handlePopperClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setIsPopperOpen(false);
    };

    const handleSaveType = (shouldCloseDialog) => {
        setShouldCloseDialogAfterSave(shouldCloseDialog);
        setIsPopperOpen(false);
    }

    const a = (...a) => {
        console.log(a);

    }

    return (
        <Dialog open={open} handleClose={handleClose}>
            <Box sx={{padding: '25px', minWidth: '450px'}}>
                {title && (<Typography variant="h5">
                    {title}
                </Typography>)}

                <Grid container sx={{mt: '25px'}}>
                    <Grid item xs={hasWeight ? 9 : 12}>
                        <Autocomplete
                            freeSolo options={autoCompleteStore || []}
                            defaultValue={value}
                            onChange={(e, val) => setValue(val)}
                            renderInput={(params) =>
                                <TextField {...params}
                                           sx={{minWidth: '100%'}}
                                           label={label}
                                           value={value}
                                           onChange={(e) => setValue(e.target.value)}
                                />}
                        />
                    </Grid>
                    {hasWeight && (
                        <Grid item xs={3}>
                            <TextField id="standard-basic" label="Weight" value={weight} type="number"
                                       sx={{ml: '10px', minWidth: '80px'}}
                                       InputProps={{inputProps: {min: 0, max: 100}}}
                                       onChange={(e) => setWeight(e.target.value)}
                            />
                        </Grid>
                    )}
                </Grid>

                <Grid container sx={{mt: '120px'}}>
                    <Button variant="outlined" onClick={handleClose} size="large" sx={{mr: '10px'}}>Cancel</Button>

                    <ButtonGroup variant="contained" ref={anchorRef}>
                        <Button onClick={_onSave}>
                            {shouldCloseDialogAfterSave ? 'Save' : 'Save and create another one'}
                        </Button>
                        {!isInEditMode && (<Button
                            size="small"
                            onClick={handleToggle}
                        >
                            <ArrowDropUpIcon/>
                        </Button>)}
                    </ButtonGroup>
                    <Popper
                        open={isPopperOpen}
                        anchorEl={anchorRef.current}
                        transition
                        disablePortal
                        placement="top-start"
                    >
                        {({TransitionProps, placement}) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handlePopperClose}>
                                        <MenuList id="split-button-menu">
                                            <MenuItem
                                                selected={shouldCloseDialogAfterSave}
                                                onClick={() => handleSaveType(true)}
                                            >
                                                Save
                                            </MenuItem>
                                            <MenuItem
                                                selected={!shouldCloseDialogAfterSave}
                                                onClick={() => handleSaveType(false)}
                                            >
                                                Save and create another one
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Grid>
            </Box>
        </Dialog>
    );
});
