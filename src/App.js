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

const App = () => {
  return (
    <Box width="400px" sx={{width: {xl: '1488px'}}} m="auto">
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/exercises/:id' element={<ExerciseDetail />}/>
            <Route path='/exercises' element={<ExercisesPage/>}/>
            <Route path='/yourExercises' element={<YourExercises />}/>
        </Routes>
        <Footer />
    </Box>
  )
}

export default App