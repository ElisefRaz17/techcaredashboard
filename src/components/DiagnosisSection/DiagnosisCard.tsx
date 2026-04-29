import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";

import "chartjs-adapter-date-fns";

import { Box, SelectChangeEvent, Typography } from "@mui/material";
import Dropdown from "../Dropdown";
import DiagnosisAverage from "./DiagnosisAverage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
);

export type DiagnosisDataItem = {
  date: Date;
  label: string;
  systolic: number;
  diastolic: number;
  respiratory_rate: number;
  temperature: number;
  heart_rate: number;
};

const DiagnosisCard = ({ data, filterMonths, setFilterMonths }: any) => {
  const filteredData = useMemo(() => {
    if (filterMonths === "all") return data;

    // 1. Get the latest date from the data as reference
    const latestDate = new Date(
      Math.max(
        ...data.map((d: { date: string | number | Date }) =>
          new Date(d.date).getTime(),
        ),
      ),
    );

    // 2. Calculate the start date (3 or 6 months prior)
    const startDate = new Date(latestDate);
    startDate.setMonth(startDate.getMonth() - Number(filterMonths));

    // 3. Filter data points
    return data.filter((item: any) => new Date(item.date) >= startDate);
  }, [filterMonths, data]);

  const handleFilterChange = (event: SelectChangeEvent<string | number>) => {
    const rawValue = event.target.value;
    const nextValue = rawValue === "all" ? "all" : Number(rawValue);
    setFilterMonths(nextValue);
  };

  const systolicAvg =
    filteredData?.length > 0
      ? filteredData.reduce(
          (sum: any, d: { systolic: any }) => sum + d.systolic,
          0,
        ) / filteredData.length
      : 0;

  const systolicOverallAvg =
    data?.length > 0
      ? data.reduce((sum: any, d: { systolic: any }) => sum + d.systolic, 0) /
        data.length
      : 0;

  const diastolicAvg =
    filteredData?.length > 0
      ? filteredData.reduce(
          (sum: any, d: { diastolic: any }) => sum + d.diastolic,
          0,
        ) / filteredData.length
      : 0;

  const diastolicOverallAvg =
    data?.length > 0
      ? data.reduce((sum: any, d: { diastolic: any }) => sum + d.diastolic, 0) /
        data.length
      : 0;
  const chartData: ChartData<"line", { x: Date; y: number }[]> = {
    datasets: [
      {
        label: "Systolic",
        // data: processedData.map((d) => ({ x: d.date, y: d.systolic })),
        data: filteredData?.map((d: { date: any; systolic: any }) => ({
          x: d.date,
          y: d.systolic,
        })),
        borderColor: "#E66FD2",
        backgroundColor: "#C26EB4",
        borderWidth: 2,
        tension: 0.1,
      },
      {
        label: "Diastolic",
        // data: processedData.map((d) => ({ x: d.date, y: d.diastolic })),
        data: filteredData?.map((d: { date: any; diastolic: any }) => ({
          x: d.date,
          y: d.diastolic,
        })),
        borderColor: "#8C6FE6",
        borderWidth: 2,
        backgroundColor: "#7E6CAB",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          tooltipFormat: "MMM yyyy",
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
        },
      },
    },
  };

  return (
    <Box
      style={{
        background: "#F4F0FE",
        padding: 16,
        borderRadius: 12,
        position: "relative",
        justifySelf: "flex-end",
        minHeight: 298,
        display: "flex",
        flexDirection: "row",
        gap: 8,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            sx={{ fontFamily: "manrope", fontWeight: "bold", fontSize: 18 }}
          >
            Blood Pressure
          </Typography>
          <Dropdown
            value={filterMonths}
            onChange={handleFilterChange}
            options={[
              { value: 3, label: "3 Months" },
              { value: 6, label: "6 Months" },
              { value: "all", label: "All Time" },
            ]}
            label={""}
            fullWidth={false}
          />
        </Box>
        <Box sx={{ height: 187, width: 417 }}>
          <Line options={options} data={chartData} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <DiagnosisAverage
          label={"Systolic"}
          averageType={
            Math.round(systolicAvg) > Math.round(systolicOverallAvg)
              ? "high"
              : "low"
          }
          average={Math.round(systolicAvg)}
          color={"#E66FD2"}
        />

        <DiagnosisAverage
          label={"Diastolic"}
          averageType={
            Math.round(diastolicAvg) > Math.round(diastolicOverallAvg)
              ? "high"
              : "low"
          }
          average={Math.round(diastolicAvg)}
          color={"#8C6FE6"}
        />
      </Box>
    </Box>
  );
};

export default DiagnosisCard;
