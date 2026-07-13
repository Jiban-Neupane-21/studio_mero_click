import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  MenuItem, 
  Grid,
  IconButton,
  Divider
} from '@mui/material';
import { Save, UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PortfolioItem } from '../../types/portfolio.type';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function AdminPortfolio() {
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'Wedding',
    imageUrl: '',
    specLabel: '',
    author: '',
    description: '',
    secondaryImages: []
  });

  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [secondaryImagePreviews, setSecondaryImagePreviews] = useState<string[]>([]);

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const secondaryImageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (content: string) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMainImagePreview(url);
      setFormData(prev => ({ ...prev, imageUrl: file.name })); // In a real app, you would upload this file to storage and get a real URL
    }
  };

  const removeMainImage = () => {
    setMainImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (mainImageInputRef.current) mainImageInputRef.current.value = '';
  };

  const handleSecondaryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      const newNames = files.map(file => file.name);
      
      setSecondaryImagePreviews(prev => [...prev, ...newPreviews]);
      setFormData(prev => ({
        ...prev,
        secondaryImages: [...(prev.secondaryImages || []), ...newNames]
      }));
    }
  };

  const handleRemoveSecondaryImage = (index: number) => {
    setSecondaryImagePreviews(prev => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
    setFormData(prev => {
      const newImages = [...(prev.secondaryImages || [])];
      newImages.splice(index, 1);
      return { ...prev, secondaryImages: newImages };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Portfolio Item:', formData);
    // TODO: Send to Supabase or backend
  };

  // ReactQuill modules for MS Word-like design
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote'],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Manage Portfolio
        </Typography>
      </Box>

      <Paper 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3, 
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          borderTop: '4px solid',
          borderColor: 'error.main',
          bgcolor: 'white'
        }} 
        elevation={0}
      >
        <Typography variant="h5" fontWeight="bold" mb={1} color="error.main">
          Create New Portfolio Entry
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Fill out the details below to add a new beautiful item to your public portfolio.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            
            {/* Left Column: Basic Info & MS Word Editor */}
            <Grid item xs={12} lg={7}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  color="error"
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      color="error"
                    >
                      {PORTFOLIO_CATEGORIES.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Author (Optional)"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      color="error"
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Spec Label (Optional)"
                  name="specLabel"
                  value={formData.specLabel}
                  onChange={handleChange}
                  placeholder="e.g. 4K Resolution, Drone Shot"
                  color="error"
                />

                <Box>
                  <Typography variant="subtitle2" fontWeight="600" mb={1} color="text.primary">
                    Description (Design your text here)
                  </Typography>
                  <Box 
                    sx={{ 
                      '.quill': { 
                        bgcolor: 'white', 
                        borderRadius: 1,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'grey.300',
                      },
                      '.ql-toolbar': {
                        borderBottom: '1px solid',
                        borderColor: 'grey.300',
                        bgcolor: '#fafafa',
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                      },
                      '.ql-container': {
                        minHeight: '250px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        border: 'none'
                      },
                      '.ql-editor': {
                        minHeight: '250px',
                      }
                    }}
                  >
                    <ReactQuill 
                      theme="snow" 
                      value={formData.description} 
                      onChange={handleDescriptionChange}
                      modules={modules}
                      placeholder="Write a compelling, beautiful description using the tools above..."
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Column: Image Uploads */}
            <Grid item xs={12} lg={5}>
              <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2} color="error.dark">
                  Media Gallery Upload
                </Typography>

                {/* Main Image Upload */}
                <Box mb={4}>
                  <Typography variant="body2" fontWeight="600" mb={1}>
                    Main Cover Image *
                  </Typography>
                  
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={mainImageInputRef}
                    onChange={handleMainImageUpload}
                  />

                  {!mainImagePreview ? (
                    <Box
                      onClick={() => mainImageInputRef.current?.click()}
                      sx={{
                        border: '2px dashed',
                        borderColor: 'grey.400',
                        borderRadius: 2,
                        p: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                        bgcolor: 'white',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'error.main',
                          bgcolor: '#fff9f9'
                        }
                      }}
                    >
                      <UploadCloud size={40} color="#d32f2f" style={{ margin: '0 auto', marginBottom: 8 }} />
                      <Typography variant="body1" fontWeight="500">
                        Click to upload main image
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        SVG, PNG, JPG or GIF (max. 5MB)
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                      <img 
                        src={mainImagePreview} 
                        alt="Preview" 
                        style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} 
                      />
                      <IconButton
                        onClick={removeMainImage}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'rgba(255,255,255,0.9)',
                          boxShadow: 2,
                          '&:hover': { bgcolor: 'error.main', color: 'white' }
                        }}
                        size="small"
                      >
                        <X size={18} />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Secondary Images Upload */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" fontWeight="600">
                      Secondary Images
                    </Typography>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      multiple
                      ref={secondaryImageInputRef}
                      onChange={handleSecondaryImageUpload}
                    />
                    <Button 
                      startIcon={<UploadCloud size={16} />}
                      onClick={() => secondaryImageInputRef.current?.click()}
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Upload Images
                    </Button>
                  </Box>

                  {secondaryImagePreviews.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'white', borderRadius: 2, border: '1px dashed', borderColor: 'grey.300' }}>
                      <ImageIcon size={24} color="#9e9e9e" style={{ margin: '0 auto', marginBottom: 8 }} />
                      <Typography variant="body2" color="text.secondary">
                        No secondary images uploaded.
                      </Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={2}>
                      {secondaryImagePreviews.map((preview, index) => (
                        <Grid item xs={6} sm={4} key={index}>
                          <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, paddingTop: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                            <img 
                              src={preview} 
                              alt={`Secondary ${index}`} 
                              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                            <IconButton
                              onClick={() => handleRemoveSecondaryImage(index)}
                              sx={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                bgcolor: 'rgba(255,255,255,0.9)',
                                p: 0.5,
                                '&:hover': { bgcolor: 'error.main', color: 'white' }
                              }}
                              size="small"
                            >
                              <X size={14} />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="error"
                  startIcon={<Save size={20} />}
                  sx={{ 
                    px: 6, 
                    py: 1.5, 
                    borderRadius: 2, 
                    textTransform: 'none', 
                    fontSize: '1.05rem',
                    boxShadow: 2
                  }}
                >
                  Publish Portfolio Item
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
