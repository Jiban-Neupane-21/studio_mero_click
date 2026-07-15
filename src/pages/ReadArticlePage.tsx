import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress, 
  Divider, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Skeleton
} from '@mui/material';
import { Clock, User, Calendar, ArrowLeft, ChevronRight } from 'lucide-react';
import { ColorModeContext } from '../App';
import { LearningArticle } from '../types';
import { useData } from '../context/DataContext';
import { useMinDelay } from '../hooks/useMinDelay';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';

export default function ReadArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';

  const { learningArticles: rawArticles, loading: contextLoading } = useData();
  const loadingSkeleton = useMinDelay(contextLoading);

  const allArticles: LearningArticle[] = useMemo(() => {
    return rawArticles.map((a: any) => ({
      ...a,
      readTime: a.read_time || a.readTime,
      publishedAt: a.published_at || a.publishedAt,
      imageUrl: a.image_url || a.image || a.imageUrl,
    }));
  }, [rawArticles]);

  const article = useMemo(() => {
    if (!id || allArticles.length === 0) return null;
    return allArticles.find(a => a.id === id) ?? null;
  }, [id, allArticles]);

  const recommended = useMemo(() => {
    if (!article || allArticles.length === 0) return [];
    const others = allArticles.filter(a => a.id !== id);
    const shuffled = others.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [article, allArticles, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loadingSkeleton) {
    return (
      <Box sx={{ bgcolor: isDark ? '#020202' : '#f8fafc', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="md">
          <Skeleton variant="rounded" width={140} height={36} sx={{ mb: 4 }} />
          <Skeleton variant="text" width="80%" height={56} sx={{ mb: 1.5 }} />
          <Skeleton variant="text" width="50%" height={56} sx={{ mb: 3 }} />
          <Skeleton variant="text" width="60%" height={24} sx={{ mb: 4 }} />
          <Box sx={{ display: 'flex', gap: 3, mb: 5, pb: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={120} height={20} />
            <Skeleton variant="text" width={80} height={20} />
          </Box>
          <Skeleton variant="rounded" width="100%" sx={{ height: 400, borderRadius: 4, mb: 6 }} />
          <Skeleton variant="text" width="100%" height={24} />
          <Skeleton variant="text" width="100%" height={24} />
          <Skeleton variant="text" width="90%" height={24} />
          <Skeleton variant="text" width="100%" height={24} />
          <Skeleton variant="text" width="70%" height={24} />
        </Container>
      </Box>
    );
  }

  if (!article) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" mb={2}>Article not found</Typography>
        <Button variant="outlined" color="error" startIcon={<ArrowLeft />} onClick={() => navigate('/learn')}>
          Back to Learn Page
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: isDark ? '#020202' : '#f8fafc', color: 'text.primary', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        {/* Back Button */}
        <ScrollReveal animation="fadeUp">
        <Button 
          startIcon={<ArrowLeft size={18} />} 
          onClick={() => navigate('/learn')}
          sx={{ mb: 4, color: 'text.secondary', '&:hover': { color: 'error.main' } }}
        >
          Back to all articles
        </Button>
        </ScrollReveal>

        {/* Article Header */}
        <ScrollReveal animation="fadeUp" delay={0.1}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontFamily: '"Space Grotesk", sans-serif', 
            fontWeight: 700, 
            fontSize: { xs: '2rem', md: '3.5rem' },
            lineHeight: 1.2,
            mb: 3
          }}
        >
          {article.title}
        </Typography>

        <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontSize: '1.2rem', mb: 4, fontStyle: 'italic' }}>
          {article.excerpt}
        </Typography>
        </ScrollReveal>

        {/* Meta Info */}
        <ScrollReveal animation="fadeUp" delay={0.15}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 5, pb: 4, borderBottom: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <User size={18} color="#E50914" />
            <Typography variant="body2" fontWeight="600">{article.author}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Calendar size={18} color="#64748b" />
            <Typography variant="body2" color="text.secondary">
              {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Clock size={18} color="#64748b" />
            <Typography variant="body2" color="text.secondary">{article.readTime}</Typography>
          </Box>
        </Box>
        </ScrollReveal>

        {/* Hero Image */}
        {article.imageUrl && (
          <ScrollReveal animation="scaleUp">
          <Box 
            component="img"
            src={article.imageUrl}
            alt={article.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              objectFit: 'cover',
              borderRadius: 4,
              mb: 6,
              boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)'
            }}
          />
          </ScrollReveal>
        )}

        {/* Content Body */}
        <ScrollReveal animation="fadeUp" delay={0.1}>
        <Box 
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '1.15rem',
            lineHeight: 1.8,
            color: isDark ? '#e2e8f0' : '#334155',
            '& h1, & h2, & h3': { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mt: 5, mb: 3, color: isDark ? '#fff' : '#0f172a' },
            '& p': { mb: 3 },
            '& a': { color: '#E50914', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            '& img': { maxWidth: '100%', borderRadius: 2, my: 4 },
            '& blockquote': { borderLeft: '4px solid #E50914', pl: 3, fontStyle: 'italic', color: 'text.secondary', my: 4 }
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        </ScrollReveal>

        <Divider sx={{ my: 8, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />

      </Container>

      {/* Recommended Articles Section */}
      {recommended.length > 0 && (
        <Container maxWidth="xl" sx={{ pb: 8 }}>
          <ScrollReveal animation="fadeUp">
          <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Read Next
          </Typography>
          </ScrollReveal>
          <StaggerContainer staggerDelay={0.1}>
          <Grid container spacing={4} justifyContent="center">
            {recommended.map(rec => (
              <StaggerItem key={rec.id}>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  component={RouterLink}
                  to={`/learn/${rec.id}`}
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    textDecoration: 'none',
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
                    borderRadius: 4,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-8px)' }
                  }}
                  elevation={isDark ? 0 : 2}
                >
                  <CardMedia 
                    component="img"
                    height="200"
                    image={rec.imageUrl}
                    alt={rec.title}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 1, color: isDark ? '#fff' : '#0f172a' }}>
                      {rec.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {rec.excerpt}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#E50914', mt: 'auto', fontWeight: 600 }}>
                      Read Article <ChevronRight size={16} style={{ marginLeft: 4 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              </StaggerItem>
            ))}
          </Grid>
          </StaggerContainer>
        </Container>
      )}
    </Box>
  );
}
