/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
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
  CircularProgress
} from '@mui/material';
import { Save, Plus, Edit, Trash2 } from 'lucide-react';
import { FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { TutorialVideo } from '../../types';
import { tutorialVideosApi } from '../../api/tutorialVideos';

export default function AdminTutorials() {
  const [items, setItems] = useState<TutorialVideo[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog & Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<TutorialVideo>>({
    title: '',
    category: '',
    description: '',
    youtube_id: '',
    facebook_link: '',
    tiktok_link: '',
    duration: '0:00',
    upload_date: new Date().toISOString().split('T')[0],
    published_at: new Date().toISOString().split('T')[0],
  });

  // Fetch data
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await tutorialVideosApi.getTutorialVideos();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch tutorial videos", error);
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
      facebook_link: '', tiktok_link: '', 
      duration: '0:00', 
      upload_date: new Date().toISOString().split('T')[0], 
      published_at: new Date().toISOString().split('T')[0]
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: TutorialVideo) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || '',
      youtube_id: item.youtube_id || (item as any).youtubeId || '',
      facebook_link: item.facebook_link || (item as any).facebookLink || '',
      tiktok_link: item.tiktok_link || (item as any).tiktokLink || '',
      duration: item.duration || '0:00',
      upload_date: item.upload_date || (item as any).uploadDate || new Date().toISOString().split('T')[0],
      published_at: item.published_at || (item as any).publishedAt || new Date().toISOString().split('T')[0],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this tutorial?")) {
      try {
        await tutorialVideosApi.deleteTutorialVideo(id);
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

  const extractYoutubeId = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        youtube_id: extractYoutubeId(formData.youtube_id || ''),
        facebook_link: formData.facebook_link || '',
        tiktok_link: formData.tiktok_link || '',
        duration: formData.duration || '0:00',
        upload_date: formData.upload_date || new Date().toISOString().split('T')[0],
        published_at: formData.published_at || new Date().toISOString().split('T')[0],
      };

      if (editMode && currentId) {
        await tutorialVideosApi.updateTutorialVideo(currentId, payload);
      } else {
        await tutorialVideosApi.createTutorialVideo(payload);
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
          Manage Tutorials
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<Plus />} 
          onClick={handleOpenNew}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Add New Tutorial
        </Button>
      </Box>

      {/* DATA TABLE */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell>Tutorial Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Links</TableCell>
              <TableCell>Duration</TableCell>
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
                  No tutorials found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {item.youtube_id && <FaYoutube size={20} color="#FF0000" />}
                      {item.facebook_link && <FaFacebook size={20} color="#1877F2" />}
                      {item.tiktok_link && <FaTiktok size={20} color="#000000" />}
                    </Box>
                  </TableCell>
                  <TableCell>{item.duration}</TableCell>
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
          {editMode ? 'Edit Tutorial Entry' : 'Add New Tutorial Entry'}
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
                        label="Tutorial Title"
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
                        placeholder="e.g. Photography, Editing"
                      />
                    </Grid>
                  </Grid>

                  <Box>
                    <Typography variant="subtitle2" fontWeight="600" mb={1} color="text.primary">
                      Tutorial Description (Design your text here)
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
                        placeholder="Write a description for the tutorial..."
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
                        label="YouTube Video Link"
                        name="youtube_id"
                        value={formData.youtube_id}
                        onChange={handleChange}
                        color="error"
                        placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        helperText="Paste the full YouTube video URL or ID"
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

                </Box>
              </Grid>

              {/* Right Column: Meta Info */}
              <Grid item xs={12} lg={5}>
                <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={3} color="error.dark">
                    Tutorial Metadata
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      fullWidth
                      label="Duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      color="error"
                      placeholder="e.g. 10:45"
                    />
                    
                    <TextField
                      fullWidth
                      label="Upload Date (Original)"
                      name="upload_date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.upload_date}
                      onChange={handleChange}
                      color="error"
                    />

                    <TextField
                      fullWidth
                      label="Published At (Platform)"
                      name="published_at"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.published_at}
                      onChange={handleChange}
                      color="error"
                    />
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
              {formLoading ? 'Saving...' : (editMode ? 'Update Tutorial' : 'Add Tutorial')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
