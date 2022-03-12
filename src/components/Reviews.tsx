import { Add } from '@mui/icons-material';
import { Avatar, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import ReviewRow from './ReviewRow';

type Props = {
    reviews: string[],
    setReviews: (reviews: string[]) => void,
    addReview: () => void
};

export default function Reviews({ reviews, setReviews, addReview }: Props) {

    const editRow = (s: string, i: number) => {
        const newArr = [...reviews];
        if (s) {
            newArr[i] = s;
        } else {
            newArr.splice(i, 1);
        }
        setReviews(newArr);
    }

    return <Paper style={{ padding: '25px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h5'>Reviews</Typography>
            <Avatar sx={{ bgcolor: blue[500] }}>
                <IconButton onClick={addReview} sx={{ color: 'white' }}>
                    <Add />
                </IconButton>
            </Avatar>
        </Box>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow><TableCell>Edit</TableCell><TableCell>Review</TableCell></TableRow>
                </TableHead>
                <TableBody>
                    {reviews.map((r, index) => <ReviewRow key={r} value={r} onChange={(s) => editRow(s, index)} />)}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
}