/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress
} from "@mui/material";
import { productsApi } from "../api/products";
import { ArrowLeft, ChevronDown, Tag, CheckCircle, Calendar } from "lucide-react";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeImage, setActiveImage] = useState<string>("");
  const [randomProducts, setRandomProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        if (!id) return;

        const [data, allProductsData] = await Promise.all([
          productsApi.getProductById(id),
          productsApi.getProducts()
        ]);

        const mappedProduct = {
          ...data,
          oldPrice: data.old_price,
          newPrice: data.new_price,
          discountRate: data.discount_rate,
          isFeatured: data.is_featured,
          isAvailable: data.is_available,
          images: data.product_images?.map((img: any) => ({ url: img.image_url || img.url, alt: img.alt_text || img.alt })) || [],
          additionalInfo: data.product_specifications?.map((s: any) => ({ key: s.spec_key || s.key_name, value: s.spec_value || s.value_text })) || [],
          features: data.product_features || [],
          faq: data.product_faqs || [],
        };

        setProduct(mappedProduct);
        setActiveImage(mappedProduct.thumbnail || "");

        const allMapped = allProductsData.map((p: any) => ({
          ...p,
          oldPrice: p.old_price,
          newPrice: p.new_price,
          discountRate: p.discount_rate
        }));

        const otherProducts = allMapped.filter((p: any) => p.id !== data.id);
        const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 3));
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="error" />
      </Container>
    );
  }

  if (error || !product) {
    return <Navigate to="/404" replace />;
  }

  const formatPrice = (value: number) => `Rs. ${Number(value).toLocaleString("en-IN")}`;

  // Dedicated Theme Constants for the Red & White Palette
  const RED_PRIMARY = "#D32F2F"; // Rich Red
  const RED_LIGHT = "#FFEBEE"; // Soft Red background accent
  const WHITE = "#FFFFFF";

  return (
    <Container id="product-details-container" maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Back Navigation */}
      <Button
        id="product-back-btn"
        component={RouterLink}
        to="/"
        startIcon={<ArrowLeft size={16} />}
        sx={{
          mb: 3,
          color: RED_PRIMARY,
          "&:hover": { backgroundColor: RED_LIGHT },
        }}
      >
        Back to Home
      </Button>

      {/* Main Hero Card */}
      <Paper
        id="product-hero-card"
        elevation={3}
        sx={{
          overflow: "hidden",
          mb: 4,
          backgroundColor: WHITE,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <Grid container>
          {/* Left Column: Visuals/Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              id="product-gallery-box"
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: WHITE,
              }}
            >
              {/* Main Image Display */}
              <Box
                id="product-main-image"
                component="img"
                src={activeImage || product.thumbnail}
                alt={product.title}
                sx={{
                  width: "100%",
                  height: { xs: 300, sm: 400, md: 450 },
                  objectFit: "cover",
                  borderRadius: 1.5,
                  backgroundColor: "grey.50",
                  border: "1px solid",
                  borderColor: "grey.100",
                }}
              />

              {/* Multiple Images Thumbnails strip */}
              {product.images && product.images.length > 0 && (
                <Box
                  id="product-thumbnails-strip"
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    overflowX: "auto",
                    pb: 1,
                    "&::-webkit-scrollbar": { height: 6 },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(211, 47, 47, 0.2)",
                      borderRadius: 4,
                    },
                  }}
                >
                  {product.images.map((img) => (
                    <Box
                      key={img.id}
                      component="img"
                      src={img.url}
                      alt={img.alt || product.title}
                      onClick={() => setActiveImage(img.url)}
                      sx={{
                        width: 70,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 1,
                        cursor: "pointer",
                        border: "2px solid",
                        borderColor:
                          activeImage === img.url ? RED_PRIMARY : "transparent",
                        transition: "all 0.2s ease",
                        "&:hover": { opacity: 0.8 },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right Column: Key Details */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column" }}>

            <Box
              id="product-details-content-box"
              sx={{
                p: { xs: 3, md: 4 },
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                backgroundColor: WHITE,
              }}
            >
              {/* Availability & Featured Tags */}
              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                {product.isAvailable === false ? (
                  <Chip
                    label="Unavailable"
                    color="error"
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    label="Available"
                    sx={{
                      backgroundColor: RED_PRIMARY,
                      color: WHITE,
                      fontWeight: "bold",
                    }}
                    size="small"
                  />
                )}
                {product.isFeatured && (
                  <Chip
                    label="Featured Offer"
                    sx={{
                      backgroundColor: RED_LIGHT,
                      color: RED_PRIMARY,
                      fontWeight: "600",
                    }}
                    size="small"
                  />
                )}
              </Box>

              {/* Title */}
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: "grey.900",
                }}
              >
                {product.title}
              </Typography>

              {/* About short summary */}
              <Typography
                variant="subtitle1"
                fontWeight="600"
                color="text.primary"
                sx={{ mb: 1.5 }}
              >
                {product.about}
              </Typography>

              {/* Detailed Long Description */}
              <Typography
                variant="body1"
                color="text.secondary"
                component="p"
                sx={{ lineHeight: 1.7, mb: 3 }}
              >
                {product.description}
              </Typography>

              {/* Pricing Blocks */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 700,
                    color: RED_PRIMARY,
                  }}
                >
                  {formatPrice(product.newPrice)}
                </Typography>

                {product.oldPrice > product.newPrice && (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "text.disabled",
                        textDecoration: "line-through",
                      }}
                    >
                      {formatPrice(product.oldPrice)}
                    </Typography>

                    {/* Discount rate badge */}
                    <Chip
                      label={`${product.discountRate}% OFF`}
                      sx={{
                        backgroundColor: RED_LIGHT,
                        color: RED_PRIMARY,
                        fontWeight: "bold",
                      }}
                      size="small"
                    />
                  </>
                )}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ mt: "auto", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                <Button
                  id="product-book-session-btn"
                  component={RouterLink}
                  to={`/book?service=${encodeURIComponent(product.title)}`}
                  variant="contained"
                  size="large"
                  startIcon={<Calendar size={18} />}
                  disabled={product.isAvailable === false}
                  fullWidth
                  sx={{
                    py: 1.5,
                    backgroundColor: RED_PRIMARY,
                    color: WHITE,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#B71C1C", // Darker Red for hover state
                    },
                  }}
                >
                  Book Package Now
                </Button>

                <Button
                  id="product-claim-offer-btn"
                  component={RouterLink}
                  to={`/claim-offer?offerId=${product.id}`}
                  variant="outlined"
                  size="large"
                  startIcon={<Tag size={18} />}
                  disabled={product.isAvailable === false}
                  fullWidth
                  sx={{
                    py: 1.5,
                    color: RED_PRIMARY,
                    borderColor: RED_PRIMARY,
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: "#B71C1C",
                      backgroundColor: RED_LIGHT,
                    },
                  }}
                >
                  Claim Offer
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Secondary Information Layout Stack */}
      <Grid container spacing={4}>
        {/* Features Checklist */}
        {product.features && product.features.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, mb: 3 }}
            >
              What's Included
            </Typography>
            {product.features.map((feature) => (
              <Box
                key={feature.id}
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2.5,
                  alignItems: "flex-start",
                }}
              >
                <CheckCircle
                  size={20}
                  color={RED_PRIMARY}
                  style={{ marginTop: 2, flexShrink: 0 }}
                />
                <Box>
                  <Typography fontWeight="semibold">{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        )}

        {/* Technical Specifications */}
        {product.additionalInfo && product.additionalInfo.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, mb: 3 }}
            >
              Specifications & Details
            </Typography>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ backgroundColor: WHITE }}
            >
              <Table size="small">
                <TableBody>
                  {product.additionalInfo.map((spec, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor: index % 2 === 0 ? "grey.50" : WHITE,
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontWeight: "bold",
                          width: "40%",
                          color: "text.secondary",
                        }}
                      >
                        {spec.key}
                      </TableCell>
                      <TableCell align="left">{spec.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}

        {/* Frequently Asked Questions */}
        {product.faq && product.faq.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, mb: 3 }}
              >
                Frequently Asked Questions
              </Typography>
              {product.faq.map((faqItem) => (
                <Accordion
                  key={faqItem.id}
                  elevation={0}
                  sx={{
                    mb: 1,
                    border: "1px solid",
                    borderColor: "grey.200",
                    "&:before": { display: "none" }, // Hides standard Accordion divider lines
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ChevronDown style={{ color: RED_PRIMARY }} />}
                  >
                    <Typography fontWeight="medium">
                      {faqItem.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ borderTop: "1px solid", borderColor: "grey.100" }}
                  >
                    <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {faqItem.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Random Products Section */}
      {randomProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, mb: 4, color: "grey.900" }}
          >
            Explore More Products
          </Typography>
          <Grid container spacing={4}>
            {randomProducts.map((randomProd) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={randomProd.id}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={randomProd.thumbnail || randomProd.image}
                    alt={randomProd.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Chip
                      label={randomProd.category}
                      sx={{
                        backgroundColor: RED_LIGHT,
                        color: RED_PRIMARY,
                        fontWeight: "bold",
                        width: "fit-content",
                        mb: 2
                      }}
                      size="small"
                    />
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                      {randomProd.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {randomProd.about?.substring(0, 100) || randomProd.description?.substring(0, 100)}...
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: RED_PRIMARY, fontWeight: 'bold' }}>
                      {formatPrice(randomProd.newPrice)}
                    </Typography>
                    {randomProd.oldPrice > randomProd.newPrice && (
                      <Typography variant="subtitle1" sx={{ color: "grey.500", textDecoration: 'line-through' }}>
                        {formatPrice(randomProd.oldPrice)}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={`/products/${randomProd.id}`}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        color: RED_PRIMARY,
                        borderColor: RED_PRIMARY,
                        '&:hover': {
                          backgroundColor: RED_PRIMARY,
                          color: WHITE,
                          borderColor: RED_PRIMARY
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetails;
