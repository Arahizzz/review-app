import { Button, FormControl, Grid, Input, InputLabel, Paper, Stack, TextareaAutosize, Typography } from '@mui/material';
import { useState } from 'react';
import { Config } from 'review-poster/models/config'
import Reviews from './components/Reviews';
import { runPlaywright } from './services/playwright';

export default function Configurator() {
    const [search, setSearch] = useState("");
    const [lat, setLat] = useState<number | undefined>(0);
    const [long, setLon] = useState<number | undefined>(0);
    const [zoom, setZoom] = useState<number | undefined>(0);
    const [reviews, setReviews] = useState<string[]>([]);

    const onSubmit = () => {
        if (lat && long && zoom) {
            const config = new Config({ lat, long, zoom }, search, reviews);
            runPlaywright(config);
        }
    };

    const addReview = () => {
        setReviews(["", ...reviews])
    };

    return <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
            <Paper style={{padding: '25px'}}>
                <Typography variant='h5'>Configuration</Typography>
                <Stack spacing={3} mt={2}>
                    <FormControl>
                        <InputLabel htmlFor='search'>Search Query:</InputLabel>
                        <Input id='search' value={search} onChange={e => setSearch(e.currentTarget.value)} required></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor='lat'>Latitude:</InputLabel>
                        <Input id='lat' type='number' value={lat || ''} onChange={e => setLat(parseFloat(e.currentTarget.value))} required></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor='lon'>Longitude:</InputLabel>
                        <Input id='lon' type='number' value={long || ''} onChange={e => setLon(parseFloat(e.currentTarget.value))} required></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor='zoom'>Zoom:</InputLabel>
                        <Input id='zoom' type='number' value={zoom || ''} onChange={e => setZoom(parseFloat(e.currentTarget.value))} required></Input>
                    </FormControl>
                    <Button variant='contained' onClick={() => onSubmit()}>Launch</Button>
                </Stack>
            </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
            <Reviews reviews={reviews} setReviews={setReviews} addReview={addReview}></Reviews>
        </Grid>
    </Grid>
}
