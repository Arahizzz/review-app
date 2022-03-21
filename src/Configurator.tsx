import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Paper, Select, Stack, TextareaAutosize, Typography } from '@mui/material';
import { useState } from 'react';
import { Config } from 'review-poster/models/config'
import { RunnerType } from 'review-poster/models/runnerType';
import Reviews from './components/Reviews';
import { loadConfig, saveConfig } from './services/configService';
import { runPlaywright } from './services/playwright';
import { collectStatisticsEvent } from "./services/firebase";

export default function Configurator() {
    const [type, setType] = useState(RunnerType.GoogleMaps);
    const [search, setSearch] = useState("");
    const [lat, setLat] = useState<number | undefined>(0);
    const [long, setLon] = useState<number | undefined>(0);
    const [zoom, setZoom] = useState<number | undefined>(0);
    const [reviews, setReviews] = useState<string[]>([]);

    const runConfig = () => {
        if (lat && long && zoom) {
            collectStatisticsEvent("review_poster_launch")
            const config = new Config({ lat, long, zoom }, search, reviews, type);
            runPlaywright(config);
        }
    };

    const addReview = () => {
        setReviews(["", ...reviews])
    };

    const importConfig = async () => {
        const config = await loadConfig();
        if (config){
            setType(config.type);
            setSearch(config.searchQuery);
            setLat(config.coords.lat);
            setLon(config.coords.long);
            setZoom(config.coords.zoom);
            setReviews(config.reviews);
        }
    };

    const exportConfig = async () => {
        if (lat && long && zoom) {
            const config = new Config({ lat, long, zoom }, search, reviews, type);
            await saveConfig(config);
        }
    };

    return <Grid container spacing={4}>
        <Grid item xs={12} lg={4}>
            <Paper style={{ padding: '25px' }}>
                <Typography variant='h5'>Configuration</Typography>
                <Stack spacing={3} mt={2}>
                    <FormControl>
                        <InputLabel htmlFor='type'>Type:</InputLabel>
                        <Select
                            id="type"
                            value={type}
                            label="Type"
                            onChange={e => setType(e.target.value as RunnerType)}
                        >
                            <MenuItem value={RunnerType.GoogleMaps}>Google Maps</MenuItem>
                        </Select>
                    </FormControl>
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
                    <Grid container spacing={1} alignItems='stretch'>
                        <Grid item xs={6}>
                            <Button variant='contained' onClick={() => importConfig()} fullWidth>Import Config</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant='contained' style={{ height: '100%' }} onClick={() => exportConfig()} fullWidth>Save Config</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' color="success" onClick={() => runConfig()} fullWidth>Launch</Button>
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
            <Reviews reviews={reviews} setReviews={setReviews} addReview={addReview}></Reviews>
        </Grid>
    </Grid>
}
