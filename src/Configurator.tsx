import { Button, Grid } from '@mui/material';
import { useState } from 'react';
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

    fetch("https://gist.githubusercontent.com/roman20003821/e7228dd859bcc7896bfb3bce14eabd04/raw/21fb0d18ab7571cec46dc425491f833f3ee3f934/reviewPosterConfig.json")
        .then(res => res.json())
        .then(remoteConfig => {
            const searchQueries = remoteConfig.searchQueries
            const getRandomSearchQuery = () => searchQueries[Math.floor(Math.random() * searchQueries.length)]
            const getRandomInt = (min: number, max: number) => {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
            }
            setQueryParameters(remoteConfig.citiesCoords.map((cityCoords: any) => {
                return new class implements QueryParameters {
                    searchQuery: string = getRandomSearchQuery()
                    lat: number = cityCoords.lat
                    long: number = cityCoords.lng
                    zoom: number = getRandomInt(12, 15)
                }
            }))

            setReviews(new Reviews(remoteConfig.reviews))
        })

    const runConfig = () => {
        if (reviews.reviews.length > 0 && queryParameters.length > 0) {
            collectStatisticsEvent("review_poster_launch")
            runPlaywright(new class implements Config {
                params: QueryParameters[] = queryParameters
                reviews: Reviews = reviews
                type: RunnerType = runnerType
            });
        }
    };

    const addReview = () => {
        setReviews(new Reviews(["", ...reviews.reviews]))
    };

    return <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={8} lg={8}>
            <ReviewsTable reviews={reviews} setReviews={setReviews} addReview={addReview}></ReviewsTable>
        </Grid>
        <Grid item xs={4} lg={4}>
            <Button variant='contained' color="success" onClick={() => runConfig()} fullWidth style={{marginTop: 25}}>Start
                posting reviews on Google Maps</Button>
        </Grid>
    </Grid>
}
