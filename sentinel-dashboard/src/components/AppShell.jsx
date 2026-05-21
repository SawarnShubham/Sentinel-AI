import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppShell = ({
  title,
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827)",
      }}
    >
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Topbar title={title} />

        <Box sx={{ padding: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppShell;