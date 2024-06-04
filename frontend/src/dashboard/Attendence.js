import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthContext from '../AuthContext';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { QRCodeSVG } from 'qrcode.react';


export default function Attendence() {

    const { isLoggedIn } = React.useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);
    const [subject, setSubject] = React.useState('');

    const [attendences, setAttendences] = React.useState([]);

    const getAllAttendences = () => {

        axios.get('http://localhost:5000/attendences')
            .then((response) => {
                console.log(response.data);
                setAttendences(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const getallSubjects = () => {
        axios.get('http://localhost:5000/subjects/teacher/' + isLoggedIn._id)
            .then((response) => {
                console.log(response.data);
                setSubjects(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAllAttendences();
        getallSubjects();
    }, [])

    const handleStart = () => {
        axios.post('http://localhost:5000/attendences', {
            subject: subject,
        })
            .then((response) => {
                console.log(response.data);
                alert('Attendence started successfully');
                getAllAttendences();
                setSubject('');
                setOpen(false);
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to start attendence');
            });
    }

    const handleEnd = (attendence) => {
        axios.put('http://localhost:5000/attendences/' + attendence._id, {
            status: false
        })
            .then((response) => {
                console.log(response.data);
                alert('Attendence ended successfully');
                getAllAttendences();
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to end attendence');
            });
    }
    return (
        <>
            <Typography textAlign={'center'} component="h1" variant="h3">
                Attendence
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box display={'flex'} justifyContent={'flex-end'}>
                <Button variant="contained" onClick={() => setOpen(true)} >Start Attendence</Button>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Total Attendees</TableCell>
                        <TableCell>Attendees</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attendences.length === 0 && <TableRow><TableCell colSpan={5}>No attendences found</TableCell></TableRow>}
                    {attendences.map((attendence) => (
                        <TableRow key={attendence._id}>
                            <TableCell>
                                <Box>
                                    {attendence.status && <Box id='qrcode'>
                                        <QRCodeSVG value={`http://localhost:3000/attendence/${attendence._id}`} />

                                        <a target='_blank' href={`http://localhost:3000/attendence/${attendence._id}`}>Link</a>
                                    </Box>
                                    }
                                    <b>{attendence.subject.name}</b>
                                    <br />
                                </Box>
                            </TableCell>
                            <TableCell>{new Date(attendence.startDateTime).toLocaleString()}</TableCell>
                            <TableCell>{!attendence.status ? new Date(attendence.endDateTime).toLocaleString() : 'Waiting to end class '}</TableCell>
                            <TableCell>{attendence.status ? 'Started' : 'Ended'}</TableCell>
                            <TableCell>{attendence.attendees.length}</TableCell>
                            <TableCell><ol>{attendence.attendees.map(a => <li>{a.UserId.fullName}</li>)}</ol></TableCell>
                            <TableCell>{attendence.status &&
                                <Button variant='contained' onClick={() => handleEnd(attendence)}>End</Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Start Attendence</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <Select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            {subjects.map((subject) => (
                                <MenuItem key={subject._id} value={subject._id}>{subject.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant='contained' onClick={handleStart}>Start</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
