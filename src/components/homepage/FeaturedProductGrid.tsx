/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Skeleton } from "@mui/material";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);
        const [data] = await Promise.all([
          productsApi.getProducts(),
          new Promise((resolve) => setTimeout(resolve, 2000))
        ]);
        
        console.log("Fetched raw products from Supabase:", data);
        
        const mappedData = data.map((p: any) => ({
          ...p,
          oldPrice: p.old_price,
          newPrice: p.new_price,
          discountRate: p.discount_rate,
          isFeatured: p.is_featured
        }));
        
        console.log("Mapped products array:", mappedData);
        setProducts(mappedData);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featured = products.filter((p: any) => p.isFeatured);

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
        {loading ? (
          [...Array(5)].map((_, index) => (
            <Grid
              key={`skeleton-${index}`}
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
              <Box sx={{ width: '100%', maxWidth: { xs: 320, sm: 280 }, p: 1 }}>
                <Skeleton variant="rectangular" width="100%" height={260} sx={{ borderRadius: 2 }} animation="wave" />
                <Skeleton variant="text" sx={{ mt: 2, fontSize: '1.25rem' }} animation="wave" />
                <Skeleton variant="text" width="60%" animation="wave" />
                <Skeleton variant="rectangular" width="100%" height={42} sx={{ mt: 2, borderRadius: 1 }} animation="wave" />
              </Box>
            </Grid>
          ))
        ) : error ? (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="error">
              Error loading featured products.
            </Typography>
          </Box>
        ) : featured.length === 0 ? (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No featured products available at the moment.
            </Typography>
          </Box>
        ) : (
          featured.map((product) => (
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
          ))
        )}
      </Grid>
    </Box>
  );
}
