import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  InputAdornment,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import {
  Ticket,
  User,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  Copy,
  Clock,
  Gift,
} from "lucide-react";
import { apiService } from "../utils/supabase";
import emailjs from "@emailjs/browser";
import { OfferAd } from "../types";

export default function ClaimOffer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [offers, setOffers] = useState<OfferAd[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<OfferAd | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [notes, setNotes] = useState("");

  // Submission State
  const [claimCode, setClaimCode] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Theme Constants (matching OfferDetailsPage)
  const RED_PRIMARY = "#D32F2F";
  const RED_LIGHT = "#FFEBEE";
  const WHITE = "#FFFFFF";

  useEffect(() => {
    const fetchOffersAndSetDefault = async () => {
      try {
        const data = await apiService.getOffers();
        setOffers(data);

        // Check if there's an offer ID passed in query string or state
        const params = new URLSearchParams(location.search);
        const queryOfferId = params.get("offerId") || params.get("id");

        if (queryOfferId && data.length > 0) {
          const matched = data.find((o) => o.id === queryOfferId);
          if (matched) {
            setSelectedOffer(matched);
          } else {
            setSelectedOffer(data[0]);
          }
        } else if (data.length > 0) {
          setSelectedOffer(data[0]);
        }
      } catch (err) {
        console.error("Error loading offers in Claim Page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffersAndSetDefault();
  }, [location]);

  const handleOfferChange = (offerId: string) => {
    const matched = offers.find((o) => o.id === offerId);
    if (matched) {
      setSelectedOffer(matched);
    }
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffer) return;

    setSubmitting(true);

    // Generate claim code
    setTimeout(() => {
      const code = `KTM-${selectedOffer.targetCategory.toUpperCase().substring(0, 3)}-${Math.floor(
        1000 + Math.random() * 9000,
      )}`;

      // Store claim in local storage for persistence
      try {
        const storedClaims =
          localStorage.getItem("kathmandu_studio_claims") || "[]";
        const claims = JSON.parse(storedClaims);
        claims.push({
          code,
          offerId: selectedOffer.id,
          offerTitle: selectedOffer.title,
          discount: selectedOffer.discount,
          clientName: name,
          clientEmail: email,
          clientPhone: phone,
          preferredDate,
          notes,
          claimedAt: new Date().toLocaleDateString("en-US"),
        });
        localStorage.setItem("kathmandu_studio_claims", JSON.stringify(claims));
      } catch (e) {
        console.error("Error saving claim locally:", e);
      }

      // Send email to admin
      emailjs
        .send(
          "service_01581tk", // Your EmailJS Service ID
          "template_5vabe8", // Your EmailJS Template ID for offer claims
          {
            client_name: name,
            client_email: email,
            client_phone: phone,
            package_name: `${selectedOffer.title} (${selectedOffer.discount})`,
            booking_date: new Date(preferredDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            notes: `[Offer Claim] ${notes || "No special requests."}`,
            claim_code: code,
            to_email: "neupanejiban73@gmail.com",
            reply_to: "neupanejiban73@gmail.com",
          },
          "cDNJDxxr2a8Yz4PF8", // Your EmailJS Public Key
        )
        .catch((err) =>
          console.error("Failed to send admin notification email:", err),
        );

      setClaimCode(code);
      setSubmitting(false);
    }, 1200);
  };

  const handleCopyCode = () => {
    if (claimCode) {
      navigator.clipboard.writeText(claimCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 12, minHeight: "60vh", backgroundColor: "grey.50" }}>
        <CircularProgress sx={{ color: RED_PRIMARY, mb: 2 }} />
        <Typography variant="body1" sx={{ fontFamily: '"Space Grotesk"', color: "text.secondary" }}>
          Loading premium studio offers...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, minHeight: "90vh", backgroundColor: "grey.50" }}>
      <Container maxWidth="lg" id="claim-offer-page">
        {/* Back navigation */}
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowLeft size={16} />}
          sx={{
            color: RED_PRIMARY,
            mb: 4,
            textTransform: "none",
            fontFamily: '"Space Grotesk", sans-serif',
            "&:hover": { backgroundColor: RED_LIGHT },
          }}
        >
          Back
        </Button>

        {claimCode ? (
          /* ================================= SUCCESS VIEW ================================= */
          <Box sx={{ maxWidth: "650px", mx: "auto", textAlign: "center" }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 4, md: 6 },
                backgroundColor: WHITE,
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: "12px",
                color: "text.primary",
              }}
              id="success-claim-card"
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: RED_LIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid",
                    borderColor: RED_PRIMARY,
                  }}
                >
                  <CheckCircle size={36} color={RED_PRIMARY} />
                </Box>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Fraunces", serif',
                  fontWeight: 700,
                  mb: 1,
                  color: "grey.900",
                }}
              >
                Offer Claimed Successfully!
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  maxWidth: "500px",
                  mx: "auto",
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Thank you, <strong>{name}</strong>! Your discount voucher code
                has been locked in. Bring or mention this code when you visit us
                in Kathmandu Rudramti Chowk Anamnagar.
              </Typography>

              {/* Offer visual snippet */}
              {selectedOffer && (
                <Box
                  sx={{
                    backgroundColor: "grey.50",
                    border: "1px solid",
                    borderColor: "grey.200",
                    borderRadius: "8px",
                    p: 2.5,
                    mb: 4,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: RED_PRIMARY,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {selectedOffer.discount}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mt: 0.5, color: "grey.900" }}
                  >
                    {selectedOffer.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.85rem",
                      mt: 0.5,
                    }}
                  >
                    {selectedOffer.description}
                  </Typography>
                </Box>
              )}

              {/* Claim Voucher Box */}
              <Box
                sx={{
                  backgroundColor: RED_LIGHT,
                  border: "2px dashed",
                  borderColor: RED_PRIMARY,
                  borderRadius: "10px",
                  p: 3,
                  mb: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: RED_PRIMARY,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    mb: 1,
                  }}
                >
                  YOUR VOUCHER CLAIM CODE
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Space Grotesk", monospace',
                    fontWeight: 800,
                    color: RED_PRIMARY,
                    letterSpacing: "0.05em",
                    fontSize: { xs: "1.8rem", sm: "2.5rem" },
                    mb: 2,
                  }}
                >
                  {claimCode}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleCopyCode}
                  startIcon={<Copy size={14} />}
                  sx={{
                    color: RED_PRIMARY,
                    borderColor: RED_PRIMARY,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    "&:hover": {
                      borderColor: "#B71C1C",
                      backgroundColor: "rgba(211, 47, 47, 0.08)",
                    },
                  }}
                >
                  {copied ? "Copied to Clipboard!" : "Copy Claim Code"}
                </Button>
              </Box>

              {/* Instructions list */}
              <Box sx={{ textAlign: "left", mb: 4, px: { md: 2 } }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, mb: 1.5, color: "grey.900" }}
                >
                  💡 What's next?
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0, color: "text.secondary", fontSize: "0.9rem", display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <li>Show this code on your phone to our Studio at Rudramati Chowk Anamnagar, Kathmandu.</li>
                  <li>Our studio lead will apply the flat discount directly to your final bill amount.</li>
                  <li>No payment required right now — claim is 100% free to lock in.</li>
                  <li>Voucher code is valid until the listed date. Walk-ins are daily!</li>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    navigate(`/book?serviceId=${selectedOffer?.targetCategory}`)
                  }
                  sx={{
                    backgroundColor: RED_PRIMARY,
                    color: WHITE,
                    textTransform: "none",
                    fontWeight: "bold",
                    py: 1.25,
                    fontFamily: '"Space Grotesk"',
                    "&:hover": { backgroundColor: "#B71C1C" },
                  }}
                >
                  Book Studio Session Now
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/")}
                  sx={{
                    color: RED_PRIMARY,
                    borderColor: RED_PRIMARY,
                    textTransform: "none",
                    fontWeight: "bold",
                    py: 1.25,
                    "&:hover": {
                      borderColor: "#B71C1C",
                      backgroundColor: RED_LIGHT,
                    },
                  }}
                >
                  Return to Home
                </Button>
              </Box>
            </Paper>
          </Box>
        ) : (
          /* ================================= MAIN FORM VIEW ================================= */
          <Grid container spacing={6}>
            {/* Left side: Selector and Form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: RED_PRIMARY,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    fontFamily: '"Space Grotesk"',
                  }}
                >
                  EXCLUSIVE DISCOUNTS
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Fraunces", serif',
                    fontWeight: 700,
                    fontSize: { xs: "2rem", md: "2.75rem" },
                    mb: 2,
                    color: "grey.900",
                  }}
                >
                  Claim Your Studio Voucher
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", fontWeight: 400, lineHeight: 1.6 }}
                >
                  Select an active Kathmandu Studio offer below and fill out
                  your name and contact details to lock in your discount. No
                  upfront billing or card detail required!
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleClaimSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                {/* Offer Dropdown Selector */}
                <TextField
                  select
                  fullWidth
                  label="Select Studio Special Offer"
                  value={selectedOffer?.id || ""}
                  onChange={(e) => handleOfferChange(e.target.value)}
                  variant="outlined"
                  sx={{ backgroundColor: WHITE }}
                >
                  {offers.map((o) => (
                    <MenuItem key={o.id} value={o.id}>
                      {o.discount} — {o.title}
                    </MenuItem>
                  ))}
                </TextField>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Your Name"
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                      sx={{ backgroundColor: WHITE }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <User size={18} color="#757575" />
                            </InputAdornment>
                          ),
                        }
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      type="email"
                      label="Email Address"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      sx={{ backgroundColor: WHITE }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Mail size={18} color="#757575" />
                            </InputAdornment>
                          ),
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Phone Number"
                      placeholder="e.g. 9801000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      variant="outlined"
                      sx={{ backgroundColor: WHITE }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone size={18} color="#757575" />
                            </InputAdornment>
                          ),
                        }
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      type="date"
                      label="Preferred Session Date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      variant="outlined"
                      sx={{ backgroundColor: WHITE }}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Calendar size={18} color="#757575" />
                            </InputAdornment>
                          ),
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Special Requests / Message (Optional)"
                  placeholder="Tell us if you have any customization requests or specific preferences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  variant="outlined"
                  sx={{ backgroundColor: WHITE }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                  sx={{
                    backgroundColor: RED_PRIMARY,
                    color: WHITE,
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1.05rem",
                    py: 1.75,
                    borderRadius: "6px",
                    boxShadow: "0 8px 20px rgba(211, 47, 47, 0.25)",
                    "&:hover": {
                      backgroundColor: "#B71C1C",
                      boxShadow: "0 10px 25px rgba(211, 47, 47, 0.35)",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "grey.300",
                      color: "grey.500",
                    },
                  }}
                >
                  {submitting ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: WHITE }} />
                      <span>Generating voucher code...</span>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Ticket size={20} />
                      <span>Claim Free Discount Voucher</span>
                    </Box>
                  )}
                </Button>
              </Box>
            </Grid>

            {/* Right side: Selected Offer Detail Display Card */}
            <Grid size={{ xs: 12, md: 5 }}>
              {selectedOffer && (
                <Card
                  elevation={3}
                  sx={{
                    backgroundColor: WHITE,
                    border: "1px solid",
                    borderColor: "grey.200",
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "sticky",
                    top: 100
                  }}
                  id="preview-claim-offer-card"
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "240px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={selectedOffer.image}
                      alt={selectedOffer.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 65%)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        backgroundColor: RED_PRIMARY,
                        color: WHITE,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        fontFamily: '"Space Grotesk"',
                        letterSpacing: "0.05em",
                      }}
                    >
                      {selectedOffer.badge || 'HOT DEAL'}
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 4, pt: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1.5,
                      }}
                    >
                      <Gift
                        size={18}
                        color={RED_PRIMARY}
                      />
                      <Typography
                        variant="overline"
                        sx={{
                          color: RED_PRIMARY,
                          fontWeight: 800,
                          fontSize: "0.9rem",
                          fontFamily: '"Space Grotesk"',
                        }}
                      >
                        {selectedOffer.discount}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: '"Fraunces", serif',
                        fontWeight: 700,
                        mb: 2,
                        color: "grey.900",
                      }}
                    >
                      {selectedOffer.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.6,
                        fontSize: "0.95rem",
                        mb: 3,
                      }}
                    >
                      {selectedOffer.description}
                    </Typography>

                    <Divider
                      sx={{ borderColor: "grey.200", mb: 3 }}
                    />

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Clock size={18} color="#757575" />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.9rem",
                          }}
                        >
                          <strong>Validity:</strong>{" "}
                          {selectedOffer.validUntil || "Limited Time"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Sparkles size={18} color={RED_PRIMARY} />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.9rem",
                          }}
                        >
                          <strong>Category:</strong>{" "}
                          {selectedOffer.targetCategory} Studio
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
