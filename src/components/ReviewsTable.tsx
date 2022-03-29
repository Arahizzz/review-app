import { Add } from '@mui/icons-material';
import {
    Avatar,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableContainer,
    Typography
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import ReviewRow from './ReviewRow';
import { Reviews } from "../../review-poster/models/config";

type Props = {
    reviews: Reviews,
    setReviews: (reviews: Reviews) => void,
    addReview: () => void
};

export default function ReviewsTable({ reviews, setReviews, addReview }: Props) {

    const editRow = (s: string, i: number) => {
        if (s) {
            const newReviews = new Reviews([...reviews.reviews])
            newReviews.reviews[i] = s;
            setReviews(newReviews);
        } else {
            //If empty string delete row
            deleteRow(i)
        }
    }

    const deleteRow = (i: number) => {
        const newReviews = new Reviews([...reviews.reviews])
        newReviews.reviews.splice(i, 1);
        setReviews(newReviews);
    }

    return <Paper style={{padding: '25px'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant='h5'>Reviews</Typography>
            <Avatar sx={{bgcolor: blue[500]}}>
                <IconButton onClick={addReview} sx={{color: 'white'}}>
                    <Add/>
                </IconButton>
            </Avatar>
        </Box>
        <TableContainer style={{maxHeight: '50vh'}}>
            <Table stickyHeader>
                <TableBody>
                    {reviews.reviews.map((r, index) => <ReviewRow key={r} value={r}
                                                                  onChangeReview={(s) => editRow(s, index)}
                                                                  onDeleteReview={() => deleteRow(index)}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
}