import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon,
  accent,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card
        sx={{
          minWidth: 240,
          height: 150,
          borderRadius: 5,
          background:
            "linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95))",
          border:
            "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 10px 35px rgba(0,0,0,0.35)",
          backdropFilter: "blur(20px)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 90,
            height: 90,
            background: accent,
            opacity: 0.18,
            filter: "blur(40px)",
          }}
        />

        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent:
              "space-between",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              {title}
            </Typography>

            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                background:
                  "rgba(255,255,255,0.06)",
                display: "flex",
                justifyContent:
                  "center",
                alignItems: "center",
                color: accent,
              }}
            >
              {icon}
            </Box>
          </Box>

          <Typography
            variant="h3"
            fontWeight="800"
            sx={{
              color: "white",
            }}
          >
            {value}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;