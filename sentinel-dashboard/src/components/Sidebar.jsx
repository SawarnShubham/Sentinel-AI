import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShieldIcon from "@mui/icons-material/Shield";
import PsychologyIcon from "@mui/icons-material/Psychology";
import BlockIcon from "@mui/icons-material/Block";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const items = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    label: "Threat Events",
    icon: <ShieldIcon />,
    path: "/events",
  },
  {
    label: "AI Anomalies",
    icon: <PsychologyIcon />,
    path: "/anomalies",
  },
  {
    label: "Blocked Requests",
    icon: <BlockIcon />,
    path: "/blocked",
  },
  {
    label: "Analytics",
    icon: <AnalyticsIcon />,
    path: "/analytics",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <Box
      sx={{
        width: 280,
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617,#0f172a)",
        borderRight:
          "1px solid rgba(255,255,255,0.06)",
        padding: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "white",
          fontWeight: 800,
          mb: 1,
        }}
      >
        Sentinel AI
      </Typography>

      <Typography
        sx={{
          color: "#94a3b8",
          mb: 5,
        }}
      >
        Security Operations Center
      </Typography>

      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() =>
              navigate(item.path)
            }
            sx={{
              mb: 1.5,
              borderRadius: 3,
              background:
                location.pathname === item.path
                  ? "rgba(56,189,248,0.18)"
                  : "transparent",
              color: "white",
              paddingY: 1.5,
              "&:hover": {
                background:
                  "rgba(56,189,248,0.12)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#38bdf8",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box mt={8}>
        <ListItemButton
          onClick={() => {
            logout();
            navigate("/");
          }}
          sx={{
            borderRadius: 3,
            color: "#f87171",
          }}
        >
          <ListItemIcon
            sx={{
              color: "#f87171",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;