import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ArrowLeft, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useData } from "../context/DataContext";

const EMAILJS_SERVICE_ID = "service_wt15ou7";
const EMAILJS_TEMPLATE_ID = "template_sfe4x7z";
const EMAILJS_PUBLIC_KEY = "cDNJDxxr2a8Yz4PF8";

const ProductBookingPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products } = useData();

  const product = useMemo(
    () => products.find((p: any) => p.id === productId),
    [products, productId],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0],
  );
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="text.secondary">Product not found.</Typography>
        <Button startIcon={<ArrowLeft />} onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Back
        </Button>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("Please fill in name, email, and phone.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          client_name: name,
          client_email: email,
          client_phone: phone,
          product_title: product.title,
          product_price: product.new_price ? `Rs. ${product.new_price}` : "",
          booking_date: new Date(preferredDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          notes: `[Product Booking] ${notes || "No special requests."}`,
          to_email: "neupanejiban73@gmail.com",
          reply_to: email,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSuccess(true);
    } catch {
      setError("Failed to send booking. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <CheckCircle size={64} color="#2e7d32" />
        <Typography variant="h4" sx={{ mt: 3, fontWeight: 700, fontFamily: "'Fraunces', serif" }}>
          Booking Sent!
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          We'll get back to you shortly to confirm your order for{" "}
          <strong>{product.title}</strong>.
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 4 }}>
          Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Button
        startIcon={<ArrowLeft />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: "text.secondary" }}
      >
        Back
      </Button>

      <Typography
        variant="h3"
        sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, mb: 1 }}
      >
        Book a Product
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Fill in your details and we'll confirm your order.
      </Typography>

      <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            pb: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            flexWrap: "wrap",
          }}
        >
          {product.thumbnail && (
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{
                width: 100,
                height: 70,
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
          )}
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: "'Fraunces', serif" }}>
              {product.title}
            </Typography>
            {product.new_price && (
              <Typography variant="h6" sx={{ color: "#D32F2F", fontWeight: 700, mt: 0.5 }}>
                Rs. {product.new_price}
              </Typography>
            )}
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Full Name" required fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email" type="email" required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Phone" required fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Preferred Date" type="date" fullWidth value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
            </Grid>
            <Grid size={12}>
              <TextField label="Message / Special Requests" multiline rows={3} fullWidth value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={submitting}
            sx={{
              mt: 3,
              py: 1.5,
              bgcolor: "#D32F2F",
              "&:hover": { bgcolor: "#B71C1C" },
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : "Send Booking Request"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductBookingPage;
