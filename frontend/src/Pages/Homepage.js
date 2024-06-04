import * as React from 'react';
import Navbar from '../Components/Navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';


function Homepage() {
    return (
        <div>
            <Navbar />

            <Container sx={{ py: 8 }}>
                <img src="./images/bg.jpg" style={{ display: 'block', margin: 'auto', width: '100%', height: '20%', marginBottom: '20px' }} />
                <Typography variant="h4" sx={{ mb: 4, mt: 6, textAlign: 'center' }}>Geofencing Attendance System</Typography>
                <Typography variant="body1" sx={{ mb: 20 }}>
                    A Geofencing Attendance System utilizes location-based technology to track and manage employee attendance. By defining virtual boundaries (geofences) around specific locations, such as office buildings or job sites, the system can automatically record when employees enter or leave these areas using their mobile devices. This enables organizations to accurately monitor employee attendance, streamline payroll processes, and enhance overall workforce management efficiency.
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4} >
                        <Card>
                            <CardMedia
                                component="img"
                                height="auto"
                                image="./images/1.webp"
                                alt="Image 1"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Real-time Tracking
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Geofencing technology enables real-time tracking of employee movements within designated areas, providing accurate attendance records.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <Card>
                            <CardMedia
                                component="img"
                                height="auto"
                                image="./images/2.webp"
                                alt="Image 2"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Automated Attendance Management
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    The system automates attendance management processes, reducing manual effort and minimizing errors associated with traditional methods.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="auto"
                                image="./images/3.webp"
                                alt="Image 3"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Enhanced Security
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Geofencing attendance systems enhance security by providing insights into employee presence at designated locations, helping to prevent unauthorized access.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Homepage;
