import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import { useData } from "../../context/DataContext";

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

export default function DataPreloader({ children }: { children: React.ReactNode }) {
  const { loading } = useData();

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          zIndex: 9999,
          gap: 2,
        }}
      >
        <Box
          component="img"
          src="/Logo.png"
          alt="Studio Mero Click"
          sx={{
            width: 120,
            height: "auto",
            animation: `${pulseAnimation} 2s infinite ease-in-out`,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            color: "text.primary",
            animation: `${pulseAnimation} 2s infinite ease-in-out`,
            letterSpacing: 1,
          }}
        >
          Studio Mero Click
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
