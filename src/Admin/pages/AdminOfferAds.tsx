/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  IconButton,
  Divider,
  InputAdornment,
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
import { Save, UploadCloud, X, Palette, Plus, Edit, Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { OfferAd } from '../../types';
import { offerAdsApi } from '../../api/offerAds';
import { uploadImage } from '../../utils/uploadImage';

export default function AdminOfferAds() {
  const [items, setItems] = useState<OfferAd[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog & Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<OfferAd>>({
    title: '',
    discount: '',
    description: '',
    terms: '',
    target_category: '',
    image: '',
    accent_color: '#d32f2f', // Default to theme red
    badge: '',
    valid_until: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Fetch data
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await offerAdsApi.getOfferAds();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch offer ads", error);
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
      title: '', discount: '', description: '', terms: '',
      target_category: '', image: '', accent_color: '#d32f2f', badge: '', valid_until: ''
    });
    setImagePreview(null);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: OfferAd) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      discount: item.discount || '',
      description: item.description || '',
      terms: item.terms || '',
      target_category: item.target_category || (item as any).targetCategory || '',
      image: item.image || '',
      accent_color: item.accent_color || (item as any).accentColor || '#d32f2f',
      badge: item.badge || '',
      valid_until: item.valid_until || (item as any).validUntil || '',
    });
    setImagePreview(item.image || null);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this offer ad?")) {
      try {
        await offerAdsApi.deleteOfferAd(id);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImageFile(file);
      setFormData(prev => ({ ...prev, image: file.name }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData(prev => ({ ...prev, image: '' }));
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      let imageUrl = formData.image;
      
      // If there's a new file, upload it first
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        title: formData.title,
        discount: formData.discount,
        description: formData.description,
        terms: formData.terms,
        target_category: formData.target_category,
        image: imageUrl || '',
        badge: formData.badge,
        valid_until: formData.valid_until,
        accent_color: formData.accent_color || '#d32f2f',
      };

      if (editMode && currentId) {
        await offerAdsApi.updateOfferAd(currentId, payload);
      } else {
        await offerAdsApi.createOfferAd(payload);
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
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Manage Promotional Ads
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<Plus />} 
          onClick={handleOpenNew}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Create New Offer Ad
        </Button>
      </Box>

      {/* DATA TABLE */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell>Banner Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Target Category</TableCell>
              <TableCell>Valid Until</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <CircularProgress color="error" />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No promotional ads found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Avatar variant="rounded" src={item.image} sx={{ width: 100, height: 45 }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {item.title}
                    {item.badge && (
                      <Box component="span" sx={{ ml: 1, px: 1, py: 0.25, bgcolor: item.accent_color || '#d32f2f', color: 'white', borderRadius: 1, fontSize: '0.7rem' }}>
                        {item.badge}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>{item.discount}</TableCell>
                  <TableCell>{item.target_category || (item as any).targetCategory}</TableCell>
                  <TableCell>{item.valid_until || (item as any).validUntil || '-'}</TableCell>
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
          {editMode ? 'Edit Promotional Ad' : 'Create New Promotional Ad'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
              
              {/* Left Column: Basic Info & MS Word Editor */}
              <Grid item xs={12} lg={7}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Ad Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        color="error"
                        placeholder="e.g. Summer Wedding Special"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Badge Text (Optional)"
                        name="badge"
                        value={formData.badge}
                        onChange={handleChange}
                        color="error"
                        placeholder="e.g. LIMITED TIME"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Discount Value"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        required
                        color="error"
                        placeholder="e.g. 20% OFF or $500"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Target Category"
                        name="target_category"
                        value={formData.target_category}
                        onChange={handleChange}
                        required
                        color="error"
                        placeholder="e.g. Wedding Photography"
                      />
                    </Grid>
                  </Grid>

                  <Box>
                    <Typography variant="subtitle2" fontWeight="600" mb={1} color="text.primary">
                      Ad Description
                    </Typography>
                    <Box 
                      sx={{ 
                        '.quill': { bgcolor: 'white', borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'grey.300' },
                        '.ql-toolbar': { borderBottom: '1px solid', borderColor: 'grey.300', bgcolor: '#fafafa', borderTop: 'none', borderLeft: 'none', borderRight: 'none' },
                        '.ql-container': { minHeight: '120px', fontSize: '1rem', fontFamily: 'inherit', border: 'none' },
                        '.ql-editor': { minHeight: '120px' }
                      }}
                    >
                      <ReactQuill 
                        theme="snow" 
                        value={formData.description} 
                        onChange={handleDescriptionChange}
                        modules={modules}
                        placeholder="Describe the offer details..."
                      />
                    </Box>
                  </Box>

                  <TextField
                    fullWidth
                    label="Terms & Conditions (Optional)"
                    name="terms"
                    value={formData.terms}
                    onChange={handleChange}
                    color="error"
                    placeholder="e.g. Valid for new bookings only. Offer expires..."
                    multiline
                    rows={3}
                    helperText="Fine print that applies to this specific offer."
                  />

                </Box>
              </Grid>

              {/* Right Column: Styling, Date & Image Upload */}
              <Grid item xs={12} lg={5}>
                <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={3} color="error.dark">
                    Display Settings
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                    <TextField
                      fullWidth
                      label="Accent Color"
                      name="accent_color"
                      type="color"
                      value={formData.accent_color}
                      onChange={handleChange}
                      color="error"
                      sx={{
                        '& input': { padding: '4px', height: '40px', cursor: 'pointer' }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Palette size={20} color={formData.accent_color || '#000'} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Valid Until (Expiry Date)"
                      name="valid_until"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.valid_until}
                      onChange={handleChange}
                      color="error"
                      helperText="Leave blank if the offer never expires"
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Ad Banner Image Upload */}
                  <Box>
                    <Typography variant="body2" fontWeight="600" mb={1}>Ad Banner Image *</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                      The background image or banner creative for this ad.
                    </Typography>
                    
                    <input type="file" accept="image/*" hidden ref={imageInputRef} onChange={handleImageUpload} />
                    
                    {!imagePreview ? (
                      <Box
                        onClick={() => imageInputRef.current?.click()}
                        sx={{
                          border: '2px dashed', borderColor: 'grey.400', borderRadius: 2, p: 4, textAlign: 'center', cursor: 'pointer', bgcolor: 'white', transition: 'all 0.2s',
                          '&:hover': { borderColor: 'error.main', bgcolor: '#fff9f9' }
                        }}
                      >
                        <UploadCloud size={40} color="#d32f2f" style={{ margin: '0 auto', marginBottom: 8 }} />
                        <Typography variant="body1" fontWeight="500">Upload Banner Creative</Typography>
                      </Box>
                    ) : (
                      <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                        <img src={imagePreview} alt="Ad Banner" style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                        <IconButton onClick={removeImage} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.9)', boxShadow: 2, '&:hover': { bgcolor: 'error.main', color: 'white' } }} size="small">
                          <X size={18} />
                        </IconButton>
                      </Box>
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
              {formLoading ? 'Saving...' : (editMode ? 'Update Offer Ad' : 'Save Offer Ad')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
