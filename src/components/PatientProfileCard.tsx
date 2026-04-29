import React from "react";
import {
  Avatar,
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import GenderIcon from "../assets/FemaleIcon.png";
import PhoneIcon from "../assets/PhoneIcon.png";
import InsuranceIcon from "../assets/InsuranceIcon.png";
import { ReactComponent as CalendarIcon } from "../assets/calendar.svg";
import { Patient } from "../types/patient";

interface ProfileCardProps {
  profile: any;
}
const PatientProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <>
      {profile && (
        <Card
          key={profile.name}
          sx={{
            minWidth: 367,
            maxHeight: 740,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={profile.name}
            src={profile.profile_picture}
            sx={{ width: 100, height: 100 }}
            // srcSet={}
          />

          <Typography sx={{ fontWeight: "800", fontSize: 24 }}>
            {profile.name}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText
                primary="Date of Birth"
                secondary={profile.date_of_birth}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={GenderIcon} />
              </ListItemIcon>
              <ListItemText primary="Gender" secondary={profile.gender} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={PhoneIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Contact Info"
                secondary={profile.phone_number}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={InsuranceIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Insurance Provider"
                secondary={profile.insurance_type}
              />
            </ListItem>
          </List>
        </Card>
      )}
    </>
  );
};
export default PatientProfileCard;
