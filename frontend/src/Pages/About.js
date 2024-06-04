import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Navbar from '../Components/Navbar';

function About() {
    return (
        <>
            <Navbar />

            <Container component="main" maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)' }}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    About Us
                </Typography>
                <Grid container spacing={3} justifyContent="center" alignItems={'center'} mt={4}>
                    <Grid item xs={2}>
                        <Avatar alt="Person 1" src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} />
                        <Typography variant="body1" align="center">Person 1</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Avatar alt="Person 2" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100 }} />
                        <Typography variant="body1" align="center">Person 2</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Avatar alt="Person 3" src="/static/images/avatar/3.jpg" sx={{ width: 100, height: 100 }} />
                        <Typography variant="body1" align="center">Person 3</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Avatar alt="Person 4" src="/static/images/avatar/4.jpg" sx={{ width: 100, height: 100 }} />
                        <Typography variant="body1" align="center">Person 4</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Avatar alt="Person 5" src="/static/images/avatar/5.jpg" sx={{ width: 100, height: 100 }} />
                        <Typography variant="body1" align="center">Person 5</Typography>
                    </Grid>
                </Grid>
            </Container>
        </>

    );
}

export default About;
