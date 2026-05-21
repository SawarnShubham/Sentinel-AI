import { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import AppShell from "../components/AppShell";
import StatsGrid from "../components/StatsGrid";
import { getSecurityStats } from "../api/securityApi";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSecurityStats(token);
        setStats(data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  if (!stats) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#020617",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AppShell title="Security Dashboard">
      <StatsGrid stats={stats} />
    </AppShell>
  );
};

export default Dashboard;