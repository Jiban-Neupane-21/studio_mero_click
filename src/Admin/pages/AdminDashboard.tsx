import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid,
  IconButton,
  Divider
} from '@mui/material';
import { Save, UploadCloud, X } from 'lucide-react';
import { Home } from '../../types/home.type';
import { homeItemsApi } from '../../api/homeItems';
import { uploadImage } from '../../utils/uploadImage';

export default function AdminDashboard() {
  const [formData, setFormData] = useState<Partial<Home>>({
    imageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImageFile(file);
      setFormData(prev => ({ ...prev, imageUrl: file.name }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url = formData.imageUrl;
      if (imageFile) {
        url = await uploadImage(imageFile);
      }

      await homeItemsApi.createHomeItem({ image_url: url || '' });
      alert('Successfully saved home banner!');
      removeImage();
    } catch (error: any) {
      alert('Error saving: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Manage Home
        </Typography>
      </Box>

      <Paper 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3, 
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          borderTop: '4px solid',
          borderColor: 'error.main',
          bgcolor: 'white',
          maxWidth: '800px'
        }} 
        elevation={0}
      >
        <Typography variant="h5" fontWeight="bold" mb={1} color="error.main">
          Upload Homepage Image
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Add a new high-quality image to be displayed on the homepage slider or hero section.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            
            <Grid item xs={12}>
              <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={3} color="error.dark">
                  Image Upload
                </Typography>

                <Box mb={2}>
                  <Typography variant="body2" fontWeight="600" mb={1}>Select Image *</Typography>
                  <input 
                    type="file" 
                    accept="image/*" 
                    hidden 
                    ref={imageInputRef} 
                    onChange={handleImageUpload} 
                    required={!formData.imageUrl}
                  />
                  
                  {!imagePreview ? (
                    <Box
                      onClick={() => imageInputRef.current?.click()}
                      sx={{
                        border: '2px dashed', borderColor: 'grey.400', borderRadius: 2, p: 6, textAlign: 'center', cursor: 'pointer', bgcolor: 'white', transition: 'all 0.2s',
                        '&:hover': { borderColor: 'error.main', bgcolor: '#fff9f9' }
                      }}
                    >
                      <UploadCloud size={48} color="#d32f2f" style={{ margin: '0 auto', marginBottom: 12 }} />
                      <Typography variant="body1" fontWeight="500">Click or drag image to upload</Typography>
                      <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                        High resolution recommended (e.g., 1920x1080)
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                      <img src={imagePreview} alt="Home Preview" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block' }} />
                      <IconButton 
                        onClick={removeImage} 
                        sx={{ 
                          position: 'absolute', 
                          top: 12, 
                          right: 12, 
                          bgcolor: 'rgba(255,255,255,0.9)', 
                          boxShadow: 2, 
                          '&:hover': { bgcolor: 'error.main', color: 'white' } 
                        }} 
                        size="small"
                      >
                        <X size={20} />
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
                  startIcon={<Save size={20} />}
                  sx={{ px: 6, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1.05rem', boxShadow: 2 }}
                >
                  {loading ? 'Saving...' : 'Save Banner Image'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
