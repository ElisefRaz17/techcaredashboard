import { useMemo, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import DiagnosisCard from "./DiagnosisCard";
import StatCard from "./StatCard";
import TemperatureIcon from "../../assets/temperature.svg";
import RespiratoryIcon from "../../assets/respiratory rate.svg";
import HeartIcon from "../../assets/HeartBPM.svg";

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

// type Props = {
//   diagnosis_history?:DiagnosisHistoryItem[];
//   // data?: Array<{
//   //   diagnosis_history?: DiagnosisHistoryItem[];
//   // }>;
// };
const DiagnosisHistory = ({ data }: any) => {
  console.log("Diagnosis Data", data);
  const [filterMonths, setFilterMonths] = useState<string | number | "all">(
    "all",
  );

  const transformData = (rawData: any): BloodPressureData[] => {
    // const transformData = (rawData:any): any[] => {

    return (rawData ?? []).diagnosis_history
      ?.map((item: any) => ({
        date: new Date(`${item.month} 1, ${item.year}`),
        label: `${item.month} ${item.year}`,
        respiratory_rate: item.respiratory_rate.value,
        temperature: item.temperature.value,
        heart_rate: item.heart_rate.value,
        systolic: item.blood_pressure.systolic.value,
        diastolic: item.blood_pressure.diastolic.value,
      }))
      .sort((a: any, b: any) => a.date.getTime() - b.date.getTime());
  };
  const processedData = transformData(data);

  const filteredData = useMemo(() => {
    if (filterMonths === "all") return processedData;

    // 1. Get the latest date from the data as reference
    const latestDate = new Date(
      Math.max(...processedData.map((d: any) => new Date(d.date).getTime())),
    );

    // 2. Calculate the start date (3 or 6 months prior)
    const startDate = new Date(latestDate);
    startDate.setMonth(startDate.getMonth() - Number(filterMonths));

    // 3. Filter data points
    return processedData.filter(
      (item: any) => new Date(item.date) >= startDate,
    );
  }, [filterMonths, processedData]);
  // console.log('Filtered Data', filteredData)
  const avgRespiratory =
    filteredData?.length > 0
      ? filteredData.reduce((sum, d) => sum + (d?.respiratory_rate ?? 0), 0) /
        filteredData.length
      : 0;
  const overallTempAvg =
    processedData?.length > 0
      ? processedData.reduce((sum, d) => sum + (d?.temperature ?? 0), 0) /
        processedData.length
      : 0;
  const overallHeartAvg =
    processedData?.length > 0
      ? processedData.reduce((sum, d) => sum + (d?.heart_rate ?? 0), 0) /
        processedData.length
      : 0;
  const overallRespAvg =
    processedData?.length > 0
      ? processedData.reduce((sum, d) => sum + (d?.respiratory_rate ?? 0), 0) /
        processedData.length
      : 0;
  const avgTemperature =
    filteredData?.length > 0
      ? filteredData.reduce((sum, d) => sum + (d?.temperature ?? 0), 0) /
        filteredData.length
      : 0;
  const avgHeartRate =
    filteredData?.length > 0
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
        padding: 2,
      }}
    >
      <Typography sx={{ fontWeight: "800", fontSize: 24 }}>
        Diagnosis History
      </Typography>
      <DiagnosisCard
        data={processedData}
        filterMonths={filterMonths}
        setFilterMonths={setFilterMonths}
      />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <StatCard
          label={"Respiratory Rate"}
          imagePath={RespiratoryIcon}
          // averageLabel={""}
          // average={0}
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
          //           averageLabel={""}
          // average={0}
          averageType={"normal"}
          measurementType={"temperature"}
          backgroundColor={"#FFE6E9"}
        />
        <StatCard
          label={"Heart Rate"}
          imagePath={HeartIcon}
          // averageLabel=""
          averageLabel={heartRateLabel}
          average={Math.round(avgHeartRate)}
          // average={0}
          averageType={"normal"}
          measurementType="heart"
          backgroundColor={"#FFE6F1"}
        />
      </Box>
    </Card>
  );
};
export default DiagnosisHistory;
