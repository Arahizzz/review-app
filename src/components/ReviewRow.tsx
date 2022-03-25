import { IconButton, TableCell, TableRow, TextareaAutosize } from "@mui/material";
import { Delete, Done, Edit, NotInterested } from '@mui/icons-material'
import { useState } from "react";
import styled from "@emotion/styled";

const MultiLineSpan = styled.span`
white-space: pre-line
`

export default function ReviewRow({ value, onChangeReview, onDeleteReview }: { value: string, onChangeReview: (arg0: string) => void, onDeleteReview: () => void }) {
    const [isEdit, setEdit] = useState(!value);
    const [state, setState] = useState(value);

    const startEdit = () => setEdit(true);
    const cancelEdit = () => {
        setEdit(false);
        setState(value);
    };
    const saveEdit = () => {
        setEdit(false);
        onChangeReview(state);
    };

    return <TableRow>
        <TableCell style={{ width: 150 }}> {isEdit
            ? <div>
                <IconButton onClick={saveEdit}><Done /></IconButton>
                <IconButton onClick={onDeleteReview}><Delete /></IconButton>
                <IconButton onClick={cancelEdit}><NotInterested /></IconButton>
            </div>
            : <IconButton onClick={startEdit}><Edit /></IconButton>}
        </TableCell>
        <TableCell>{isEdit ?
            <TextareaAutosize
            autoFocus={true} value={state} onChange={(e) => setState(e.currentTarget.value)}
            style={{width: '90%'}} minRows={3}
            ></TextareaAutosize>
            : <MultiLineSpan>{value}</MultiLineSpan>}
        </TableCell>
    </TableRow>
}