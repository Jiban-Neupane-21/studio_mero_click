/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
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
import { ArrowLeft, ChevronDown, Mail, CheckCircle, Calendar } from "lucide-react";
import { useData } from "../context/DataContext";

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { services: allServices, loading: contextLoading, subCategoriesById } = useData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeImage, setActiveImage] = useState<string>("");
  const [randomServices, setRandomServices] = useState<any[]>([]);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [sameSubCategoryServices, setSameSubCategoryServices] = useState<any[]>([]);

  const service = useMemo(() => {
    if (!id || allServices.length === 0) return null;
    const data = allServices.find((s: any) => s.id === id);
    if (!data) return null;
    return {
      ...data,
      oldPrice: data.old_price,
      newPrice: data.new_price,
      discountRate: data.discount_rate,
      isFeatured: data.is_featured,
      isAvailable: data.is_available,
      images: data.service_images?.map((img: any) => ({ url: img.image_url || img.url, alt: img.alt_text || img.alt })) || [],
      additionalInfo: data.service_specifications?.map((s: any) => ({ key: s.spec_key || s.key_name, value: s.spec_value || s.value_text })) || [],
      features: data.service_features || [],
      faq: data.service_faqs || [],
    };
  }, [id, allServices]);

  useEffect(() => {
    if (!contextLoading && id) {
      setLoading(false);
      if (service) {
        setActiveImage(service.thumbnail || "");
        const otherServices = allServices.filter((s: any) => s.id !== id);
        const shuffled = [...otherServices].sort(() => 0.5 - Math.random());
        setRandomServices(shuffled.slice(0, 3));
        const related = otherServices.filter((s: any) => s.category === service.category);
        setRelatedServices(related);
        const sameSubCat = service.sub_category_id
          ? otherServices.filter((s: any) => s.sub_category_id === service.sub_category_id)
          : [];
        setSameSubCategoryServices(sameSubCat);
      } else if (allServices.length > 0) {
        setError(true);
      }
    }
  }, [contextLoading, id, service, allServices]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="error" />
      </Container>
    );
  }

  if (error || !service) {
    return <Navigate to="/404" replace />;
  }

  const formatPrice = (value: number) => `Rs. ${Number(value).toLocaleString("en-IN")}`;

  const RED_PRIMARY = "#D32F2F";
  const RED_LIGHT = "#FFEBEE";

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Back Navigation */}
      <Button
        component={RouterLink}
        to="/services"
        startIcon={<ArrowLeft size={16} />}
        sx={{
          mb: 3,
          color: RED_PRIMARY,
          "&:hover": { backgroundColor: RED_LIGHT },
        }}
      >
        Back to Services
      </Button>

      {/* Main Hero Card */}
      <Paper
        elevation={3}
        sx={{
          overflow: "hidden",
          mb: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Grid container>
          {/* Left Column: Visuals/Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                bgcolor: "background.paper",
              }}
            >
              {/* Main Image Display */}
              <Box
                component="img"
                src={activeImage || service.thumbnail}
                alt={service.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 1.5,
                  bgcolor: "action.hover",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />

              {/* Multiple Images Thumbnails strip */}
              {service.images && service.images.length > 0 && (
                <Box
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
                  {service.images.map((img) => (
                    <Box
                      key={img.id}
                      component="img"
                      src={img.url}
                      alt={img.alt || service.title}
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
              sx={{
                p: { xs: 3, md: 4 },
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                overflow: "hidden",
              }}
            >
              {/* Category & Availability Tags */}
              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                <Chip
                  label={service.category}
                  sx={{
                    backgroundColor: RED_PRIMARY,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                  size="small"
                />
                {subCategoriesById[service.sub_category_id]?.name && (
                  <Chip
                    label={subCategoriesById[service.sub_category_id].name}
                    variant="outlined"
                    size="small"
                    sx={{
                      color: RED_PRIMARY,
                      borderColor: RED_PRIMARY,
                      fontWeight: "600",
                    }}
                  />
                )}
                {service.isAvailable === false && (
                  <Chip
                    label="Unavailable"
                    color="error"
                    size="small"
                    variant="outlined"
                  />
                )}
                {service.isFeatured && (
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
                  color: "text.primary",
                }}
              >
                {service.title}
              </Typography>

              {/* About short summary */}
              <Typography
                variant="subtitle1"
                fontWeight="600"
                color="text.primary"
                sx={{ mb: 1.5 }}
              >
                {service.about}
              </Typography>

              {/* Detailed Long Description */}
              <Box
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.7,
                  mb: 3,
                  wordBreak: "break-word",
                  maxHeight: { xs: "none", md: 350 },
                  overflowY: "auto",
                  "& p": { margin: 0, mb: 1 },
                  "& h1, & h2, & h3, & h4": {
                    color: "text.primary",
                    mt: 2,
                    mb: 1,
                    fontFamily: "'Fraunces', serif",
                  },
                  "& ul, & ol": { pl: 2.5 },
                  "& li": { mb: 0.5 },
                  "& a": { color: "#D32F2F" },
                }}
                dangerouslySetInnerHTML={{
                  __html: service.description || "",
                }}
              />

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
                  {formatPrice(service.newPrice)}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  {formatPrice(service.oldPrice)}
                </Typography>

                <Chip
                  label={`${service.discountRate}% OFF`}
                  sx={{
                    backgroundColor: RED_LIGHT,
                    color: RED_PRIMARY,
                    fontWeight: "bold",
                  }}
                  size="small"
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ mt: "auto", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                  <Button
                    component={RouterLink}
                    to={`/booking/${service.id}`}
                    variant="contained"
                    size="large"
                    startIcon={<Calendar size={18} />}
                    disabled={service.isAvailable === false}
                    fullWidth
                    sx={{
                      py: 1.5,
                      backgroundColor: RED_PRIMARY,
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#B71C1C",
                      },
                    }}
                  >
                    Book Session Now
                  </Button>

                <Button
                    component={RouterLink}
                    to="/contact"
                    variant="outlined"
                    size="large"
                    startIcon={<Mail size={18} />}
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
                    Contact Us for Inquiry
                  </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Secondary Information Layout Stack */}
      <Grid container spacing={4}>
        {/* Features Checklist */}
        {service.features && service.features.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, mb: 3 }}
            >
              What's Included
            </Typography>
            {service.features.map((feature) => (
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
        {service.additionalInfo && service.additionalInfo.length > 0 && (
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
              sx={{ bgcolor: "background.paper" }}
            >
              <Table size="small">
                <TableBody>
                  {service.additionalInfo.map((spec, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor: index % 2 === 0 ? "action.hover" : "background.paper",
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
        {service.faq && service.faq.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, mb: 3 }}
              >
                Frequently Asked Questions
              </Typography>
              {service.faq.map((faqItem) => (
                <Accordion
                  key={faqItem.id}
                  elevation={0}
                  sx={{
                    mb: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    "&:before": { display: "none" },
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
                    sx={{                     borderTop: "1px solid", borderColor: "divider" }}
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

      {/* Same Categories Section */}
      {relatedServices.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, mb: 4, color: "text.primary" }}
          >
            More in {service.category}
          </Typography>
          <Grid container spacing={4}>
            {relatedServices.map((related) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={related.id}>
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
                    image={related.thumbnail || related.image}
                    alt={related.title}
                    sx={{ display: 'block' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                      {related.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {related.about?.substring(0, 100) || related.description?.substring(0, 100)}...
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: RED_PRIMARY, fontWeight: 'bold' }}>
                      {formatPrice(related.newPrice)}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "text.disabled", textDecoration: 'line-through' }}>
                      {formatPrice(related.oldPrice)}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={`/services/${related.id}`}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        color: RED_PRIMARY,
                        borderColor: RED_PRIMARY,
                        '&:hover': {
                          backgroundColor: RED_PRIMARY,
                          color: "#fff",
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

      {/* Random Services Section */}
      {randomServices.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, mb: 4, color: "text.primary" }}
          >
            Explore More Services
          </Typography>
          <Grid container spacing={4}>
            {randomServices.map((randomSvc) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={randomSvc.id}>
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
                    image={randomSvc.thumbnail || randomSvc.image}
                    alt={randomSvc.title}
                    sx={{ display: 'block' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Chip
                      label={randomSvc.category}
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
                      {randomSvc.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {randomSvc.about?.substring(0, 100) || randomSvc.description?.substring(0, 100)}...
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: RED_PRIMARY, fontWeight: 'bold' }}>
                      {formatPrice(randomSvc.newPrice)}
                    </Typography>
                    {randomSvc.oldPrice > randomSvc.newPrice && (
                      <Typography variant="subtitle1" sx={{ color: "text.disabled", textDecoration: 'line-through' }}>
                        {formatPrice(randomSvc.oldPrice)}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={`/services/${randomSvc.id}`}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        color: RED_PRIMARY,
                        borderColor: RED_PRIMARY,
                        '&:hover': {
                          backgroundColor: RED_PRIMARY,
                          color: "#fff",
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

export default ServiceDetails;
