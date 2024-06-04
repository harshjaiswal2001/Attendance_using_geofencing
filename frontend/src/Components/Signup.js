import * as React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Dropzone from 'react-dropzone'

function Signup() {
    const [userType, setUserType] = React.useState('student');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [age, setAge] = React.useState(18);
    const [gender, setGender] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [photo, setPhoto] = React.useState(null);

    const handlePhotoChange = (acceptedFiles) => {
        setPhoto(acceptedFiles[0]);
    };

    const navigate = useNavigate();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Create a FormData object to hold the data to be sent
        const formData = new FormData();
        formData.append('fullName', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('userType', userType);

        // Append the photo file if it is available
        if (photo) {
            formData.append('photo', photo);
        }

        // Use axios to send a POST request with the FormData
        axios.post('http://localhost:5000/users/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                alert('User created successfully');
                navigate('/login');
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to create user');
            });
    };




    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xs" >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 8,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box sx={{ mt: 1, width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email Address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ border: '1px dashed', padding: 2 }}>
                                    <Dropzone onDrop={acceptedFiles => {
                                        console.log(acceptedFiles)
                                        handlePhotoChange(acceptedFiles)
                                    }}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag 'n' drop Your Photo here, or click to select files</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                </Box>
                                <small><i>This photo will be used for automated attendance using face recognition</i></small>
                            </Grid>
                            <Grid item xs={12}>
                                {/* show photo here if not null */}
                                {photo && (
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="Photo"
                                        style={{ width: '150px', height: 'auto' }}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="age"
                                    name="age"
                                    required
                                    fullWidth
                                    type="number"
                                    id="age"
                                    label="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </Grid>
                            {/* radio button for gender */}
                            <Grid item xs={12}>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="Gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="new-password"
                                    name="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="new-password"
                                    name="confirmPassword"
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup
                                row
                                aria-label="userType"
                                name="userType"
                                value={userType}
                                onChange={handleUserTypeChange}
                            >
                                <FormControlLabel value="student" control={<Radio />} label="Student" />
                                <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                            </RadioGroup>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSignup}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/Login" variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </>

    );
}

export default Signup;
