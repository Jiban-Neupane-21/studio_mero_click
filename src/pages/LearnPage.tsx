/* eslint-disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Button,
    Card,
    CardMedia,
    CardContent,
    Chip,
    IconButton,
    Dialog,
    Divider,
    CircularProgress,
    TextField,
    InputAdornment,
    Tabs,
    Tab
} from '@mui/material';
import {
    Play,
    BookOpen,
    Video,
    Clock,
    User,
    Calendar,
    ChevronRight,
    Search,
    Share2,
    ExternalLink,
    X,
    FileText,
    Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TutorialVideo, LearningArticle } from '../types';
import { ColorModeContext } from '../App';
import { tutorialVideosApi } from '../api/tutorialVideos';
import { learningArticlesApi } from '../api/learningArticles';

const extractTiktokId = (url: string) => {
    try {
        const urlObj = new URL(url);
        const paths = urlObj.pathname.split('/');
        const videoIndex = paths.indexOf('video');
        if (videoIndex !== -1 && paths.length > videoIndex + 1) {
            return paths[videoIndex + 1];
        }
    } catch (e) {
        return null;
    }
    return null;
};

export default function LearnFromUs() {
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === 'dark';
    const navigate = useNavigate();

    // Core Data Lists State
    const [videos, setVideos] = useState<TutorialVideo[]>([]);
    const [articles, setArticles] = useState<LearningArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Filter/Search States
    const [currentTab, setCurrentTab] = useState<number>(0); // 0 = Videos, 1 = Articles
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Modal Interactive States
    const [theaterVideo, setTheaterVideo] = useState<TutorialVideo | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [videosResponse, articlesResponse] = await Promise.all([
                    tutorialVideosApi.getTutorialVideos(),
                    learningArticlesApi.getLearningArticles()
                ]);

                // Map database snake_case to frontend camelCase expected by types
                const mappedVideos: TutorialVideo[] = videosResponse.map((v: any) => ({
                    ...v,
                    youtubeId: v.youtube_id || v.youtubeId,
                    facebookLink: v.facebook_link || v.facebookLink,
                    tiktokLink: v.tiktok_link || v.tiktokLink,
                    uploadDate: v.upload_date || v.uploadDate,
                    publishedAt: v.published_at || v.publishedAt,
                }));

                const mappedArticles: LearningArticle[] = articlesResponse.map((a: any) => ({
                    ...a,
                    readTime: a.read_time || a.readTime,
                    publishedAt: a.published_at || a.publishedAt,
                    imageUrl: a.image_url || a.image || a.imageUrl,
                }));

                setVideos(mappedVideos);
                setArticles(mappedArticles);
            } catch (err) {
                console.error('Error loading tutorials/articles data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Categories: specific platforms for videos, none for articles
    const categories = useMemo(() => {
        if (currentTab === 1) return []; // No categories for articles
        return ['All', 'YouTube', 'Facebook', 'TikTok'];
    }, [currentTab]);

    // Reset category filter when switching tabs
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
        setSelectedCategory('All');
        setSearchQuery('');
    };

    // Filter lists based on Search Query and Selected Category
    const filteredVideos = useMemo(() => {
        return videos.filter(video => {
            const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.description.toLowerCase().includes(searchQuery.toLowerCase());
            
            let matchesCategory = true;
            if (selectedCategory === 'YouTube') {
                matchesCategory = !!video.youtubeId;
            } else if (selectedCategory === 'Facebook') {
                matchesCategory = !!video.facebookLink;
            } else if (selectedCategory === 'TikTok') {
                matchesCategory = !!video.tiktokLink;
            } else {
                matchesCategory = selectedCategory === 'All';
            }

            return matchesSearch && matchesCategory;
        });
    }, [videos, searchQuery, selectedCategory]);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.content.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [articles, searchQuery]);

    const handleShareVideo = (video: TutorialVideo, e: React.MouseEvent) => {
        e.stopPropagation();
        const url = `https://www.youtube.com/watch?v=${video.youtubeId}`;
        navigator.clipboard.writeText(url);
        setCopiedId(video.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleShareArticle = (article: LearningArticle, e: React.MouseEvent) => {
        e.stopPropagation();
        const url = `${window.location.origin}/learn?article=${article.id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(article.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const isTikTokVideo = theaterVideo && !theaterVideo.youtubeId && !theaterVideo.facebookLink && theaterVideo.tiktokLink;

    return (
        <Box
            id="learn-from-us-page"
            sx={{
                py: { xs: 6, md: 10 },
                backgroundColor: isDark ? '#020202' : '#f8fafc',
                color: 'text.primary',
                transition: 'background-color 0.3s',
                minHeight: '80vh'
            }}
        >
            <Container maxWidth="xl">
                {/* ================= HEADER SECTION ================= */}
                <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 700,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            mb: 2.5,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.15
                        }}
                    >
                        Learn From Us: <Box component="span" sx={{ color: '#E50914' }}>Guides & Masterclasses</Box>
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: isDark ? '#cbd5e1' : '#475569',
                            maxWidth: '820px',
                            mx: 'auto',
                            fontWeight: 300,
                            fontSize: { xs: '1.025rem', md: '1.15rem' },
                            lineHeight: 1.7
                        }}
                    >
                        Enhance your photographic knowledge, prepare perfectly for embassy biometric validations, learn standard positioning guidelines, and understand the core crafts behind high-end wooden fabrication.
                    </Typography>
                </Box>

                {/* ================= SEARCH & NAVIGATION TOOLBAR ================= */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 3,
                        mb: 5,
                        p: 3,
                        backgroundColor: isDark ? 'rgba(10, 10, 12, 0.6)' : '#ffffff',
                        border: '1px solid',
                        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                        borderRadius: '12px',
                        boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.01)'
                    }}
                >
                    {/* Section Selector Tabs */}
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTabs-indicator': { backgroundColor: '#E50914', height: '3px' },
                            '& .MuiTab-root': {
                                fontFamily: '"Space Grotesk", sans-serif',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'none',
                                color: 'text.secondary',
                                '&.Mui-selected': { color: '#E50914' }
                            }
                        }}
                    >
                        <Tab icon={<Video size={18} />} label="Tutorial Videos" iconPosition="start" />
                        <Tab icon={<BookOpen size={18} />} label="Articles & Handbooks" iconPosition="start" />
                    </Tabs>

                    {/* Real-time Search Input */}
                    <TextField
                        placeholder={currentTab === 0 ? "Search tutorial video..." : "Search educational article..."}
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={16} color="#94a3b8" />
                                    </InputAdornment>
                                ),
                                style: {
                                    color: isDark ? '#ffffff' : '#0f172a',
                                    fontFamily: '"Inter", sans-serif',
                                    fontSize: '0.9rem'
                                }
                            }
                        }}
                        sx={{
                            width: { xs: '100%', md: '320px' },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                                '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
                                '&:hover fieldset': { borderColor: '#E50914' },
                                '&.Mui-focused fieldset': { borderColor: '#E50914' }
                            }
                        }}
                    />
                </Box>

                {/* ================= CATEGORY BARS ================= */}
                {categories.length > 1 && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1.25,
                            mb: 6,
                            overflowX: 'auto',
                            pb: 1.5,
                            '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none',
                            justifyContent: 'center'
                        }}
                    >
                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat;
                            return (
                                <Chip
                                    key={cat}
                                    label={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    sx={{
                                        fontFamily: '"Space Grotesk", sans-serif',
                                        fontWeight: isActive ? 600 : 400,
                                        fontSize: '0.85rem',
                                        px: 1.5,
                                        py: 2.25,
                                        cursor: 'pointer',
                                        backgroundColor: isActive
                                            ? '#E50914'
                                            : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                                        color: isActive ? '#ffffff' : 'text.secondary',
                                        border: '1px solid',
                                        borderColor: isActive ? '#E50914' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            backgroundColor: isActive ? '#E50914' : 'rgba(229, 9, 20, 0.08)',
                                            borderColor: '#E50914',
                                            color: isActive ? '#ffffff' : '#E50914'
                                        }
                                    }}
                                />
                            );
                        })}
                    </Box>
                )}

                {/* ================= LOADER OR GRID LISTINGS ================= */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
                        <CircularProgress sx={{ color: '#E50914' }} />
                    </Box>
                ) : (
                    <Box>
                        {/* =============== TAB 0: TUTORIAL VIDEOS GRID =============== */}
                        {currentTab === 0 && (
                            <Box>
                                {filteredVideos.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8, border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                                        <Typography color="textSecondary">No tutorial videos found matching "{searchQuery}".</Typography>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
                                        {filteredVideos.map((video) => (
                                            <Card
                                                key={video.id}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    background: isDark ? '#121214' : '#ffffff',
                                                    border: '1px solid',
                                                    borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                                                    borderRadius: '10px',
                                                    overflow: 'hidden',
                                                    boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.02)',
                                                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s',
                                                    '&:hover': {
                                                        transform: 'translateY(-6px)',
                                                        borderColor: '#E50914',
                                                        '& .hover-play-icon': { transform: 'scale(1.15)', backgroundColor: '#E50914' }
                                                    }
                                                }}
                                            >
                                                {/* YouTube Preview Image Frame */}
                                                <Box
                                                    onClick={() => setTheaterVideo(video)}
                                                    sx={{
                                                        position: 'relative',
                                                        aspectRatio: '16/10',
                                                        overflow: 'hidden',
                                                        cursor: 'pointer',
                                                        backgroundColor: '#000000'
                                                    }}
                                                >
                                                    {video.youtubeId ? (
                                                        <CardMedia
                                                            component="img"
                                                            image={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                                            alt={video.title}
                                                            onError={(e: any) => {
                                                                e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
                                                            }}
                                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <Box sx={{
                                                            width: '100%',
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
                                                            color: 'rgba(255,255,255,0.7)',
                                                            gap: 1.5
                                                        }}>
                                                            <Video size={48} strokeWidth={1} />
                                                            <Typography variant="overline" sx={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                                                                {video.facebookLink ? 'Facebook Video' : video.tiktokLink ? 'TikTok Video' : 'Video Tutorial'}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                    <Box sx={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' }} />

                                                    {/* Hover Play Bubble overlay */}
                                                    <Box
                                                        className="hover-play-icon"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            width: 52,
                                                            height: 52,
                                                            borderRadius: '50%',
                                                            backgroundColor: 'rgba(229, 9, 20, 0.9)',
                                                            color: '#ffffff',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <Play size={20} fill="#ffffff" style={{ marginLeft: '4px' }} />
                                                    </Box>

                                                    {/* Category Badge */}
                                                    <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                                                        <Chip
                                                            label={video.category}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: 'rgba(0,0,0,0.85)',
                                                                color: '#ffffff',
                                                                border: '1px solid rgba(255,255,255,0.15)',
                                                                fontSize: '0.65rem',
                                                                fontWeight: 700,
                                                                borderRadius: '4px'
                                                            }}
                                                        />
                                                    </Box>

                                                    {/* Video Duration */}
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 12,
                                                            right: 12,
                                                            backgroundColor: 'rgba(0,0,0,0.85)',
                                                            color: '#ffffff',
                                                            px: 1,
                                                            py: 0.35,
                                                            borderRadius: '4px',
                                                            fontSize: '0.7rem',
                                                            fontWeight: 650,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 0.5
                                                        }}
                                                    >
                                                        <Clock size={10} color="#E50914" />
                                                        {video.duration}
                                                    </Box>
                                                </Box>

                                                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <Typography
                                                        variant="h6"
                                                        onClick={() => setTheaterVideo(video)}
                                                        sx={{
                                                            fontFamily: '"Space Grotesk", sans-serif',
                                                            fontWeight: 700,
                                                            fontSize: '1.05rem',
                                                            mb: 1.5,
                                                            lineHeight: 1.35,
                                                            cursor: 'pointer',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            '&:hover': { color: '#E50914' }
                                                        }}
                                                    >
                                                        {video.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: 'text.secondary',
                                                            fontWeight: 300,
                                                            lineHeight: 1.6,
                                                            fontSize: '0.85rem',
                                                            mb: 3,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {video.description}
                                                    </Typography>

                                                    {/* Card Footer actions */}
                                                    <Box
                                                        sx={{
                                                            mt: 'auto',
                                                            pt: 2,
                                                            borderTop: '1px solid',
                                                            borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Typography sx={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }} component="span">
                                                            Released {video.publishedAt}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => handleShareVideo(video, e)}
                                                                sx={{ color: copiedId === video.id ? '#10b981' : 'text.secondary' }}
                                                            >
                                                                <Share2 size={14} />
                                                            </IconButton>
                                                            <Button
                                                                size="small"
                                                                onClick={() => setTheaterVideo(video)}
                                                                endIcon={<ChevronRight size={12} />}
                                                                sx={{
                                                                    textTransform: 'none',
                                                                    color: '#E50914',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: 650,
                                                                    p: 0,
                                                                    minWidth: 'auto'
                                                                }}
                                                            >
                                                                Watch Video
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* =============== TAB 1: ARTICLES GRID =============== */}
                        {currentTab === 1 && (
                            <Box>
                                {filteredArticles.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8, border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                                        <Typography color="textSecondary">No learning guides found matching "{searchQuery}".</Typography>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
                                        {filteredArticles.map((article) => (
                                            <Card
                                                key={article.id}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: { xs: 'column', sm: 'row' },
                                                    background: isDark ? '#121214' : '#ffffff',
                                                    border: '1px solid',
                                                    borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                                                    borderRadius: '10px',
                                                    overflow: 'hidden',
                                                    boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.02)',
                                                    transition: 'transform 0.3s, border-color 0.3s',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        borderColor: '#E50914'
                                                    }
                                                }}
                                            >
                                                {/* Aspect Ratio Sized Article Image */}
                                                <Box
                                                    sx={{
                                                        width: { xs: '100%', sm: '40%' },
                                                        position: 'relative',
                                                        minHeight: { xs: '180px', sm: 'auto' }
                                                    }}
                                                >
                                                    <img
                                                        src={article.imageUrl}
                                                        alt={article.title}
                                                        referrerPolicy="no-referrer"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                                                    />
                                                    <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                                                        <Chip
                                                            label={article.category}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: 'rgba(229, 9, 20, 0.9)',
                                                                color: '#ffffff',
                                                                fontWeight: 700,
                                                                fontSize: '0.65rem',
                                                                borderRadius: '4px'
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>

                                                <CardContent sx={{ p: 3, width: { xs: '100%', sm: '60%' }, display: 'flex', flexDirection: 'column' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                                        <Typography component="span" sx={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                                                            <Calendar size={11} color="#E50914" /> {article.publishedAt}
                                                        </Typography>
                                                        <Typography component="span" sx={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                                                            <Clock size={11} color="#E50914" /> {article.readTime}
                                                        </Typography>
                                                    </Box>

                                                    <Typography
                                                        variant="h6"
                                                        onClick={() => navigate(`/learn/${article.id}`)}
                                                        sx={{
                                                            fontFamily: '"Space Grotesk", sans-serif',
                                                            fontWeight: 700,
                                                            fontSize: '1.05rem',
                                                            mb: 1.5,
                                                            lineHeight: 1.35,
                                                            cursor: 'pointer',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            '&:hover': { color: '#E50914' }
                                                        }}
                                                    >
                                                        {article.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: 'text.secondary',
                                                            fontWeight: 300,
                                                            lineHeight: 1.6,
                                                            fontSize: '0.85rem',
                                                            mb: 3,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {article.excerpt}
                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            mt: 'auto',
                                                            pt: 1.5,
                                                            borderTop: '1px solid',
                                                            borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Typography component="span" sx={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <User size={11} /> {article.author}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => handleShareArticle(article, e)}
                                                                sx={{ color: copiedId === article.id ? '#10b981' : 'text.secondary' }}
                                                            >
                                                                <Share2 size={14} />
                                                            </IconButton>
                                                            <Button
                                                                size="small"
                                                                onClick={() => navigate(`/learn/${article.id}`)}
                                                                sx={{
                                                                    textTransform: 'none',
                                                                    color: '#E50914',
                                                                    fontWeight: 650,
                                                                    fontSize: '0.75rem',
                                                                    p: 0,
                                                                    minWidth: 'auto'
                                                                }}
                                                            >
                                                                Read Guide
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                )}

                {/* ================= BOTTOM CTA CALL TO ACTION ================= */}
                <Box
                    sx={{
                        mt: 10,
                        p: { xs: 4, md: 6 },
                        borderRadius: '12px',
                        border: '2px solid rgba(229, 9, 20, 0.2)',
                        background: isDark
                            ? 'radial-gradient(ellipse at bottom, rgba(229,9,20,0.12) 0%, rgba(5,5,5,1) 80%)'
                            : 'radial-gradient(ellipse at bottom, rgba(229,9,20,0.05) 0%, rgba(255,255,255,1) 80%)',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="overline" sx={{ color: '#E50914', fontWeight: 650, letterSpacing: '0.15em', display: 'block', mb: 1 }}>
                        Studio Mero Click Booking
                    </Typography>
                    <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 2 }}>
                        Ready to Book a Slot?
                    </Typography>
                    <Typography variant="body1" sx={{ color: isDark ? '#cbd5e1' : '#475569', fontWeight: 300, maxWidth: '750px', mx: 'auto', mb: 4 }}>
                        Book your  Wedding ,fashion, commercials, cakesmash, maternity, family portraits, ecommerce shoot and many more with Studio Mero Click.
                    </Typography>
                    <Button
                        variant="contained"
                        href="/book"
                        sx={{
                            background: 'linear-gradient(135deg, #E50914 0%, #B71C1C 100%)',
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 600,
                            textTransform: 'none',
                            px: 5,
                            py: 1.5,
                            borderRadius: '4px',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #ff4c4c 0%, #a60000 100%)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        Schedule On-Site Studio Session
                    </Button>
                </Box>
            </Container>

            {/* ================= INTERACTIVE COMPACT MODAL: THEATER MODE PLAYER ================= */}
            <AnimatePresence>
                {theaterVideo && (
                    <Dialog
                        fullWidth
                        maxWidth={isTikTokVideo ? "xs" : "md"}
                        open={Boolean(theaterVideo)}
                        onClose={() => setTheaterVideo(null)}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                overflow: 'hidden',
                                borderRadius: '8px',
                                mx: { xs: 2, sm: 4 }
                            }
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                        >
                            <Box sx={{ width: '100%', position: 'relative' }}>
                                {/* Header controls */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 1, color: '#ffffff' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Video size={15} color="#E50914" />
                                        <Typography component="span" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.8)' }}>
                                            TUTORIAL SESSION: {theaterVideo.category.toUpperCase()}
                                        </Typography>
                                    </Box>
                                    <IconButton onClick={() => setTheaterVideo(null)} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.08)' } }}>
                                        <X size={20} />
                                    </IconButton>
                                </Box>

                                {/* Video container */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        aspectRatio: isTikTokVideo ? '9/16' : '16/9',
                                        maxHeight: isTikTokVideo ? '85vh' : 'none',
                                        margin: isTikTokVideo ? '0 auto' : '0',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        backgroundColor: '#000000',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.85)'
                                    }}
                                >
                                    {theaterVideo.youtubeId ? (
                                        <iframe
                                            title={theaterVideo.title}
                                            src={`https://www.youtube.com/embed/${theaterVideo.youtubeId}?autoplay=1&rel=0`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            style={{ width: '100%', height: '100%', border: 'none' }}
                                        />
                                    ) : theaterVideo.facebookLink ? (
                                        <iframe
                                            title={theaterVideo.title}
                                            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(theaterVideo.facebookLink)}&show_text=0&width=800`}
                                            style={{ width: '100%', height: '100%', border: 'none', overflow: 'hidden' }}
                                            scrolling="no"
                                            frameBorder="0"
                                            allowFullScreen={true}
                                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        />
                                    ) : theaterVideo.tiktokLink ? (
                                        <iframe
                                            title={theaterVideo.title}
                                            src={`https://www.tiktok.com/embed/v2/${extractTiktokId(theaterVideo.tiktokLink) || ''}`}
                                            style={{ width: '100%', height: '100%', border: 'none' }}
                                            allow="autoplay; encrypted-media; picture-in-picture"
                                        />
                                    ) : (
                                        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                            <Typography>No video source available</Typography>
                                        </Box>
                                    )}
                                </Box>

                                {/* Description footer */}
                                <Box sx={{ mt: 2, p: 3, bgcolor: '#121214', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#ffffff' }}>
                                    <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 650, mb: 1, fontSize: '1.1rem' }}>
                                        {theaterVideo.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.55 }}>
                                        {theaterVideo.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    </Dialog>
                )}
            </AnimatePresence>

        </Box>
    );
}
