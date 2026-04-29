import React from "react";
import {ReactComponent as DownloadIcon} from "../assets/download.svg"
import { Card, Typography, List, ListItem, ListItemText, Stack } from "@mui/material";

const LabResults = ({labResults}:any) => {

    return (
    <Card
      sx={{
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        padding: 2,
       minHeight:296
      }}
    >
      <Typography sx={{ fontWeight: "800", fontSize: 24 }}>
        Lab Results
      </Typography>
      <List component={Stack} direction="column" spacing={1} sx={{maxHeight:207,overflowY:"auto", width:"100%"}}>
      {labResults?.map((item:any, index:number)=>(
        <ListItem key={item || index} secondaryAction={<DownloadIcon/>}>
            <ListItemText primary={item}/>
        </ListItem>

        
      ))}
      </List>
    </Card>
  );
};
export default LabResults;
