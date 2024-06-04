import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthContext from '../AuthContext';
import axios from 'axios';
import { grey } from '@mui/material/colors';

export default function Subject() {

    const { isLoggedIn } = React.useContext(AuthContext);

    const [subjects, setSubjects] = React.useState([]);

    const [subject, setSubject] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const [oepnStudent, setOepnStudent] = React.useState(false);

    const [student, setStudent] = React.useState('');

    const [students, setStudents] = React.useState([]);

    const [selectedSubject, setSelectedSubject] = React.useState(null);

    const handleAdd = () => {

        axios.post('http://localhost:5000/subjects', {
            name: subject,
            teacher: isLoggedIn._id
        })
            .then((response) => {
                console.log(response.data);
                alert('Subject added successfully');
                setSubjects([...subjects, response.data]);
                setOpen(false);
                setSubject('');
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to add subject');
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

    const getAllStudents = () => {

        axios.get('http://localhost:5000/students')
            .then((response) => {
                console.log('allstudents', response.data);
                setStudents(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }



    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/subjects/${id}`)
            .then((response) => {
                console.log(response.data);
                alert('Subject deleted successfully');
                getallSubjects();
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to delete subject');
            });
    }



    useEffect(() => {
        getallSubjects();
        getAllStudents();
    }, [])

    const checkUser = (student) => {

        return selectedSubject?.students?.some(s => s._id == student);
    }

    const handleAddStudent = () => {

        axios.post(`http://localhost:5000/subjects/${selectedSubject._id}/students`, {
            student: student
        })
            .then((response) => {
                console.log(response.data);
                alert('Student added successfully');
                getallSubjects();
                setOepnStudent(false);
                setStudent('');
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to add student');
            });
    }

    const handleDeleteStudent = (id) => {

        axios.delete(`http://localhost:5000/subjects/${selectedSubject._id}/students/${id}`)
            .then((response) => {
                console.log(response.data);
                alert('Student deleted successfully');
                getallSubjects();
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to delete student');
            });
    }

    return (
        <>
            <Typography textAlign={'center'} component="h1" variant="h3">
                Subjects
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box display={'flex'} justifyContent={'flex-end'}>
                <Button variant="contained" onClick={() => setOpen(true)} >Add Subject</Button>
            </Box>

            {!subjects.length && <Typography>No Subjects</Typography>}

            {subjects.map((subject) => (

                <Accordion key={subject._id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography><b>Subject Name:</b> {subject.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <b>Teacher Name:</b> {subject.teacher.fullName}
                        </Typography>
                        <br />
                        <Typography>
                            <b>Students:</b>
                        </Typography>
                        <br />
                        <Box display={'flex'} flexDirection={'flex-end'}>
                            <Button variant="contained" onClick={() => { setSelectedSubject(subject); setOepnStudent(true); }}>Add Student</Button>
                        </Box>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: grey[800] }}>
                                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Roll No</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Class</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Semester</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subject.students.length === 0 && <TableRow><TableCell colSpan={3}>No students</TableCell></TableRow>}
                                {subject.students.map((student) => (
                                    <TableRow key={student._id}>
                                        <TableCell>{student.UserId.fullName}</TableCell>
                                        <TableCell>{student.rollno}</TableCell>
                                        <TableCell>{student.classname}</TableCell>
                                        <TableCell>{student.semester}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" onClick={() => { setSelectedSubject(subject); handleDeleteStudent(student._id) }}>remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                    <AccordionActions>
                        <Button variant='contained' onClick={() => handleDelete(subject._id)}>
                            delete  subject
                        </Button>
                    </AccordionActions>
                </Accordion>
            ))}



            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Subject</DialogTitle>
                <DialogContent>
                    <Box my={2}>
                        <TextField label="Subject Name" onChange={(e) => setSubject(e.target.value)} />
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant='contained' onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={oepnStudent} onClose={() => setOepnStudent(false)}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent>
                    <Box my={2}>
                        <FormControl fullWidth>
                            <Select value={student} onChange={(e) => setStudent(e.target.value)}>
                                {students.map((s) => (
                                    <MenuItem key={s._id} value={s._id}>{s.UserId.fullName}</MenuItem>
                                )
                                )
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOepnStudent(false)}>Cancel</Button>
                    <Button variant='contained' onClick={handleAddStudent}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
