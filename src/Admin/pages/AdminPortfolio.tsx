import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  MenuItem, 
  Grid,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  CircularProgress
} from '@mui/material';
import { Save, UploadCloud, Image as ImageIcon, X, Plus, Edit, Trash2 } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PortfolioItem } from '../../types/portfolio.type';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { portfolioApi } from '../../api/portfolio';
import { uploadImage } from '../../utils/uploadImage';

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog & Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

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
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [secondaryFiles, setSecondaryFiles] = useState<File[]>([]);

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const secondaryImageInputRef = useRef<HTMLInputElement>(null);

  // Fetch data
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await portfolioApi.getPortfolioItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch portfolio items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenNew = () => {
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      title: '', category: 'Wedding', imageUrl: '', specLabel: '',
      author: '', description: '', secondaryImages: []
    });
    setMainImagePreview(null);
    setMainImageFile(null);
    setSecondaryImagePreviews([]);
    setSecondaryFiles([]);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      imageUrl: item.image_url || item.imageUrl, // Handle DB snake_case vs TS camelCase mismatch if present
      specLabel: item.spec_label || item.specLabel || '',
      author: item.author || '',
      description: item.description || '',
      secondaryImages: item.secondary_images || item.secondaryImages || []
    });
    setMainImagePreview(item.image_url || item.imageUrl || null);
    setSecondaryImagePreviews(item.secondary_images || item.secondaryImages || []);
    setMainImageFile(null);
    setSecondaryFiles([]);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this portfolio item?")) {
      try {
        await portfolioApi.deletePortfolioItem(id);
        fetchItems();
      } catch (error) {
        console.error("Failed to delete item", error);
        alert("Failed to delete");
      }
    }
  };

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
      setMainImageFile(file);
      setFormData(prev => ({ ...prev, imageUrl: file.name }));
    }
  };

  const removeMainImage = () => {
    setMainImagePreview(null);
    setMainImageFile(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (mainImageInputRef.current) mainImageInputRef.current.value = '';
  };

  const handleSecondaryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      const newNames = files.map(file => file.name);
      
      setSecondaryFiles(prev => [...prev, ...files]);
      setSecondaryImagePreviews(prev => [...prev, ...newPreviews]);
      setFormData(prev => ({
        ...prev,
        secondaryImages: [...(prev.secondaryImages || []), ...newNames]
      }));
    }
  };

  const handleRemoveSecondaryImage = (index: number) => {
    setSecondaryFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      let mainUrl = formData.imageUrl;
      if (mainImageFile) {
        mainUrl = await uploadImage(mainImageFile);
      }

      let finalSecondaryImages = formData.secondaryImages || [];
      if (secondaryFiles.length > 0) {
        const newUrls = await Promise.all(secondaryFiles.map(file => uploadImage(file)));
        finalSecondaryImages = [
          ...finalSecondaryImages.filter(url => url.startsWith('http')), // Keep old uploaded ones
          ...newUrls
        ];
      }

      const payload = {
        title: formData.title,
        category: formData.category,
        image_url: mainUrl || '',
        spec_label: formData.specLabel,
        author: formData.author,
        description: formData.description,
        secondary_images: finalSecondaryImages,
      };

      if (editMode && currentId) {
        await portfolioApi.updatePortfolioItem(currentId, payload);
      } else {
        await portfolioApi.createPortfolioItem(payload);
      }
      
      setIsDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      alert('Error saving: ' + error.message);
    } finally {
      setFormLoading(false);
    }
  };

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
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<Plus />} 
          onClick={handleOpenNew}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Create New
        </Button>
      </Box>

      {/* DATA TABLE */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <CircularProgress color="error" />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  No portfolio items found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Avatar variant="rounded" src={item.image_url || item.imageUrl} sx={{ width: 56, height: 56 }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.author || '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenEdit(item)}>
                      <Edit size={18} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* CREATE / EDIT DIALOG */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid', borderColor: 'grey.200' }}>
          {editMode ? 'Edit Portfolio Entry' : 'Create New Portfolio Entry'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 4 }}>
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
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={() => setIsDialogOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="error"
              disabled={formLoading}
              startIcon={formLoading ? <CircularProgress size={20} color="inherit" /> : <Save size={20} />}
            >
              {formLoading ? 'Saving...' : (editMode ? 'Update Item' : 'Create Item')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
