import { Box, Button, Typography } from "@mui/material";
import type { Product } from "../types/featureProduct.type";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const formatPrice = (value: number) => `Rs.${value.toLocaleString("en-IN")}`;

export default function ProductCard({
  product,
  onViewDetails,
}: ProductCardProps) {
  const { title, thumbnail, oldPrice, newPrice, discountRate } = product;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: { xs: 325, sm: 280 },
        flexShrink: 0,
        borderRadius: "12px",
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.12)"
            : "rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Discount badge */}
      {discountRate > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 0,
            bgcolor: "#E50914",
            color: "#fff",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.5,
            px: 1.25,
            py: 0.5,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            zIndex: 1,
          }}
        >
          {discountRate}% OFF
        </Box>
      )}

      {/* Image */}
      <Box
        component="img"
        src={thumbnail}
        alt={title}
        sx={{
          width: "100%",
          height: 220,
          objectFit: "cover",
          display: "block",
          bgcolor: "#111",
        }}
      />

      {/* Content */}
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 1.3,
            mb: 1.25,
            minHeight: 42,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1.5 }}>
          <Typography
            sx={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 700,
              fontSize: 18,
              color: "#E50914",
            }}
          >
            {formatPrice(newPrice)}
          </Typography>
          {oldPrice > newPrice && (
            <Typography
              sx={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                color: "text.secondary",
                textDecoration: "line-through",
              }}
            >
              {formatPrice(oldPrice)}
            </Typography>
          )}
        </Box>

        <Button
          fullWidth
          onClick={() => onViewDetails?.(product)}
          sx={{
            bgcolor: "#E50914",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            py: 1,
            "&:hover": {
              bgcolor: "#b8070f",
            },
          }}
        >
          View More Details
        </Button>
      </Box>
    </Box>
  );
}
