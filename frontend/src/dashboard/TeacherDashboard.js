import { Divider, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LocationComponent from './LocationComponent'
import AuthContext from '../AuthContext';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';


export default function TeacherDashboard() {

  const [attendences, setAttendences] = React.useState([]);

  const [xAxisData, setXAxisData] = React.useState([]);
  const [seriesData, setSeriesData] = React.useState([]);

  const [option, setOption] = React.useState('');

  const getAllAttendences = () => {
    axios.get('http://localhost:5000/attendences')
      .then((response) => {
        console.log(response.data);
        setAttendences(response.data);
        setXAxisData(response.data.map(attendance => `${attendance.subject.name} - ${new Date(attendance.startDateTime).toLocaleDateString()}`))
        setSeriesData(response.data.map(attendance => attendance.attendees.length))
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllAttendences();
  }, [])


  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <div>
      <Typography component="h1" variant="h3" textAlign={'center'} >
        Teacher Dashboard
      </Typography>
      <br />
      <br />

      <Typography component="h1" variant="h5">
        Welcome {isLoggedIn.fullName}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* chart of total attendence */}
      {/* <Select
        fullWidth
        value={option}
        onChange={(e) => setOption(e.target.value)}
      >
        <MenuItem disabled value={''}>Select Class</MenuItem>
        {attendences.map((attendence, i) => (
          <MenuItem value={i}>{attendence.subject.name}</MenuItem>
        ))}
      </Select> */}

      {option == '' && attendences.length > 0 &&
        // show chart of attendence
        <BarChart
          xAxis={[{ scaleType: 'band', data: xAxisData }]}
          series={[{ data: seriesData }]}
          width={500}
          height={300}
        />
      }


      


    </div>
  )
}
