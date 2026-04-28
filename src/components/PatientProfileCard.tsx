import React from "react";
import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import GenderIcon from "../assets/FemaleIcon.png";
import PhoneIcon from "../assets/PhoneIcon.png";
import InsuranceIcon from "../assets/InsuranceIcon.png";
import { ReactComponent as CalendarIcon } from "../assets/calendar.svg";
import { Patient } from "../types/patient";



interface ProfileCardProps {
  profile: Patient[];
}
const PatientProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {

  return (
    <>
      {profile?.map((item) => (
        <Card
          key={item.name}
          sx={{
            minWidth: 367,
            maxHeight:740,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={item.name}
            src={item.profile_picture}
            sx={{ width: 200, height: 200 }}
          />
          <List>
            <ListItem>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText
                primary="Date of Birth"
                secondary={item.date_of_birth}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={GenderIcon} />
              </ListItemIcon>
              <ListItemText primary="Gender" secondary={item.gender} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={PhoneIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Contact Info"
                secondary={item.phone_number}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={InsuranceIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Insurance Provider"
                secondary={item.insurance_type}
              />
            </ListItem>
          </List>
        </Card>
      ))}
    </>
  );
};
export default PatientProfileCard;
