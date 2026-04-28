import React, { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import {Container, Grid} from "@mui/material";
import { getPatients } from "./api/getPatient";
import PatientProfileCard from "./components/PatientProfileCard";
import DiagnosisCard from "./components/DiagnosisCard";
import PatientsList from "./components/PatientsList";

function App() {
  const [patients, setPatients] = useState<any>([]);
  const [allPatients,setAllPatients] = useState<any>([])
  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
        const data = await getPatients();
        setAllPatients(data)
        setPatients(data?.filter((patient:any)=>patient.name === "Jessica Taylor"));

    };
    fetchData();
    return ()=> controller.abort()
  }, []);

  return (
    <Container
    maxWidth="xl"
      
      sx={{ display: "flex", background:"#F6F7F8", flexDirection: "column", gap: 4 }}
    >
      <NavBar />
      <Grid
        direction="row"
        container
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid size="grow">
          <PatientsList patients={allPatients}/>
        </Grid>
        <Grid size="grow">
          <DiagnosisCard data={patients} />
        </Grid>
        <Grid size="auto">
        <PatientProfileCard profile={patients} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
