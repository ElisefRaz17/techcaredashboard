import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";



const DiagnosticList = ({ data }:any) => {
  const transformData = (rawData: any): any[] => {
    return (rawData ?? [])
      .diagnosis_history
      ?.map((item:any) => ({
        name: item.name,
        description: item.description,
        status: item.status,
      }));
  };
  const processedData = transformData(data);
  console.log('Processed Diagnostic',processedData)
  console.log('Unprocessed Diagnostic',data)
  return (
    <Card
      sx={{
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        width: "100%",
        maxHeight:320
      }}
    >
      <Typography sx={{ fontWeight: "800", fontSize: 24 }}>
        Diagnostic List
      </Typography>
      <TableContainer >
      <Table sx={{ "& .MuiTableCell-root": { borderBottom: "none", display:"block", width:"100%" } }}>
        <TableHead sx={{ display: 'block', width: '100%' }}>
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
              display:"flex",
              width:"100%"
            }}
          >
            <TableCell sx={{ fontWeight:"bold", flex:1}}>Problem/Diagnosis</TableCell>
            <TableCell sx={{fontWeight:"bold", flex:1}}>Description</TableCell>
            <TableCell sx={{fontWeight:"bold", flex:1}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody           sx={{
            display: 'block',
            maxHeight: '178px', // Set your desired scroll height
            overflowY: 'auto'
          }}>
          {data?.diagnostic_list?.map((row:any) => (
            <TableRow key={row.name} sx={{ display:"flex", width:"100%"}}>
              <TableCell  sx={{flex:1}}>{row.name}</TableCell>
              <TableCell sx={{flex:1}}>{row.description}</TableCell>
              <TableCell sx={{flex:1}}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Card>
  );
};

export default DiagnosticList;
