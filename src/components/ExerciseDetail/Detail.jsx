import React from "react";
import { Typography, Stack, Button } from "@mui/material";

import BodyPartImage from "../../assets/icons/body-part.png";
import TargetImage from "../../assets/icons/target.png";
import EquipmentImage from "../../assets/icons/equipment.png";
import { Link } from "react-router-dom";

const Detail = ({ exerciseDetail }) => {
  const { name, bodyPart, target, equipment, gifUrl } = exerciseDetail;
  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    }
  ]

  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center", mt:"50px" }}
    >
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h4" textTransform="capitalize">{name}</Typography>
        <Typography>
          Exercise keep you strong. {name} is one of the best exercise to target
          your {target}. It will help you to build your {bodyPart} muscle, your
          mood and gain energy.
        </Typography>
        {extraDetail.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center" >
            <Button sx={{backgroundColor:"#fff2db", width:"80px", height:"80px", borderRadius:"50%"}}>
              <img src={item.icon} alt={bodyPart} style={{width:"50px", height:"50px"}}/>
            </Button>
            <Typography variant="h6" textTransform="capitalize">
              {item.name}
            </Typography>
          </Stack>
        ))}
        <Link to="/premium" style={{textDecoration:"none"}}>
          <button className="button-82-pushable">
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">
              Try to Premium
          </span>
        </button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Detail;
