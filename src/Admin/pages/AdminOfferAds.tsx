import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  IconButton,
  Divider,
  InputAdornment
} from '@mui/material';
import { Save, UploadCloud, X, Palette } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { OfferAd } from '../../types';
import { offerAdsApi } from '../../api/offerAds';
import { uploadImage } from '../../utils/uploadImage';

export default function AdminOfferAds() {
  const [formData, setFormData] = useState<Partial<OfferAd>>({
    title: '',
    discount: '',
    description: '',
    terms: '',
    targetCategory: '',
    image: '',
    accentColor: '#d32f2f', // Default to theme red
    badge: '',
    validUntil: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
    setLoading(true);
    try {
      let imageUrl = formData.image;
      
      // If there's a new file, upload it first
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await offerAdsApi.createOfferAd({
        title: formData.title,
        discount: formData.discount,
        description: formData.description,
        terms: formData.terms,
        target_category: formData.targetCategory,
        image: imageUrl || '',
        badge: formData.badge,
        valid_until: formData.validUntil,
      });
      alert('Successfully saved offer ad!');
      
      // Reset form on success (optional but good UX)
      setFormData({
        title: '', discount: '', description: '', terms: '',
        targetCategory: '', image: '', badge: '', validUntil: ''
      });
      setImageFile(null);
      setImagePreview(null);
      if (imageInputRef.current) imageInputRef.current.value = '';
    } catch (error: any) {
      alert('Error saving: ' + error.message);
    } finally {
      setLoading(false);
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
          Create New Offer Ad
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Design promotional banners, seasonal discounts, and special offers.
        </Typography>

        <form onSubmit={handleSubmit}>
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
                      name="targetCategory"
                      value={formData.targetCategory}
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
                    name="accentColor"
                    type="color"
                    value={formData.accentColor}
                    onChange={handleChange}
                    color="error"
                    sx={{
                      '& input': { padding: '4px', height: '40px', cursor: 'pointer' }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Palette size={20} color={formData.accentColor} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Valid Until (Expiry Date)"
                    name="validUntil"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.validUntil}
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
                  
                  <input type="file" accept="image/*" hidden ref={imageInputRef} onChange={handleImageUpload} required={!formData.image} />
                  
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

            {/* Submit Button */}
            <Grid item xs={12}>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  size="large"
                  disabled={loading}
                  startIcon={<Save />}
                  sx={{
                    px: 4,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  {loading ? 'Saving...' : 'Save Offer Ad'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
