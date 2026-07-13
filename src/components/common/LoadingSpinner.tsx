import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Loading content..." }: LoadingSpinnerProps) {
  return (
    <Box
      id="loading-spinner-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 12,
        minHeight: "60vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Box
        id="loading-spinner-animation-wrapper"
        sx={{
          position: "relative",
          display: "inline-flex",
          mb: 3,
        }}
      >
        {/* Outer glowing decorative ring */}
        <Box
          sx={{
            position: "absolute",
            top: -6,
            left: -6,
            right: -6,
            bottom: -6,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "#D32F2F",
            opacity: 0.15,
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            "@keyframes pulse": {
              "0%, 100%": {
                transform: "scale(1)",
                opacity: 0.15,
              },
              "50%": {
                transform: "scale(1.1)",
                opacity: 0.3,
              },
            },
          }}
        />
        
        {/* Active circular progress indicator */}
        <CircularProgress
          id="loading-circular-indicator"
          size={50}
          thickness={4.5}
          sx={{
            color: "#D32F2F",
          }}
        />
      </Box>

      {/* Loading descriptive text */}
      <Typography
        id="loading-spinner-message"
        variant="body1"
        sx={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 500,
          color: "text.secondary",
          letterSpacing: "0.05em",
          animation: "pulse 1.8s ease-in-out infinite",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}
