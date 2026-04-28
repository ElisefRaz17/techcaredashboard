import { Avatar, Card, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import React from "react";
import { Patient } from "../types/patient";
import {usePatient} from "../context/PatientContext"
interface PatientsProps {
  patients: any[];
}
const PatientsList: React.FC<PatientsProps> = ({ patients }) => {
  const {selectedPatient,setSelectedPatient} = usePatient()
console.log("Selected Patient", selectedPatient)
  return (
    <Card sx={{ width: 367, height: `calc(100dvh - 72px - 32px)`, minHeight: '1000px', overflowY: 'auto' }}>
      <List>
        {patients.map((patient) => (
          <ListItemButton
          onClick={()=>setSelectedPatient(patient)}
            key={patient.name}
            sx={{
              '&:hover': {
                backgroundColor: '#D8FCF7', // Theme-based or custom color like '#f0f0f0'
              }
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

