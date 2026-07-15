import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material';
import { Save, UploadCloud, X, Plus, Trash2, Edit } from 'lucide-react';
import { useEffect } from 'react';
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

  const [items, setItems] = useState<Home[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoadingItems(true);
      const data = await homeItemsApi.getHomeItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this home image?")) return;
    try {
      await homeItemsApi.deleteHomeItem(id);
      fetchItems();
    } catch (error: any) {
      alert("Delete failed: " + error.message);
    }
  };

  const handleEdit = (item: Home) => {
    setEditingId(item.id);
    setFormData({ imageUrl: item.imageUrl });
    setImagePreview(item.imageUrl);
    setIsDialogOpen(true);
  };

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

      if (editingId) {
        await homeItemsApi.updateHomeItem(editingId, { image_url: url || '' });
        alert('Successfully updated home banner!');
      } else {
        await homeItemsApi.createHomeItem({ image_url: url || '' });
        alert('Successfully saved home banner!');
      }

      removeImage();
      setEditingId(null);
      setIsDialogOpen(false);
      fetchItems();
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
        <Button
          variant="contained"
          color="error"
          startIcon={<Plus />}
          onClick={() => {
            removeImage();
            setEditingId(null);
            setIsDialogOpen(true);
          }}
        >
          Create New
        </Button>
      </Box>

      {/* Data Table */}
      <Paper sx={{ width: '100%', mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="items table">
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingItems ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    <CircularProgress color="error" />
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    No home banner images found. Click "Create New" to add one.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      {item.imageUrl ? (
                        <Box
                          component="img"
                          src={item.imageUrl}
                          sx={{ width: 120, height: 60, objectFit: 'cover', borderRadius: 1 }}
                        />
                      ) : (
                        <Box sx={{ width: 120, height: 60, bgcolor: 'grey.200', borderRadius: 1 }} />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body2">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</Typography>
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

      {/* Form Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => !loading && setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="error.main">
            {editingId ? 'Edit Homepage Image' : 'Upload Homepage Image'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editingId ? 'Update this banner image.' : 'Add a new high-quality image to be displayed on the homepage slider or hero section.'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit} id="home-form">
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="home-form"
                    variant="contained"
                    color="error"
                    size="large"
                    disabled={loading}
                    startIcon={<Save size={20} />}
                    sx={{ px: 6, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1.05rem', boxShadow: 2 }}
                  >
                    {loading ? 'Saving...' : (editingId ? 'Update Banner' : 'Save Banner Image')}
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
