import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import { getSecurityStats } from "../api/securityApi";
import { useAuth } from "../context/AuthContext";

import ShieldIcon from "@mui/icons-material/Shield";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GppBadIcon from "@mui/icons-material/GppBad";
import PsychologyIcon from "@mui/icons-material/Psychology";

const Dashboard = () => {
  const { token } = useAuth();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data =
          await getSecurityStats(token);

        setStats(data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [token]);

  if (!stats) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #020617, #0f172a)",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617, #0f172a, #111827)",
      }}
    >
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Topbar />

        <Box sx={{ p: 4 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid item>
              <StatCard
                title="Total Requests"
                value={
                  stats.totalRequests
                }
                icon={<ShieldIcon />}
                accent="#38bdf8"
              />
            </Grid>

            <Grid item>
              <StatCard
                title="Allowed Requests"
                value={
                  stats.allowedRequests
                }
                icon={
                  <CheckCircleIcon />
                }
                accent="#22c55e"
              />
            </Grid>

            <Grid item>
              <StatCard
                title="Blocked Requests"
                value={
                  stats.blockedRequests
                }
                icon={<BlockIcon />}
                accent="#ef4444"
              />
            </Grid>

            <Grid item>
              <StatCard
                title="AI Blocked"
                value={stats.aiBlocked}
                icon={<SmartToyIcon />}
                accent="#a855f7"
              />
            </Grid>

            <Grid item>
              <StatCard
                title="Risk Blocked"
                value={
                  stats.riskBlocked
                }
                icon={
                  <WarningAmberIcon />
                }
                accent="#f59e0b"
              />
            </Grid>

            <Grid item>
              <StatCard
                title="Brute Force"
                value={
                  stats.bruteForceBlocked
                }
                icon={<GppBadIcon />}
                accent="#f43f5e"
              />
            </Grid>

            <Grid item>
              <StatCard
                title="Suspicious Events"
                value={
                  stats.suspiciousEvents
                }
                icon={
                  <PsychologyIcon />
                }
                accent="#8b5cf6"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;