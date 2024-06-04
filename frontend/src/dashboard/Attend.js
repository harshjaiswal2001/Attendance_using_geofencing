import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Attend() {

    const { id } = useParams()
    const [attendence, setAttendence] = React.useState({});
    const [i, setI] = React.useState(5);

    const navigate = useNavigate()

    const getAttendence = () => {
        axios.get('http://localhost:5000/attendences/' + id)
            .then((response) => {
                console.log(response.data);
                setAttendence(response.data);

            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAttendence();
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (i <= 0) {
                clearInterval(intervalId); // Clear interval on condition met
                navigate('/login'); // Navigate when count is 0
            } else {
                setI(c => c - 1);
            }
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [i, navigate]); // Including 'navigate' and 'i' in dependency array

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
            <h1>
                Starting Attendence for {attendence?.subject?.name} in {i} seconds
            </h1>
        </div>
    )
}
