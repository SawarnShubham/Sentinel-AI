import {
  Box,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";

const Topbar = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        padding: 3,
        borderBottom:
          "1px solid rgba(255,255,255,0.06)",
        background:
          "rgba(15,23,42,0.7)",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight="700"
          color="white"
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "#94a3b8",
          }}
        >
          Real-time cyber threat intelligence
        </Typography>
      </Box>

      <Box
        display="flex"
        gap={2}
        alignItems="center"
      >
        <Chip
          label="LIVE"
          sx={{
            background: "#16a34a",
            color: "white",
            fontWeight: 700,
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