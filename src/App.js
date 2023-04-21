import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import YourExercises from './pages/YourExercises';
import ExercisesPage from './pages/Exercises';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import Premium from './pages/Premium';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Box width="400px" sx={{width: {xl: '1488px'}}} m="auto">
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/exercises/:id' element={<ExerciseDetail />}/>
            <Route path='/exercises' element={<ExercisesPage/>}/>
            <Route path='/premium' element={<Premium />}/>
            <Route path='/contact' element={<Contact/>} />
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/profile' element={<Profile/>} />
        </Routes>
        <Footer />
    </Box>
  )
}

export default App