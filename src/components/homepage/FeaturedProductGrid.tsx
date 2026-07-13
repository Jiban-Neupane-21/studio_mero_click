/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard";
import type { Product } from "../../types/featureProduct.type";
import { productsApi } from "../../api/products";

export default function FeaturedProducts() {
  const navigate = useNavigate();

  const handleViewDetails = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const featured = products.filter((p) => p.is_featured);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 6 },
        mb: { xs: 6, md: 8 },
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: { xs: 26, md: 32 },
          mb: 3,
          color: "text.primary",
        }}
      >
        Featured Products
      </Typography>

      <Grid
        container
        spacing={2.5}
        sx={{
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "center",
            lg: "flex-start",
          }
        }}
      >
        {featured.map((product) => (
          <Grid
            key={product.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
              xl: 2.4,
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProductCard product={product} onViewDetails={handleViewDetails} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
