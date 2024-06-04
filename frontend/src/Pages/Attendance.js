import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Container } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const subjects = ['Math', 'Science', 'History']; // Sample subjects

function createData(subject, date, time, studentName) {
    return { subject, date, time, studentName, attendance: <CheckBoxIcon /> };
}

export default function Attendance() {
    const [open, setOpen] = React.useState(false);
    const [subject, setSubject] = React.useState('');
    const [date, setDate] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [startAttendance, setStartAttendance] = React.useState(false);
    const [stopAttendance, setStopAttendance] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleStartAttendance = () => {
        setStartAttendance(true);
        setStartTime(new Date().toLocaleTimeString());
    };

    const handleStopAttendance = () => {
        setStopAttendance(false);
        setEndTime(new Date().toLocaleTimeString());

    };

    const handleConfirmAttendance = () => {
        setRows(createAttendanceEntries());
        setOpen(false);
    };

    const createAttendanceEntries = () => {
        const entries = [];
        // Sample student names
        const studentNames = ['John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson'];
        for (const name of studentNames) {
            entries.push(createData(subject, date, `${startTime} - ${endTime}`, name));
        }
        return entries;
    };

    return (
        <Container maxWidth='lg' sx={{py:3}}>
            <Typography variant='h2' textAlign='center'>Attendance</Typography>
            <Box display='flex' justifyContent='end'>

                <Button onClick={handleOpenDialog}
                    variant="contained" startIcon={<AddIcon />}>
                    Mark Attendance
                </Button>

            </Box>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                            <StyledTableCell>Student Name</StyledTableCell>
                            <StyledTableCell>Attendance</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{row.subject}</StyledTableCell>
                                <StyledTableCell>{row.date}</StyledTableCell>
                                <StyledTableCell>{row.time}</StyledTableCell>
                                <StyledTableCell>{row.studentName}</StyledTableCell>
                                <StyledTableCell>{row.attendance}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Add Attendance</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        fullWidth
                        sx={{ py: 2 }}
                    >
                        {subjects.map((subject) => (
                            <MenuItem key={subject} value={subject}>
                                {subject}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        fullWidth
                        sx={{ py: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    {!startAttendance ? (
                        <Button onClick={handleStartAttendance} color="primary">Start Attendance</Button>
                    ) : (
                        <Button onClick={handleStopAttendance} color="primary">Stop Attendance</Button>
                    )}
                    {startAttendance && (
                        <Button onClick={handleConfirmAttendance} color="primary">Confirm</Button>
                    )}
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
