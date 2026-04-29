import React, { useState, useEffect } from "react";
import { getPatients } from "./api/getPatient";
import { usePatient } from "./context/PatientContext";
import { Container, Grid } from "@mui/material";
import NavBar from "./components/Navbar";
import PatientProfileCard from "./components/PatientProfileCard";
import PatientsList from "./components/PatientsList";
import DiagnosisHistory from "./components/DiagnosisSection/DiagnosisHistory";
import DiagnosticList from "./components/DiagnosisSection/DiagnosticList";
import LabResults from "./components/LabResults";

function App() {
  const { selectedPatient, setSelectedPatient } = usePatient();
  const [allPatients, setAllPatients] = useState<any>([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const data = await getPatients();
      setAllPatients(data);
      setSelectedPatient(
        data?.find((patient: any) => patient.name === "Jessica Taylor"),
      );
    };
    fetchData();
    return () => controller.abort();
  }, [setSelectedPatient]);


  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        background: "#F6F7F8",
        flexDirection: "column",
        gap: 4,
        padding: 2,
        width:"100%"
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
        <Grid size="grow" container spacing={1}>
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
