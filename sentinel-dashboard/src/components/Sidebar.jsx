import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShieldIcon from "@mui/icons-material/Shield";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import BlockIcon from "@mui/icons-material/Block";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LogoutIcon from "@mui/icons-material/Logout";

const menuItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Threat Events",
    icon: <ShieldIcon />,
  },
  {
    label: "AI Anomalies",
    icon: <WarningAmberIcon />,
  },
  {
    label: "Blocked Requests",
    icon: <BlockIcon />,
  },
  {
    label: "Analytics",
    icon: <AnalyticsIcon />,
  },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
        borderRight:
          "1px solid rgba(255,255,255,0.08)",
        padding: 3,
        backdropFilter: "blur(20px)",
      }}
    >
      <Box mb={5}>
        <Typography
          variant="h4"
          fontWeight="800"
          sx={{
            color: "#38bdf8",
            letterSpacing: 1,
          }}
        >
          Sentinel AI
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#94a3b8",
            mt: 1,
          }}
        >
          Security Operations Console
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            sx={{
              borderRadius: 3,
              mb: 1.2,
              paddingY: 1.5,
              color: "#e2e8f0",
              "&:hover": {
                background:
                  "rgba(56,189,248,0.12)",
                transform:
                  "translateX(4px)",
              },
              transition: "all 0.25s ease",
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

      <Divider
        sx={{
          my: 4,
          borderColor:
            "rgba(255,255,255,0.08)",
        }}
      />

      <ListItemButton
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
  );
};

export default Sidebar;