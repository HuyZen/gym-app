import { Stack, Typography } from '@mui/material'
import React from 'react'

const YourExercises = () => {
  return (
    <Stack alignItems="center" mt="120px" justifyContent="center" mx="50px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Your Exercises <br /> Build Your Perfect Body
      </Typography>
    </Stack>
  )
}

export default YourExercises