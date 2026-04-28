import { Avatar, Box, Card, Typography } from "@mui/material";
import React from "react";
interface StatProps {
  label: string;
  imagePath: string;
  averageLabel: string;
  average: number;
  averageType: "high" | "low" | "normal";
  measurementType: "temperature" | "heart" | "respiratory";
  backgroundColor:string;
}
const StatCard: React.FC<StatProps> = ({
  label,
  imagePath,
  averageLabel,
  average,
  averageType,
  measurementType,
  backgroundColor
}) => {
  return (
    <Card
      sx={{ borderRadius: 12, display:"flex", flexDirection:"column",gap:2, padding: "12px", width: 228, height: 242, backgroundColor:`${backgroundColor}` }}
    >
        <Avatar src={imagePath} sx={{width:"96px", height:"96px"}}/>
        <Box>
        <Typography sx={{fontSize:16}}>{label}</Typography>
        <Typography sx={{fontWeight:800}}>{average} {measurementType === "temperature"? <span>F&deg;</span>:"bpm"}</Typography>
        </Box>
        <Typography>{averageLabel}</Typography>
    </Card>
  );
};
export default StatCard;
