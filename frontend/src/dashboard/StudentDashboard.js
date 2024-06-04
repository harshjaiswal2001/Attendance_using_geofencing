import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import LocationComponent from './LocationComponent'
import AuthContext from '../AuthContext';
import Camera from './Camera';

export default function StudentDashboard() {

  const { isLoggedIn } = React.useContext(AuthContext);
  const [recognizedFace, setRecognizedFace] = React.useState('');

  return (
    <div>
      <Typography component="h1" variant="h3" textAlign={'center'} >
        Student Dashboard
      </Typography>
      <br />
      <br />

      <Typography component="h1" variant="h5">
        Welcome {isLoggedIn.fullName}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {recognizedFace !== '' &&
        <LocationComponent />
      }


      {recognizedFace ==='' &&
        <Camera setRecognizedFace={setRecognizedFace}/>
      }
    </div>
  )
}
