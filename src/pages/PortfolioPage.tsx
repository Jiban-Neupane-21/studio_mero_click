/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Box, Container, Skeleton, Grid } from "@mui/material";
import { Image as ImageIcon, Sparkles, Filter } from "lucide-react";
import { portfolioApi } from "../api/portfolio";
import PortfolioGrid from "../components/PortfolioGrid";
import { PortfolioItem } from "../types";

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const loadPortfolio = async () => {
      try {
        const data = await portfolioApi.getPortfolioItems();
        setItems(data);
      } catch (err) {
        console.error("Failed to load live portfolio:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, []);

  return (
    <Box id="page-portfolio" sx={{ minHeight: "80vh", backgroundColor: "background.default" }}>
      {loading ? (
        <Box sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 10, md: 14 } }}>
          <Container maxWidth="xl">
            {/* Tabs Skeleton */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mb: 6,
                overflow: "hidden",
              }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} variant="rounded" width={120} height={40} />
              ))}
            </Box>

            {/* Grid Skeleton */}
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    sx={{ aspectRatio: "4/5" }}
                  />
                  <Skeleton
                    variant="text"
                    width="70%"
                    height={24}
                    sx={{ mt: 2 }}
                  />
                  <Skeleton variant="text" width="40%" height={20} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      ) : (
        <PortfolioGrid items={items} />
      )}
    </Box>
  );
}
