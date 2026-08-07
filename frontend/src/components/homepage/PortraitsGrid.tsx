import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PortfolioItem } from "../../types";
import { useData } from "../../context/DataContext";

export default function PortraitsGrid() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const navigate = useNavigate();

    const { portfolioItems, loading } = useData();
    const [randomPortfolios, setRandomPortfolios] = useState<PortfolioItem[]>([]);

    useEffect(() => {
        if (portfolioItems.length > 0) {
            const shuffled = [...portfolioItems].sort(() => 0.5 - Math.random());
            setRandomPortfolios(shuffled.slice(0, 5));
        }
    }, [portfolioItems]);

    const onNavigate = (path: string) => {
        navigate(`/${path}`);
    };

    return (
        <Container maxWidth="xl" sx={{ minHeight: { xs: "auto", lg: "calc(100vh - 72px)" }, display: "flex", flexDirection: "column", justifyContent: "center", pt: { xs: 2, md: 4 }, pb: 2 }}>

            <Typography
                variant="h4"
                sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    mb: 1,
                    display: "flex",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },
                }}
            >
                Featured Gallery
            </Typography>


            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(5, 1fr)",
                    },
                    gap: 2,
                    mb: 4,
                }}
            >
                {loading ? (
                    [...Array(5)].map((_, index) => (
                        <Box
                            key={`skeleton-${index}`}
                            sx={{
                                position: "relative",
                                aspectRatio: "3/4",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "1px solid",
                                borderColor:
                                    mode === "dark"
                                        ? "rgba(255,255,255,0.08)"
                                        : "rgba(0,0,0,0.06)",
                            }}
                        >
                            <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
                        </Box>
                    ))
                ) : (
                    randomPortfolios.map((item) => (
                        <Box
                            key={item.id}
                            onClick={() => onNavigate("portfolio")}
                            sx={{
                                position: "relative",
                                aspectRatio: "3/4",
                                borderRadius: "8px",
                                overflow: "hidden",
                                cursor: "pointer",
                                border: "1px solid",
                                borderColor:
                                    mode === "dark"
                                        ? "rgba(255,255,255,0.08)"
                                        : "rgba(0,0,0,0.06)",
                                boxShadow:
                                    mode === "dark"
                                        ? "0 10px 30px rgba(0,0,0,0.5)"
                                        : "0 10px 20px rgba(0,0,0,0.05)",
                                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    borderColor: "#E50914",
                                    boxShadow: "0 15px 30px rgba(229, 9, 20, 0.15)",
                                },
                            }}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                referrerPolicy="no-referrer"
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "end",
                                    p: 2,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: "#E50914", fontWeight: 600, mb: 0.5 }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>

            {!loading && randomPortfolios.length === 0 && (
                <Typography align="center" color="text.secondary">
                    No portraits available.
                </Typography>
            )}

            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Button
                    variant="outlined"
                    onClick={() => onNavigate("portfolio")}
                    sx={{
                        color: mode === "dark" ? "#ffffff" : "#0f172a",
                        borderColor:
                            mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 600,
                        textTransform: "none",
                        px: 4,
                        py: 1.25,
                        borderRadius: "4px",
                        transition: "all 0.3s",
                        "&:hover": {
                            borderColor: "#E50914",
                            backgroundColor: "rgba(229, 9, 20, 0.05)",
                            transform: "translateY(-1px)",
                        },
                    }}
                >
                    Show More Portraits
                </Button>
            </Box>
        </Container>
    );
}