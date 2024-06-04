import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthContext from '../AuthContext';
import axios from 'axios';

export default function Student() {

    const { isLoggedIn } = React.useContext(AuthContext);

    const [students, setStudents] = React.useState([]);

    const [users, setUsers] = React.useState([]);


    const [student, setStudent] = React.useState('');
    const [rollNo, setRollNo] = React.useState('');
    const [classname, setClassname] = React.useState('');
    const [semester, setSemester] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const handleAdd = () => {

        axios.post('http://localhost:5000/students', {
            UserId: student,
            rollno: rollNo,
            classname: classname,
            semester: semester,

        })
            .then((response) => {
                console.log(response.data);
                alert('Student added successfully');
                getAllStudents();
                setStudent('');
                setOpen(false);
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to add student');
            });
    }

    const handleDelete = (id) => {

        axios.delete(`http://localhost:5000/students/${id}`)
            .then((response) => {
                console.log(response.data);
                alert('Student deleted successfully');
                getAllStudents();
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to delete student');
            });
    }

    const getAllStudents = () => {

        axios.get('http://localhost:5000/students')
            .then((response) => {
                console.log(response.data);
                setStudents(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const getAllUsers = () => {

        axios.get('http://localhost:5000/users')
            .then((response) => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAllStudents();
        getAllUsers();
    }, [])

    const checkUser = (user) => {
        // check if user exists in any students where students.UserId is user._id
        return students.some((student) => student.UserId?._id === user._id);
    }

    return (
        <>
            <Typography textAlign={'center'} component="h1" variant="h3">
                Students
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box display={'flex'} justifyContent={'flex-end'}>
                <Button variant="contained" onClick={() => setOpen(true)} >Add Student</Button>
            </Box>

            {!students.length && <Typography>No Students</Typography>}

            {students.map((student) => (

                <Accordion key={student._id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{student.UserId.fullName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            RollNo: {student.rollno}
                        </Typography>
                        <Typography>
                            Class: {student.classname}
                        </Typography>
                        <Typography>
                            Semester: {student.semester}
                        </Typography>

                    </AccordionDetails>
                    <AccordionActions>
                        <Button variant='contained' onClick={() => handleDelete(student._id)}>
                            delete  student
                        </Button>
                    </AccordionActions>
                </Accordion>
            ))}



            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent>
                    <Box my={2}>
                        <FormControl fullWidth>
                            <Select value={student} onChange={(e) => setStudent(e.target.value)}>
                                {users.map((s) => {
                                    if (s.userType == 'student' && !checkUser(s))
                                        return <MenuItem key={s._id} value={s._id}>{s.fullName}</MenuItem>
                                    else return null
                                }
                                )}

                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="rollNo"
                            label="Roll No"
                            name="rollNo"
                            autoComplete="rollNo"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="classname"
                            label="Class Name"
                            name="classname"
                            autoComplete="classname"
                            value={classname}
                            onChange={(e) => setClassname(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="semester"
                            label="Semester"
                            name="semester"
                            autoComplete="semester"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            autoFocus
                        />
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant='contained' onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
