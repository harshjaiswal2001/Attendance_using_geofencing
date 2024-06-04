import { Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import AuthContext from '../AuthContext';

export default function MyAttendence() {

    const { isLoggedIn } = React.useContext(AuthContext);

    const [attendences, setAttendences] = React.useState([]);

    const getStudentAttendence = async () => {

        axios.get('http://localhost:5000/attendences/student/' + isLoggedIn._id)
            .then((response) => {
                console.log(response.data);
                setAttendences(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getStudentAttendence();
    }, [])


    return (
        <div>
            <h1 textAlign={'center'}>My Attendance</h1>
            <Divider />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                    <TableBody>

                        {attendences.map((attendence, i) => (
                            <TableRow key={i}>
                                <TableCell>{attendence.subject.name}</TableCell>
                                <TableCell>{new Date(attendence.startDateTime).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableHead>
            </Table>
        </div>
    )
}
