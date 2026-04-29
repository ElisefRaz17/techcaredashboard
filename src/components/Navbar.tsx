import { ReactComponent as Logo } from "../assets/TestLogo.svg";
import { ReactComponent as Calendar } from "../assets/calendar.svg";
import { ReactComponent as ChatBubble } from "../assets/chatBubble.svg";
import { ReactComponent as CreditCard } from "../assets/creditCard.svg";
import { ReactComponent as Group } from "../assets/groupPeople.svg";
import { ReactComponent as Home } from "../assets/home.svg";

import {
  AppBar,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import DoctorSettings from "./DoctorSettings";
const NavLinks = ({ links }: any) => {
  return (
    <List component={Stack} direction="row" spacing={1} sx={{ p: 0 }}>
      {links.map((link: any) => (
        <ListItem key={link} disablePadding sx={{ width: "auto", "&:hover":{
          cursor:"pointer"
        } }}>
          <Link
            underline="none"
            sx={{
              display: "flex",
              borderRadius: "41px",
              height: "41px",
              padding:1,
              alignItems: "center",
              "&:hover": {
                background: "#01F0D0",
              },
            }}
          >
            <ListItemIcon sx={{ justifyContent: "center" }}>
              {link.icon}
            </ListItemIcon>
            <ListItemText
              primary={link.name}
              sx={{ fontSize: 14, fontWeight: "bold", color: "#072635" }}
            />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
const NavBar = () => {
  const links = [
    {
      name: "Overview",
      icon: <Home />,
    },
    {
      name: "Patients",
      icon: <Group />,
    },
    {
      name: "Schedule",
      icon: <Calendar />,
    },
    { name: "Message", icon: <ChatBubble /> },
    { name: "Transactions", icon: <CreditCard /> },
  ];
  return (
    <AppBar
      sx={{
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        borderRadius: 70,
        height: 72,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "32px",
        position: "relative",
      }}
    >
      <Logo />
      <NavLinks links={links} />
      <DoctorSettings/>
    </AppBar>
  );
};

export default NavBar;
