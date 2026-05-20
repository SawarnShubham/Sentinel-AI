import {
  Box,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";

const Topbar = () => {
  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
        background:
          "rgba(15,23,42,0.55)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight="700"
          color="white"
        >
          Security Monitoring Dashboard
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#94a3b8",
          }}
        >
          Real-time AI threat intelligence
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Chip
          label="LIVE PROTECTION"
          sx={{
            background: "#16a34a",
            color: "white",
            fontWeight: "bold",
          }}
        />

        <Avatar
          sx={{
            background: "#38bdf8",
          }}
        >
          A
        </Avatar>
      </Box>
    </Box>
  );
};

export default Topbar;