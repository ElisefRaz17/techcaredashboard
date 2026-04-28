import { Avatar, Card, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Patient } from "../types/patient";
interface PatientsProps {
  patients: any[];
}
const PatientsList: React.FC<PatientsProps> = ({ patients }) => {
  return (
    <Card sx={{width:367,maxHeight:500, overflowY:'auto'}}>
      <List>
        {patients.map((patient) => (
          <ListItem key={patient.name}>
            <Avatar alt={patient.name} src={patient.profile_picture} />
            <ListItemText
            primary={patient.name}
            secondary={`${patient.gender} ${patient.age}`}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default PatientsList;
