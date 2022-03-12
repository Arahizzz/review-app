import { IconButton, TableCell, TableRow, TextareaAutosize } from "@mui/material";
import { Done, Edit, NotInterested } from '@mui/icons-material'
import { useState } from "react";
import styled from "@emotion/styled";

const MultiLineSpan = styled.span`
white-space: pre-line
`

export default function ReviewRow({ value, onChange }: { value: string, onChange: (arg0: string) => void }) {
    const [isEdit, setEdit] = useState(!value);
    const [state, setState] = useState(value);

    const startEdit = () => setEdit(true);
    const cancelEdit = () => {
        setEdit(false);
        setState(value);
    };
    const saveEdit = () => {
        setEdit(false);
        onChange(state);
    };

    return <TableRow>
        <TableCell style={{ width: 100 }}> {isEdit
            ? <div>
                <IconButton onClick={saveEdit}><Done /></IconButton>
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