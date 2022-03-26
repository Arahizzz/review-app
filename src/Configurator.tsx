import {
    Button,
    FormControl,
    FormControlLabel,
    Grid, Input,
    InputLabel, Switch, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Config, QueryParameters, Reviews } from 'review-poster/models/config'
import { RunnerType } from 'review-poster/models/runnerType';
import ReviewsTable from './components/ReviewsTable';
import { runPlaywright } from './services/playwright';
import { collectStatisticsEvent } from "./services/firebase";

export default function Configurator() {
    const [reviews, setReviews] = useState<Reviews>(new Reviews([]));
    const [queryParameters, setQueryParameters] = useState<QueryParameters[]>([{
        searchQuery: '',
        lat: 0,
        long: 0,
        zoom: 12
    }])
    const [runnerType, setRunnerType] = useState<RunnerType>(RunnerType.GoogleMaps)
    const [advancedMode, setAdvancedMode] = useState<boolean>(false)

    const [searchQueryAdvance, setSearchQueryAdvanced] = useState<string>("")
    const [latAdvanced, setLatAdvanced] = useState<number>(0)
    const [longAdvanced, setLongAdvanced] = useState<number>(0)
    const [zoomAdvanced, setZoomAdvanced] = useState<number>(0)

    useEffect(() => {
        fetch("https://gist.githubusercontent.com/roman20003821/e7228dd859bcc7896bfb3bce14eabd04/raw/21fb0d18ab7571cec46dc425491f833f3ee3f934/reviewPosterConfig.json")
            .then(res => res.json())
            .then(remoteConfig => {
                const shuffle = (array: any[]) => {
                    array.sort(() => Math.random() - 0.5)
                    return array
                }

                const searchQueries = remoteConfig.searchQueries
                const getRandomSearchQuery = () => searchQueries[Math.floor(Math.random() * searchQueries.length)]

                const getRandomInt = (min: number, max: number) => {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
                }

                setQueryParameters(shuffle(remoteConfig.citiesCoords).map((cityCoords: any) => {
                    return new class implements QueryParameters {
                        searchQuery: string = getRandomSearchQuery()
                        lat: number = cityCoords.lat
                        long: number = cityCoords.lng
                        zoom: number = getRandomInt(12, 15)
                    }
                }))

                setReviews(new Reviews(remoteConfig.reviews))
            })
    }, [])


    const runConfig = () => {
        if (advancedMode) {
            if (latAdvanced && longAdvanced && zoomAdvanced && reviews.reviews.length > 0) {
                collectStatisticsEvent("review_poster_launch", {advancedMode: advancedMode})
                runPlaywright(new class implements Config {
                    params: QueryParameters[] = [new class implements QueryParameters {
                        searchQuery: string = searchQueryAdvance
                        lat: number = latAdvanced
                        long: number = longAdvanced
                        zoom: number = zoomAdvanced
                    }]
                    reviews: Reviews = reviews
                    type: RunnerType = runnerType
                });
            }
        } else {
            if (reviews.reviews.length > 0 && queryParameters.length > 0) {
                collectStatisticsEvent("review_poster_launch", {advancedMode: advancedMode})
                runPlaywright(new class implements Config {
                    params: QueryParameters[] = queryParameters
                    reviews: Reviews = reviews
                    type: RunnerType = runnerType
                });
            }
        }
    };

    const addReview = () => {
        setReviews(new Reviews(["", ...reviews.reviews]))
    };

    return <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={8} lg={8}>
            <ReviewsTable reviews={reviews} setReviews={setReviews} addReview={addReview}></ReviewsTable>
            <FormControlLabel control={
                <Switch
                    name="Advanced mode"
                    value="Advanced mode"
                    checked={advancedMode}
                    onChange={(e) => setAdvancedMode(e.target.checked)}
                />
            } label="Advanced mode" style={{marginTop: 5, marginLeft: 25}}/>
            {advancedMode && <Grid container justifyContent="space-around" style={{marginTop:25}}>
                <Grid item xs={12} lg={5}>
                    <FormControl fullWidth style={{margin:10}}>
                        <InputLabel htmlFor='search'> Search Query</InputLabel>
                        <Input id='search' value={searchQueryAdvance}
                               onChange={e => setSearchQueryAdvanced(e.currentTarget.value)}
                               required></Input>
                    </FormControl>
                    <FormControl fullWidth style={{margin:10}}>
                        <InputLabel htmlFor='lat'>Latitude</InputLabel>
                        <Input id='lat' type='number' value={latAdvanced || ''}
                               onChange={e => setLatAdvanced(parseFloat(e.currentTarget.value))} required></Input>
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <FormControl fullWidth style={{margin:10}}>
                        <InputLabel htmlFor='zoom'>Zoom</InputLabel>
                        <Input id='zoom' type='number' value={zoomAdvanced || ''}
                               onChange={e => setZoomAdvanced(parseFloat(e.currentTarget.value))} required></Input>
                    </FormControl>
                    <FormControl fullWidth style={{margin:10}}>
                        <InputLabel htmlFor='lon'>Longitude</InputLabel>
                        <Input id='lon' type='number' value={longAdvanced || ''}
                               onChange={e => setLongAdvanced(parseFloat(e.currentTarget.value))} required></Input>
                    </FormControl>
                </Grid>
            </Grid>}
        </Grid>
        <Grid item xs={4} lg={4}>
            <Button variant='contained' color="success" onClick={() => runConfig()} fullWidth style={{marginTop: 25}}>Start
                posting reviews on Google Maps</Button>
            <Typography variant='body2' fontWeight="light" textAlign="center" style={{marginTop: 5}}>Incognito window will be opened, login
                with
                your credentials <br/>and wait till program completes
                (review poster will control your browser)</Typography>
        </Grid>
    </Grid>
}