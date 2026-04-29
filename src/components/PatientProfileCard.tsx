import React, { useState } from "react";
import {
  Avatar,
  Button,
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
import BirthIcon from "../assets/BirthIcon.png";
import AgeIcon from "../assets/AgeIcon.png";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";

interface ProfileCardProps {
  profile: any;
}
const PatientProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      {profile && (
        <Card
          key={profile.name}
          sx={{
            minWidth: 367,
            maxHeight: 740,
            padding: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius:"16px"
          }}
        >
          <Avatar
            alt={profile.name}
            src={profile.profile_picture}
            sx={{ width: 125, height: 125 }}
          />

          <Typography sx={{ fontWeight: "800", fontSize: 24 }}>
            {profile.name}
          </Typography>
          <List sx={{ alignItems: "flex-start", width: "100%" }}>
            <ListItem>
              <ListItemIcon>
                <img src={BirthIcon} alt="date-of-birth"/>
              </ListItemIcon>
              <ListItemText
                primary="Date of Birth"
                secondary={profile.date_of_birth}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={GenderIcon} alt="gender"/>
              </ListItemIcon>
              <ListItemText primary="Gender" secondary={profile.gender} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={PhoneIcon} alt="phone-number"/>
              </ListItemIcon>
              <ListItemText
                primary="Contact Info"
                secondary={profile.phone_number}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={InsuranceIcon} alt="insurance-provider" />
              </ListItemIcon>
              <ListItemText
                primary="Insurance Provider"
                secondary={profile.insurance_type}
              />
            </ListItem>
            {showMore && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        background: "#F6F7F8",
                        borderRadius: "999px",
                        padding: "1px",
                      }}
                    >
                      <img src={AgeIcon} height={24} width={24} alt="age"/>
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary="Age" secondary={profile.age} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        background: "#F6F7F8",
                        borderRadius: "999px",
                        padding: "1px",
                      }}
                    >
                      <ContactEmergencyIcon sx={{color:"#072635"}}/>
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary="Emergency Contact"
                    secondary={profile.emergency_contact}
                  />
                </ListItem>
              </>
            )}
          </List>
          <Button
            onClick={() => setShowMore(!showMore)}
            disableRipple
            size="large"
            sx={{
              borderRadius: "41px",
              background: "#05bfa6",
              textTransform: "unset",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              padding: 1,
              "&:hover": {
                color: "#072635",
                background: "#01F0D0",
              },
            }}
          >
            Show All Information
          </Button>
        </Card>
      )}
    </>
  );
};
export default PatientProfileCard;
