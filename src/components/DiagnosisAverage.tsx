import { Badge, Box, Typography } from "@mui/material";
import { ReactComponent as ArrowDown } from "../assets/ArrowDown.svg";
import { ReactComponent as ArrowUp } from "../assets/ArrowUp.svg";
import React from "react";
interface AverageProps {
  label: string;
  averageType: "high" | "low";
  average: number;
  color: string;
}
const DiagnosisAverage: React.FC<AverageProps> = ({
  label,
  averageType,
  average,
  color,
}) => {
  // const systolicAvg =
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography sx={{ fontSize: 14, fontFamily: "manrope", gap:1, display:"flex", alignItems:"center" }}>
        {" "}
        <Badge
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: `${color}`,
            },
          }}
        />
        {label}
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", fontFamily: "manrope", fontSize: 22 }}
      >
        {average}
      </Typography>

      {averageType === "high" ? (
        <>
          <ArrowUp />
          <Typography sx={{ fontFamily: "manrope", fontSize: 14 }}>
            Higher than Average
          </Typography>
        </>
      ) : (
        <>
          <ArrowDown />
          <Typography sx={{ fontFamily: "manrope", fontSize: 14 }}>
            Lower than Average
          </Typography>
        </>
      )}
    </Box>
  );
};

export default DiagnosisAverage;
