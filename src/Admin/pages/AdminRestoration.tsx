/* eslint-disable */
// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Grid, IconButton, Divider,
  Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, CircularProgress
} from '@mui/material';
import { Save, UploadCloud, X, Plus, Trash2, Edit } from 'lucide-react';
import { RestorationImage } from '../../types/restoration.type';
import { restorationApi } from '../../api/restoration';
import { uploadImage } from '../../utils/uploadImage';

export default function AdminRestoration() {
  const [items, setItems] = useState<RestorationImage[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  
  const [formData, setFormData] = useState<Partial<RestorationImage>>({
    title: '',
    description: '',
    before_image_url: '',
    after_image_url: ''
  });

  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    try {
      setLoadingItems(true);
      const data = await restorationApi.getRestorations();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch restorations:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBeforeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBeforePreview(URL.createObjectURL(file));
      setBeforeFile(file);
      setFormData(prev => ({ ...prev, before_image_url: file.name }));
    }
  };

  const handleAfterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAfterPreview(URL.createObjectURL(file));
      setAfterFile(file);
      setFormData(prev => ({ ...prev, after_image_url: file.name }));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await restorationApi.deleteRestoration(id);
      fetchItems();
    } catch (error: any) {
      alert("Delete failed: " + error.message);
    }
  };

  const handleEdit = (item: RestorationImage) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      before_image_url: item.before_image_url,
      after_image_url: item.after_image_url
    });
    setBeforePreview(item.before_image_url);
    setAfterPreview(item.after_image_url);
    setBeforeFile(null);
    setAfterFile(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalBeforeUrl = formData.before_image_url;
      if (beforeFile) {
        finalBeforeUrl = await uploadImage(beforeFile);
      }
      
      let finalAfterUrl = formData.after_image_url;
      if (afterFile) {
        finalAfterUrl = await uploadImage(afterFile);
      }

      if (!finalBeforeUrl || !finalAfterUrl) {
        throw new Error("Both Before and After images are required");
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        before_image_url: finalBeforeUrl,
        after_image_url: finalAfterUrl
      };

      if (editingId) {
        await restorationApi.updateRestoration(editingId, payload);
        alert('Successfully updated restoration image!');
      } else {
        await restorationApi.createRestoration(payload);
        alert('Successfully added restoration image!');
      }
      
      setIsDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      alert('Error saving: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setFormData({ title: '', description: '', before_image_url: '', after_image_url: '' });
    setBeforePreview(null);
    setAfterPreview(null);
    setBeforeFile(null);
    setAfterFile(null);
    setEditingId(null);
    setIsDialogOpen(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Image Restorations
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<Plus />} 
          onClick={openCreateDialog}
        >
          Add Restoration
        </Button>
      </Box>

      {/* Data Table */}
      <Paper sx={{ width: '100%', mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="restorations table">
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell>Before</TableCell>
                <TableCell>After</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingItems ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    <CircularProgress color="error" />
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    No items found. Click "Add Restoration" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Box component="img" src={item.before_image_url} sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }} />
                    </TableCell>
                    <TableCell>
                      <Box component="img" src={item.after_image_url} sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body2" fontWeight="600">{item.title}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEdit(item)} sx={{ mr: 1 }}>
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
      </Paper>

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onClose={() => !loading && setIsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="error.main">
            {editingId ? 'Edit Restoration' : 'Add Restoration Image'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: { xs: 2, md: 4 } }}>
          <form onSubmit={handleSubmit} id="restoration-form">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} required color="error" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} color="error" multiline rows={3} />
              </Grid>

              {/* Before Image */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600" mb={1}>Before Image (Old/Blurred) *</Typography>
                <input type="file" accept="image/*" hidden ref={beforeInputRef} onChange={handleBeforeUpload} />
                {!beforePreview ? (
                  <Box onClick={() => beforeInputRef.current?.click()} sx={{ border: '2px dashed', borderColor: 'grey.400', borderRadius: 2, p: 3, textAlign: 'center', cursor: 'pointer', '&:hover': { borderColor: 'error.main' } }}>
                    <UploadCloud size={32} color="#d32f2f" style={{ margin: '0 auto', marginBottom: 8 }} />
                    <Typography variant="body2" fontWeight="500">Upload Before Image</Typography>
                  </Box>
                ) : (
                  <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                    <img src={beforePreview} alt="Before" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                    <IconButton onClick={() => { setBeforePreview(null); setFormData(p => ({...p, before_image_url: ''})); }} sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.9)' }} size="small">
                      <X size={16} />
                    </IconButton>
                  </Box>
                )}
              </Grid>

              {/* After Image */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600" mb={1}>After Image (New/Clean) *</Typography>
                <input type="file" accept="image/*" hidden ref={afterInputRef} onChange={handleAfterUpload} />
                {!afterPreview ? (
                  <Box onClick={() => afterInputRef.current?.click()} sx={{ border: '2px dashed', borderColor: 'grey.400', borderRadius: 2, p: 3, textAlign: 'center', cursor: 'pointer', '&:hover': { borderColor: 'error.main' } }}>
                    <UploadCloud size={32} color="#d32f2f" style={{ margin: '0 auto', marginBottom: 8 }} />
                    <Typography variant="body2" fontWeight="500">Upload After Image</Typography>
                  </Box>
                ) : (
                  <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                    <img src={afterPreview} alt="After" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                    <IconButton onClick={() => { setAfterPreview(null); setFormData(p => ({...p, after_image_url: ''})); }} sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.9)' }} size="small">
                      <X size={16} />
                    </IconButton>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button onClick={() => setIsDialogOpen(false)} disabled={loading}>Cancel</Button>
                  <Button type="submit" form="restoration-form" variant="contained" color="error" disabled={loading} startIcon={<Save />}>
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
