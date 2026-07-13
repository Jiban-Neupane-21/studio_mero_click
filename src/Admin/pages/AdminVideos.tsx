import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  IconButton,
  Divider
} from '@mui/material';
import { Save, UploadCloud, X } from 'lucide-react';
import { FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { VideoItem } from '../../types';

export default function AdminVideos() {
  const [formData, setFormData] = useState<Partial<VideoItem>>({
    title: '',
    category: '',
    description: '',
    youtubeId: '',
    facebookLink: '',
    tiktokLink: '',
    duration: '',
    uploadDate: '',
    views: '',
    thumbnail: '',
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (content: string) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
      setFormData(prev => ({ ...prev, thumbnail: file.name }));
    }
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setFormData(prev => ({ ...prev, thumbnail: '' }));
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Video Item:', formData);
    // TODO: Send to backend / Supabase
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
          Manage Video Portfolio
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
          Add New Video
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Upload thumbnail and embed links from YouTube, Facebook, or TikTok.
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
                      label="Video Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      color="error"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      color="error"
                      placeholder="e.g. Wedding, Event"
                    />
                  </Grid>
                </Grid>

                <Box>
                  <Typography variant="subtitle2" fontWeight="600" mb={1} color="text.primary">
                    Video Description (Design your text here)
                  </Typography>
                  <Box 
                    sx={{ 
                      '.quill': { bgcolor: 'white', borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'grey.300' },
                      '.ql-toolbar': { borderBottom: '1px solid', borderColor: 'grey.300', bgcolor: '#fafafa', borderTop: 'none', borderLeft: 'none', borderRight: 'none' },
                      '.ql-container': { minHeight: '150px', fontSize: '1rem', fontFamily: 'inherit', border: 'none' },
                      '.ql-editor': { minHeight: '150px' }
                    }}
                  >
                    <ReactQuill 
                      theme="snow" 
                      value={formData.description} 
                      onChange={handleDescriptionChange}
                      modules={modules}
                      placeholder="Write a description for the video..."
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" fontWeight="bold" color="error.dark">
                  Embed Links
                </Typography>

                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={1}>
                    <FaYoutube size={32} color="#FF0000" />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      label="YouTube Video ID"
                      name="youtubeId"
                      value={formData.youtubeId}
                      onChange={handleChange}
                      color="error"
                      placeholder="e.g. dQw4w9WgXcQ"
                      helperText="Only the ID part of the URL (after v=)"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={1}>
                    <FaFacebook size={32} color="#1877F2" />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      label="Facebook Video Link"
                      name="facebookLink"
                      value={formData.facebookLink}
                      onChange={handleChange}
                      color="error"
                      placeholder="e.g. https://www.facebook.com/watch/?v=..."
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={1}>
                    <FaTiktok size={32} color="#000000" />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      label="TikTok Video Link"
                      name="tiktokLink"
                      value={formData.tiktokLink}
                      onChange={handleChange}
                      color="error"
                      placeholder="e.g. https://www.tiktok.com/@user/video/..."
                    />
                  </Grid>
                </Grid>

              </Box>
            </Grid>

            {/* Right Column: Meta Info & Thumbnail Upload */}
            <Grid item xs={12} lg={5}>
              <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={3} color="error.dark">
                  Metadata & Thumbnail
                </Typography>

                <Grid container spacing={2} mb={4}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      color="error"
                      placeholder="e.g. 3:45"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Upload Date"
                      name="uploadDate"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.uploadDate}
                      onChange={handleChange}
                      color="error"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Views"
                      name="views"
                      value={formData.views}
                      onChange={handleChange}
                      color="error"
                      placeholder="e.g. 1.2K"
                    />
                  </Grid>
                </Grid>

                {/* Thumbnail Upload */}
                <Box>
                  <Typography variant="body2" fontWeight="600" mb={1}>Custom Thumbnail</Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    Required if the video embedded doesn't provide a good thumbnail automatically.
                  </Typography>
                  
                  <input type="file" accept="image/*" hidden ref={thumbnailInputRef} onChange={handleThumbnailUpload} />
                  
                  {!thumbnailPreview ? (
                    <Box
                      onClick={() => thumbnailInputRef.current?.click()}
                      sx={{
                        border: '2px dashed', borderColor: 'grey.400', borderRadius: 2, p: 4, textAlign: 'center', cursor: 'pointer', bgcolor: 'white', transition: 'all 0.2s',
                        '&:hover': { borderColor: 'error.main', bgcolor: '#fff9f9' }
                      }}
                    >
                      <UploadCloud size={40} color="#d32f2f" style={{ margin: '0 auto', marginBottom: 8 }} />
                      <Typography variant="body1" fontWeight="500">Upload Video Thumbnail</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                      <img src={thumbnailPreview} alt="Thumbnail" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                      <IconButton onClick={removeThumbnail} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.9)', boxShadow: 2, '&:hover': { bgcolor: 'error.main', color: 'white' } }} size="small">
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
                  startIcon={<Save size={20} />}
                  sx={{ px: 6, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1.05rem', boxShadow: 2 }}
                >
                  Save Video
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
