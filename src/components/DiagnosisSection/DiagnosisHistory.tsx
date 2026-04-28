import { useMemo, useState } from "react";
import { Box, Card } from "@mui/material";
import DiagnosisCard from "./DiagnosisCard";
import StatCard from "./StatCard";
import TemperatureIcon from "../../assets/temperature.svg";
import RespiratoryIcon from "../../assets/respiratory rate.svg";
import HeartIcon from "../../assets/HeartBPM.svg"

interface BloodPressureData {
  date: Date;
  label: string;
  systolic: number;
  diastolic: number;
  respiratory_rate: number;
  temperature: number;
  heart_rate: number;
}

type DiagnosisHistoryItem = {
  month: string;
  year: number | string;
  heart_rate: {
    value: number;
    levels: string;
  };
  respiratory_rate: {
    value: number;
    levels: string;
  };
  temperature: {
    value: number;
    levels: string;
  };
  blood_pressure: {
    systolic: { value: number };
    diastolic: { value: number };
  };
};

type Props = {
  data?: Array<{
    diagnosis_history?: DiagnosisHistoryItem[];
  }>;
};
const DiagnosisHistory = ({ data = [] }: Props) => {
  const [filterMonths, setFilterMonths] = useState<string | number | "all">("all");

  const transformData = (rawData: Props["data"]): BloodPressureData[] => {
    return (rawData ?? [])
      .flatMap((patient) => patient.diagnosis_history ?? [])
      .map((item) => ({
        date: new Date(`${item.month} 1, ${item.year}`),
        label: `${item.month} ${item.year}`,
        respiratory_rate: item.respiratory_rate.value,
        temperature: item.temperature.value,
        heart_rate: item.heart_rate.value,
        systolic: item.blood_pressure.systolic.value,
        diastolic: item.blood_pressure.diastolic.value,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  const processedData = transformData(data);
  const filteredData = useMemo(() => {
    if (filterMonths === "all") return processedData;

    // 1. Get the latest date from the data as reference
    const latestDate = new Date(
      Math.max(...processedData.map((d) => new Date(d.date).getTime())),
    );

    // 2. Calculate the start date (3 or 6 months prior)
    const startDate = new Date(latestDate);
    startDate.setMonth(startDate.getMonth() - Number(filterMonths));

    // 3. Filter data points
    return processedData.filter((item) => new Date(item.date) >= startDate);
  }, [filterMonths, processedData]);
  const avgRespiratory =
    filteredData.length > 0
      ? filteredData.reduce((sum, d) => sum + (d?.respiratory_rate ?? 0), 0) /
        filteredData.length
      : 0;
  const overallTempAvg =
    processedData.length > 0
      ? processedData.reduce((sum, d) => sum + (d?.temperature ?? 0), 0) /
        processedData.length
      : 0;
  const overallHeartAvg =
    processedData.length > 0
      ? processedData.reduce((sum, d) => sum + (d?.heart_rate ?? 0), 0) /
        processedData.length
      : 0;
  const overallRespAvg =
    processedData.length > 0
      ? processedData.reduce((sum, d) => sum + (d?.respiratory_rate ?? 0), 0) /
        processedData.length
      : 0;
  const avgTemperature =
    filteredData.length > 0
      ? filteredData.reduce((sum, d) => sum + (d?.temperature ?? 0), 0) /
        filteredData.length
      : 0;
  const avgHeartRate =
    filteredData.length > 0
      ? filteredData.reduce((sum, d) => sum + (d?.heart_rate ?? 0), 0) /
        filteredData.length
      : 0;

  const getRespiratoryRateLabel = (): string => {
    if (overallRespAvg > avgRespiratory) {
      return "Lower than Average";
    }
    if (overallRespAvg < avgRespiratory) {
      return "Higher than Average";
    }
    return "Normal";
  };
  const getHeartRateLabel = (): string => {
    if (overallHeartAvg > avgHeartRate) {
      return "Lower than Average";
    }
    if (overallHeartAvg < avgHeartRate) {
      return "Higher than Average";
    }
    return "Normal";
  };
  const getTemperatureLabel = (): string => {
    if (overallTempAvg > avgTemperature) {
      return "Lower than Average";
    }
    if (overallTempAvg < avgTemperature) {
      return "Higher than Average";
    }
    return "Normal";
  };
  const respiratoryRateLabel = getRespiratoryRateLabel();
  const heartRateLabel = getHeartRateLabel();
  const temperatureRateLabel = getTemperatureLabel();

  return (
    <Card
      sx={{
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2
      }}
    >
      <DiagnosisCard data={processedData} filterMonths={filterMonths} setFilterMonths={setFilterMonths} />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <StatCard
          label={"Respiratory Rate"}
          imagePath={RespiratoryIcon}
          averageLabel={respiratoryRateLabel}
          average={Math.round(avgRespiratory)}
          averageType={"normal"}
          measurementType="respiratory"
          backgroundColor={"#E0F3FA"}
        />
        <StatCard
          label={"Temperature"}
          imagePath={TemperatureIcon}
          averageLabel={temperatureRateLabel}
          average={Math.ceil(avgTemperature)}
          averageType={"normal"}
          measurementType={"temperature"}
          backgroundColor={"#FFE6E9"}
        />
        <StatCard
          label={"Heart Rate"}
          imagePath={HeartIcon}
          averageLabel={heartRateLabel}
          average={Math.round(avgHeartRate)}
          averageType={"normal"}
          measurementType="heart"
          backgroundColor={"#FFE6F1"}
        />
      </Box>
    </Card>
  );
};
export default DiagnosisHistory;
