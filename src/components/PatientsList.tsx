import React, { useMemo, useState } from "react";
import { usePatient } from "../context/PatientContext";
import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
interface PatientsProps {
  patients: any[];
}
const PatientsList: React.FC<PatientsProps> = ({ patients }) => {
  const { setSelectedPatient } = usePatient();
  const [searchValue, setSearchValue] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchValue) return patients;
    return patients.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue,patients]);
  return (
    <Card
      sx={{
        width: 367,
        height: `calc(100dvh - 72px - 32px)`,
        minHeight: "1000px",
        overflowY: "auto",
        padding: 2,
        display:"flex",
        flexDirection:"column",
        gap:2,
        borderRadius:"16px"
      }}
    >
      <Typography sx={{ fontWeight: "800", fontSize: 24 }}>Patients</Typography>
      <TextField
        fullWidth
        variant="standard" // "standard" variant naturally disables label ripple effects
        placeholder="Search patients..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />
      <List>
        {filteredItems.map((patient) => (
          <ListItemButton
            onClick={() => setSelectedPatient(patient)}
            key={patient.name}
            sx={{
              "&:hover": {
                backgroundColor: "#D8FCF7", // Theme-based or custom color like '#f0f0f0'
              },
            }}
          >
            <ListItem>
              <Avatar alt={patient.name} src={patient.profile_picture} />
              <ListItemText
                primary={patient.name}
                secondary={`${patient.gender} ${patient.age}`}
              />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Card>
  );
};

export default PatientsList;
