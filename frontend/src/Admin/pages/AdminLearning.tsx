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
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { LearningArticle } from '../../types';
import { learningArticlesApi } from '../../api/learningArticles';
import { uploadImage } from '../../utils/uploadImage';

export default function AdminLearning() {
  const [items, setItems] = useState<LearningArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog & Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<LearningArticle>>({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    author: '',
    published_at: new Date().toISOString().split('T')[0],
    read_time: '',
    image_url: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Fetch data
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await learningArticlesApi.getLearningArticles();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch learning articles", error);
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
      title: '', category: '', excerpt: '', content: '', author: '',
      published_at: new Date().toISOString().split('T')[0], read_time: '', image_url: ''
    });
    setImagePreview(null);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: LearningArticle) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      excerpt: item.excerpt || '',
      content: item.content || '',
      author: item.author || '',
      published_at: item.published_at || (item as any).publishedAt || new Date().toISOString().split('T')[0],
      read_time: item.read_time || (item as any).readTime || '',
      image_url: item.image_url || item.imageUrl || '',
    });
    setImagePreview(item.image_url || item.imageUrl || null);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await learningArticlesApi.deleteLearningArticle(id);
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

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImageFile(file);
      setFormData(prev => ({ ...prev, image_url: file.name }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData(prev => ({ ...prev, image_url: '' }));
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      let url = formData.image_url;
      if (imageFile) {
        url = await uploadImage(imageFile);
      }

      const payload = {
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        published_at: formData.published_at,
        read_time: formData.read_time,
        image_url: url || '',
        image: url || '', // keeping backwards compatibility if old code relied on image
      };

      if (editMode && currentId) {
        await learningArticlesApi.updateLearningArticle(currentId, payload);
      } else {
        await learningArticlesApi.createLearningArticle(payload);
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
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Manage Learning Articles
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<Plus />} 
          onClick={handleOpenNew}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Create New Article
        </Button>
      </Box>

      {/* DATA TABLE */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell>Cover Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published At</TableCell>
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
                  No learning articles found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Avatar variant="rounded" src={item.image_url || item.imageUrl || item.image} sx={{ width: 80, height: 45 }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{new Date(item.published_at || (item as any).publishedAt).toLocaleDateString()}</TableCell>
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
          {editMode ? 'Edit Article' : 'Create New Article'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
              
              {/* Left Column: Basic Info & MS Word Editor */}
              <Grid item xs={12} lg={8}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Article Title"
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
                        placeholder="e.g. Photography Tips"
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    color="error"
                    placeholder="A short, engaging summary of the article..."
                    multiline
                    rows={2}
                  />

                  <Box>
                    <Typography variant="subtitle2" fontWeight="600" mb={1} color="text.primary">
                      Article Content (Design your text here)
                    </Typography>
                    <Box 
                      sx={{ 
                        '.quill': { bgcolor: 'white', borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'grey.300' },
                        '.ql-toolbar': { borderBottom: '1px solid', borderColor: 'grey.300', bgcolor: '#fafafa', borderTop: 'none', borderLeft: 'none', borderRight: 'none' },
                        '.ql-container': { minHeight: '350px', fontSize: '1.05rem', fontFamily: 'inherit', border: 'none' },
                        '.ql-editor': { minHeight: '350px' }
                      }}
                    >
                      <ReactQuill 
                        theme="snow" 
                        value={formData.content} 
                        onChange={handleContentChange}
                        modules={modules}
                        placeholder="Write your amazing article here..."
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Right Column: Meta Info & Image Upload */}
              <Grid item xs={12} lg={4}>
                <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={3} color="error.dark">
                    Publishing Details
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                    <TextField
                      fullWidth
                      label="Author Name"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      color="error"
                      required
                    />
                    
                    <TextField
                      fullWidth
                      label="Read Time"
                      name="read_time"
                      value={formData.read_time}
                      onChange={handleChange}
                      color="error"
                      placeholder="e.g. 5 min read"
                    />

                    <TextField
                      fullWidth
                      label="Publish Date"
                      name="published_at"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.published_at}
                      onChange={handleChange}
                      color="error"
                      required
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="subtitle1" fontWeight="bold" mb={2} color="error.dark">
                    Cover Image
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    This image will appear at the top of the article and in list views.
                  </Typography>

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                  />

                  {!imagePreview ? (
                    <Box
                      onClick={() => imageInputRef.current?.click()}
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
                        Click to upload cover image
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        High-res recommended (max. 5MB)
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ width: '100%', height: 'auto', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} 
                      />
                      <IconButton
                        onClick={removeImage}
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
              {formLoading ? 'Saving...' : (editMode ? 'Update Article' : 'Publish Article')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
