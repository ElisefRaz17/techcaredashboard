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
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
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

interface BloodPressureData {
  date: Date;
  label: string;
  systolic: number;
  diastolic: number;
}

type DiagnosisHistoryItem = {
  month: string;
  year: number | string;
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

const DiagnosisCard = ({ data = [] }: Props) => {
  const [filterMonths, setFilterMonths] = useState<number | "all">("all");
  const transformData = (rawData: Props["data"]): BloodPressureData[] => {
    return (rawData ?? [])
      .flatMap((patient) => patient.diagnosis_history ?? [])
      .map((item) => ({
        date: new Date(`${item.month} 1, ${item.year}`),
        label: `${item.month} ${item.year}`,
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
    startDate.setMonth(startDate.getMonth() - filterMonths);

    // 3. Filter data points
    return processedData.filter((item) => new Date(item.date) >= startDate);
  }, [filterMonths, processedData]);

  const handleFilterChange = (event: SelectChangeEvent<string | number>) => {
    const rawValue = event.target.value;
    const nextValue = rawValue === "all" ? "all" : Number(rawValue);
    setFilterMonths(nextValue);
  };

  const systolicAvg =
    filteredData.length > 0
      ? filteredData.reduce((sum, d) => sum + d.systolic, 0) /
        filteredData.length
      : 0;

    const systolicOverallAvg =
    processedData.length > 0
      ? processedData.reduce((sum, d) => sum + d.systolic, 0) /
        processedData.length
      : 0;

  const diastolicAvg =
    filteredData.length > 0
      ? filteredData.reduce((sum, d) => sum + d.diastolic, 0) /
        filteredData.length
      : 0;

        const diastolicOverallAvg =
    processedData.length > 0
      ? processedData.reduce((sum, d) => sum + d.diastolic, 0) /
        processedData.length
      : 0;
  const chartData: ChartData<"line", { x: Date; y: number }[]> = {
    datasets: [
      {
        label: "Systolic",
        // data: processedData.map((d) => ({ x: d.date, y: d.systolic })),
        data: filteredData.map((d) => ({ x: d.date, y: d.systolic })),
        borderColor: "#E66FD2",
        backgroundColor: "#C26EB4",
        borderWidth: 2,
        tension: 0.1,
      },
      {
        label: "Diastolic",
        // data: processedData.map((d) => ({ x: d.date, y: d.diastolic })),
        data: filteredData.map((d) => ({ x: d.date, y: d.diastolic })),
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
        minWidth: "417px",
        justifySelf: "flex-end",
        minHeight: 298,
        display:"flex",
        flexDirection:"row",
        gap:8,
        width:661
      }}
    >
      <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
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
          averageType={Math.round(systolicAvg) > Math.round(systolicOverallAvg) ? "high":"low"}
          average={Math.round(systolicAvg)}
          color={"#E66FD2"}
        />
 
                <DiagnosisAverage
          label={"Diastolic"}
          averageType={Math.round(diastolicAvg) > Math.round(diastolicOverallAvg) ? "high":"low"}
          average={Math.round(diastolicAvg)}
          color={"#8C6FE6"}
        />
      </Box>
    </Box>
  );
};

export default DiagnosisCard;
