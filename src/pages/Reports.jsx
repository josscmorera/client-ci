import { Box } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
//import ReportItem from "../components/report/ReportItem";
import { getReports } from "../redux/thunks/report";
import LayoutPage from "../components/base/LayoutPage";
import ReportItem from "../components/report/ReportItem";

export default function Reports() {
  const reports = useSelector((state) => state.report.reports);
  const loading = useSelector((state) => state.report.loading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getReports());
  }, []);

  console.log(reports);

  return (
    <LayoutPage title={"Admin Reports"} loading={loading}>
      {reports.map((report) => (
        <Box key={report._id} width="100%" maxWidth={800} margin="0 auto" p={1}>
          <ReportItem {...report} />
        </Box>
      ))}
    </LayoutPage>
  );
}
