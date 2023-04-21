import React, { useState } from "react";
import SearchExercises from "../components/Exercises/SearchExercises";
import Exercises from "../components/Exercises/Exercises";
import { Box } from "@mui/material";

const ExercisesPage = () => {
    const [bodyPart, setBodyPart] = useState("all");
    const [exercises, setExercises] = useState([]);
    return (
        <Box sx={{marginTop:"150px"}}>
            <SearchExercises
                setExercises={setExercises}
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
            />
            <Exercises
                setExercises={setExercises}
                bodyPart={bodyPart}
                exercises={exercises}
        />
        </Box>
    );
};

export default ExercisesPage;
