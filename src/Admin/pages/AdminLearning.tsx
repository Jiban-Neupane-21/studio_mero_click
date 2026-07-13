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
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { LearningArticle } from '../../types';
import { learningArticlesApi } from '../../api/learningArticles';
import { uploadImage } from '../../utils/uploadImage';

export default function AdminLearning() {
  const [formData, setFormData] = useState<Partial<LearningArticle>>({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    author: '',
    publishedAt: '',
    readTime: '',
    imageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
      setFormData(prev => ({ ...prev, imageUrl: file.name, image: file.name }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData(prev => ({ ...prev, imageUrl: '', image: '' }));
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

      await learningArticlesApi.createLearningArticle({
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        published_at: formData.publishedAt,
        read_time: formData.readTime,
        image_url: url || '',
        image: url || '',
      });
      alert('Successfully saved learning article!');
      
      // Reset form
      setFormData({
        title: '', category: '', excerpt: '', content: '', author: '',
        publishedAt: '', readTime: '', imageUrl: ''
      });
      setImagePreview(null);
      setImageFile(null);
      if (imageInputRef.current) imageInputRef.current.value = '';
    } catch (error: any) {
      alert('Error saving: ' + error.message);
    } finally {
      setLoading(false);
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
          Create New Article
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Publish educational content, guides, or blog posts.
        </Typography>

        <form onSubmit={handleSubmit}>
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
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    color="error"
                    placeholder="e.g. 5 min read"
                  />

                  <TextField
                    fullWidth
                    label="Publish Date"
                    name="publishedAt"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.publishedAt}
                    onChange={handleChange}
                    color="error"
                    required
                  />
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Article Cover Image Upload */}
                <Box>
                  <Typography variant="body2" fontWeight="600" mb={1}>Article Cover Image</Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    This image will appear at the top of the article and in blog feeds.
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
                      <Typography variant="body1" fontWeight="500">Upload Cover Image</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                      <img src={imagePreview} alt="Cover" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
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
                  startIcon={<Save size={20} />}
                  sx={{ px: 6, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1.05rem', boxShadow: 2 }}
                >
                  {loading ? 'Saving...' : 'Save Article'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
