import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import About from './Pages/About';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './dashboard/Dashboard';
import Attendance from './Pages/Attendance';
import Subject from './Pages/Subject';
import Student from './Pages/Student';
import AuthContext from './AuthContext';
import { Navigate } from 'react-router-dom';
import { green, orange, red, yellow } from '@mui/material/colors';
import Attend from './dashboard/Attend';

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red[500],
    },
    warning: {
      main: orange[500],
    },
    info: {
      main: yellow[500],
    },
    success: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Change default font family
  },
  // Add other custom styles here
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  const login = (user) => {
    setIsLoggedIn(user);
  }

  const logout = () => {
    setIsLoggedIn(null);
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            {!isLoggedIn &&
              <>
                <Route path='/' element={<Homepage />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/attendence/:id' element={<Attend />} />
                <Route path='*' element={<Navigate to='/' />} />
              </>
            }
            {isLoggedIn &&
              <>
                <Route path='/' element={<Dashboard />} />
                <Route path='/attendance' element={<Attendance />} />
                <Route path='/subject' element={<Subject />} />
                <Route path='/student' element={<Student />} />
                <Route path='/attendence/:id' element={<Attend />} />
                <Route path='*' element={<Navigate to='/' />} />

              </>
            }
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
