import React, { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { getPatients } from "./api/getPatient";
import PatientProfileCard from "./components/PatientProfileCard";
import DiagnosisCard from "./components/DiagnosisSection/DiagnosisCard";
import PatientsList from "./components/PatientsList";
import DiagnosisHistory from "./components/DiagnosisSection/DiagnosisHistory";
import DiagnosticList from "./components/DiagnosisSection/DiagnosticList";
import LabResults from "./components/LabResults";
import { ReactComponent as DownloadIcon } from "./assets/download.svg";
import { usePatient } from "./context/PatientContext";


function App() {
    const {selectedPatient} = usePatient()

  const [patients, setPatients] = useState<any>([]);
  const [allPatients, setAllPatients] = useState<any>([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const data = await getPatients();
      setAllPatients(data);
      setPatients(
        data?.filter((patient: any) => patient.name === "Jessica Taylor"),
      );
    };
    fetchData();
    return () => controller.abort();
  }, []);

  // console.log("Data", patients);
console.log('Selected Patient', selectedPatient)
  // const labResults = selectedPatient?.lab_results;

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        background: "#F6F7F8",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <NavBar />
      <Grid
        direction="row"
        container
        spacing={3.5}
        sx={{ alignItems: "flex-start" }}
      >
        <Grid size="auto">
          <PatientsList patients={allPatients} />
        </Grid>
        <Grid size="grow" container spacing={2}>
          {/* <Box></Box> */}
          <DiagnosisHistory data={selectedPatient} />
          <DiagnosticList data={selectedPatient} />
        </Grid>
        <Grid
          size="auto"
          sx={{ flexDirection: "column" }}
          container
          spacing={2}
        >
          <PatientProfileCard profile={selectedPatient} />
          <LabResults labResults={selectedPatient?.lab_results} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
