import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
interface DiagnosticItem {
  name: string;
  description: string;
  status: string;
}
type Props = {
  data?: Array<{
    diagnostic_list?: DiagnosticItem[];
  }>;
};

const DiagnosticList = ({ data = [] }: Props) => {
  const transformData = (rawData: Props["data"]): DiagnosticItem[] => {
    return (rawData ?? [])
      .flatMap((patient) => patient.diagnostic_list ?? [])
      .map((item) => ({
        name: item.name,
        description: item.description,
        status: item.status,
      }));
  };
  const processedData = transformData(data);
  return (
    <Card
      sx={{
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        width: "100%",
      }}
    >
      <Typography sx={{ fontWeight: "800", fontSize: 24 }}>
        Diagnostic List
      </Typography>
      <Table sx={{ "& .MuiTableCell-root": { borderBottom: "none" } }}>
        <TableHead>
          <TableRow
            sx={{
              background: "#F6F7F8",
              "& th:first-of-type": {
                borderTopLeftRadius: "24px",
                borderBottomLeftRadius: "24px",
              },
              "& th:last-of-type": {
                borderTopRightRadius: "24px",
                borderBottomRightRadius: "24px",
              },
            }}
          >
            <TableCell sx={{ fontWeight:"bold"}}>Problem/Diagnosis</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Description</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processedData.map((row) => (
            <TableRow key={row.name}>
              <TableCell scope="row">{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DiagnosticList;
