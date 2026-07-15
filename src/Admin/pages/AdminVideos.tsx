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
import { Save, UploadCloud, X, Plus, Edit, Trash2 } from 'lucide-react';
import { FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { VideoItem } from '../../types';
import { videoItemsApi } from '../../api/videoItems';
import { uploadImage } from '../../utils/uploadImage';

export default function AdminVideos() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog & Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<VideoItem>>({
    title: '',
    category: '',
    description: '',
    youtube_id: '',
    facebook_link: '',
    tiktok_link: '',
    duration: '',
    upload_date: '',
    views: '',
    thumbnail: '',
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Fetch data
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await videoItemsApi.getVideoItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch video items", error);
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
      title: '', category: '', description: '', youtube_id: '',
      facebook_link: '', tiktok_link: '', duration: '', upload_date: '',
      views: '', thumbnail: ''
    });
    setThumbnailPreview(null);
    setThumbnailFile(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: VideoItem) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || '',
      youtube_id: item.youtube_id || (item as any).youtubeId || '', // Handle camelCase legacy if exists
      facebook_link: item.facebook_link || (item as any).facebookLink || '',
      tiktok_link: item.tiktok_link || (item as any).tiktokLink || '',
      duration: item.duration || '',
      upload_date: item.upload_date || (item as any).uploadDate || '',
      views: item.views || '',
      thumbnail: item.thumbnail || '',
    });
    setThumbnailPreview(item.thumbnail || null);
    setThumbnailFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this video item?")) {
      try {
        await videoItemsApi.deleteVideoItem(id);
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

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
      setThumbnailFile(file);
      setFormData(prev => ({ ...prev, thumbnail: file.name }));
    }
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setThumbnailFile(null);
    setFormData(prev => ({ ...prev, thumbnail: '' }));
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      let thumbnailUrl = formData.thumbnail;
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile);
      }

      const payload = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        youtube_id: formData.youtube_id || '',
        facebook_link: formData.facebook_link || '',
        tiktok_link: formData.tiktok_link || '',
        duration: formData.duration || '',
        upload_date: formData.upload_date || '',
        views: formData.views || '',
        thumbnail: thumbnailUrl || '',
      };

      if (editMode && currentId) {
        await videoItemsApi.updateVideoItem(currentId, payload);
      } else {
        await videoItemsApi.createVideoItem(payload);
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
          Manage Video Portfolio
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<Plus />} 
          onClick={handleOpenNew}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Add New Video
        </Button>
      </Box>

      {/* DATA TABLE */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Video Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Links</TableCell>
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
                  No videos found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Avatar variant="rounded" src={item.thumbnail} sx={{ width: 80, height: 45 }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {item.youtube_id && <FaYoutube size={20} color="#FF0000" />}
                      {item.facebook_link && <FaFacebook size={20} color="#1877F2" />}
                      {item.tiktok_link && <FaTiktok size={20} color="#000000" />}
                    </Box>
                  </TableCell>
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
          {editMode ? 'Edit Video Entry' : 'Add New Video Entry'}
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
                        name="youtube_id"
                        value={formData.youtube_id}
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
                        name="facebook_link"
                        value={formData.facebook_link}
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
                        name="tiktok_link"
                        value={formData.tiktok_link}
                        onChange={handleChange}
                        color="error"
                        placeholder="e.g. https://www.tiktok.com/@user/video/..."
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold" color="error.dark">
                    Video Metadata (Optional)
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        color="error"
                        placeholder="e.g. 5:30"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Upload Date"
                        name="upload_date"
                        value={formData.upload_date}
                        onChange={handleChange}
                        color="error"
                        placeholder="e.g. 2024-05-12"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Views"
                        name="views"
                        value={formData.views}
                        onChange={handleChange}
                        color="error"
                        placeholder="e.g. 1.2M"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Right Column: Image Uploads */}
              <Grid item xs={12} lg={5}>
                <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2} color="error.dark">
                    Video Thumbnail
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Upload a high-quality thumbnail. This will be used in grid views before the video is played.
                  </Typography>

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailUpload}
                  />

                  {!thumbnailPreview ? (
                    <Box
                      onClick={() => thumbnailInputRef.current?.click()}
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
                        Click to upload thumbnail
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        SVG, PNG, JPG or GIF (max. 5MB)
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                      <img 
                        src={thumbnailPreview} 
                        alt="Preview" 
                        style={{ width: '100%', height: 'auto', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} 
                      />
                      <IconButton
                        onClick={removeThumbnail}
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
              {formLoading ? 'Saving...' : (editMode ? 'Update Video' : 'Add Video')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
