/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PortfolioGrid from "../components/PortfolioGrid";
import { PortfolioItem } from "../types";
import { useData } from "../context/DataContext";
import { useMinDelay } from "../hooks/useMinDelay";
import ScrollReveal from "../components/common/ScrollReveal";

export default function PortfolioPage() {
  const { portfolioItems, loading } = useData();
  const loadingSkeleton = useMinDelay(loading);
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (portfolioItems.length > 0) {
      setItems(portfolioItems);
    }
  }, [portfolioItems]);

  return (
    <Box id="page-portfolio" sx={{ minHeight: "80vh", backgroundColor: "background.default" }}>
      <ScrollReveal animation="fadeUp">
        <PortfolioGrid items={items} loading={loadingSkeleton} />
      </ScrollReveal>
    </Box>
  );
}
