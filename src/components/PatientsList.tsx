import { Avatar, Card, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Patient } from "../types/patient";
interface PatientsProps {
  patients: any[];
}
const PatientsList: React.FC<PatientsProps> = ({ patients }) => {
let windowHeight = useWindowDimensions()
let cardHeight = windowHeight.height - 1

  return (
    <Card sx={{width:367,height: `calc(100dvh - 72px - 32px)`,minHeight:'1000px', overflowY:'auto'}}>
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

const useWindowDimensions = (): { height: number } => {
  const [dimensions, setDimensions] = React.useState({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

