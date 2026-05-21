import { Grid, Card, Typography, Box } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GppBadIcon from "@mui/icons-material/GppBad";

const statConfig = [
  {
    key: "totalRequests",
    title: "Total Requests",
    icon: <ShieldIcon />,
    color: "#38bdf8",
  },
  {
    key: "allowedRequests",
    title: "Allowed",
    icon: <CheckCircleIcon />,
    color: "#22c55e",
  },
  {
    key: "blockedRequests",
    title: "Blocked",
    icon: <BlockIcon />,
    color: "#ef4444",
  },
  {
    key: "aiBlocked",
    title: "AI Blocked",
    icon: <PsychologyIcon />,
    color: "#a855f7",
  },
  {
    key: "riskBlocked",
    title: "Risk Blocked",
    icon: <WarningAmberIcon />,
    color: "#f59e0b",
  },
  {
    key: "bruteForceBlocked",
    title: "Brute Force",
    icon: <GppBadIcon />,
    color: "#f43f5e",
  },
];

const StatsGrid = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      {statConfig.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.key}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95))",
              border:
                "1px solid rgba(255,255,255,0.06)",
              borderRadius: 5,
              padding: 3,
              color: "white",
              height: 180,
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{
                  color: "#94a3b8",
                  fontWeight: 500,
                }}
              >
                {item.title}
              </Typography>

              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  background:
                    "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                }}
              >
                {item.icon}
              </Box>
            </Box>

            <Typography
              variant="h3"
              fontWeight="800"
              mt={5}
            >
              {stats[item.key]}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsGrid;