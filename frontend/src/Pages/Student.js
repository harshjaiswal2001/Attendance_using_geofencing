import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

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

function createData(studentName, rollNo, semester, branch) {
    return { studentName, rollNo, semester, branch };
}

export default function Student() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [studentData, setStudentData] = React.useState({
        studentName: '',
        rollNo: '',
        semester: '',
        branch: '',
    });
    const [rows, setRows] = React.useState([]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddEntry = () => {
        setRows((prevRows) => [...prevRows, studentData]);
        setStudentData({
            studentName: '',
            rollNo: '',
            semester: '',
            branch: '',
        });
        handleCloseDialog();
    };

    return (
        <Container maxWidth='lg' sx={{ py: 3 }}>
            <Typography variant='h3' textAlign='center'>Student Registration</Typography>
            <Box display='flex' justifyContent='end'>

                <Button onClick={handleOpenDialog}
                    variant="contained" startIcon={<AddIcon />}
                    sx={{mb:3 }}>
                    Add
                </Button>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent>
                    <TextField
                        name="studentName"
                        label="Student Name"
                        value={studentData.studentName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="rollNo"
                        label="Roll No"
                        value={studentData.rollNo}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="semester"
                        label="Semester"
                        value={studentData.semester}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="branch"
                        label="Branch"
                        value={studentData.branch}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEntry} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Student Name</StyledTableCell>
                            <StyledTableCell align="right">Roll No</StyledTableCell>
                            <StyledTableCell align="right">Semester</StyledTableCell>
                            <StyledTableCell align="right">Branch</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{row.studentName}</StyledTableCell>
                                <StyledTableCell align="right">{row.rollNo}</StyledTableCell>
                                <StyledTableCell align="right">{row.semester}</StyledTableCell>
                                <StyledTableCell align="right">{row.branch}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
