import { Button, FormControl, Input, InputLabel, Stack, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { Config } from 'review-poster/models/config'
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

    return <Stack spacing={3}>
        <FormControl>
            <InputLabel htmlFor='search'>Search Query:</InputLabel>
            <Input id='search' value={search} onChange={e => setSearch(e.currentTarget.value)} required></Input>
        </FormControl>
        <FormControl>
            <InputLabel htmlFor='search'>Latitude:</InputLabel>
            <Input id='lat' type='number' value={lat || ''} onChange={e => setLat(parseFloat(e.currentTarget.value))} required></Input>
        </FormControl>
        <FormControl>
            <InputLabel htmlFor='search'>Longitude:</InputLabel>
            <Input id='lon' type='number' value={long || ''} onChange={e => setLon(parseFloat(e.currentTarget.value))} required></Input>
        </FormControl>
        <FormControl>
            <InputLabel htmlFor='search'>Zoom:</InputLabel>
            <Input id='lat' type='number' value={zoom || ''} onChange={e => setZoom(parseFloat(e.currentTarget.value))} required></Input>
        </FormControl>
        <FormControl>
            <TextareaAutosize minRows={3} id='search' value={reviews[0]} onChange={e => setReviews([e.currentTarget.value])}
                placeholder="Review" required></TextareaAutosize>
        </FormControl>
        <Button variant='contained' onClick={() => onSubmit()}>Launch</Button>
    </Stack>
}
