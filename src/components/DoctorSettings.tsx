import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DoctorImg from "../assets/DoctorPicture.png";
import { MoreVert, Settings } from "@mui/icons-material";

const DoctorSettings = () => {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Avatar src={DoctorImg} />
        </ListItemIcon>
        <ListItemText
          slotProps={{
            primary: {
              sx: {
                color: "#072635",
                fontSize: "14px",
                fontWeight: "bold",
              },
            },
          }}
          sx={{ color: "black" }}
          primary="Dr. Jose Simmons"
          secondary="General Practitioner"
        />
        <ListItemIcon sx={{justifyContent:"center"}}>
            <Settings/>
        </ListItemIcon>
        <ListItemIcon sx={{justifyContent:"center"}}>
            <MoreVert/>
        </ListItemIcon>
      </ListItem>
    </List>
  );
};

export default DoctorSettings;
