/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Grid,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  Save,
  UploadCloud,
  Image as ImageIcon,
  X,
  Plus,
  Edit,
  Trash2,
  GripVertical,
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PORTFOLIO_CATEGORIES, PortfolioItem } from '../../types/portfolio.type';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { portfolioApi } from '../../api/portfolio';
import { uploadImage } from '../../utils/uploadImage';

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog & Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [reordering, setReordering] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...items];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);

    const updates = reordered.map((item, idx) => ({
      id: item.id,
      sort_order: idx,
    }));

    setItems(reordered);
    setReordering(true);
    try {
      await portfolioApi.reorderPortfolioItems(updates);
    } catch (err: any) {
      console.error("Reorder failed:", err);
      fetchItems();
    } finally {
      setReordering(false);
    }
  };

  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'Wedding',
    imageUrl: '',
    specLabel: '',
    author: '',
    description: '',
    secondaryImages: []
  });

  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<{ id: string; url: string; isExisting: boolean; file?: File }[]>([]);

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const secondaryImageInputRef = useRef<HTMLInputElement>(null);

  // Fetch data
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await portfolioApi.getPortfolioItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch portfolio items", error);
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
      title: '', category: 'Wedding', imageUrl: '', specLabel: '',
      author: '', description: '', secondaryImages: []
    });
    setMainImagePreview(null);
    setMainImageFile(null);
    setSecondaryImages([]);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      imageUrl: item.image_url || item.imageUrl, // Handle DB snake_case vs TS camelCase mismatch if present
      specLabel: item.spec_label || item.specLabel || '',
      author: item.author || '',
      description: item.description || '',
      secondaryImages: item.secondary_images || item.secondaryImages || []
    });
    setMainImagePreview(item.image_url || item.imageUrl || null);
    const existingSec = (item.secondary_images || item.secondaryImages || []).map((url: string) => ({
      id: `existing_${Date.now()}_${Math.random()}`,
      url,
      isExisting: true,
    }));
    setSecondaryImages(existingSec);
    setMainImageFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this portfolio item?")) {
      try {
        await portfolioApi.deletePortfolioItem(id);
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

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMainImagePreview(url);
      setMainImageFile(file);
      setFormData(prev => ({ ...prev, imageUrl: file.name }));
    }
  };

  const removeMainImage = () => {
    setMainImagePreview(null);
    setMainImageFile(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (mainImageInputRef.current) mainImageInputRef.current.value = '';
  };

  const handleSecondaryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newItems = files.map(file => ({
        id: `new_${Date.now()}_${Math.random()}`,
        url: URL.createObjectURL(file),
        isExisting: false,
        file,
      }));
      setSecondaryImages(prev => [...prev, ...newItems]);
    }
  };

  const handleRemoveSecondaryImage = (id: string) => {
    setSecondaryImages(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      let mainUrl = formData.imageUrl;
      if (mainImageFile) {
        mainUrl = await uploadImage(mainImageFile);
      }

      const finalSecondaryImages: string[] = [];
      for (const item of secondaryImages) {
        if (item.isExisting) {
          finalSecondaryImages.push(item.url);
        } else if (item.file) {
          const url = await uploadImage(item.file);
          finalSecondaryImages.push(url);
        }
      }

      const payload = {
        title: formData.title,
        category: formData.category,
        image_url: mainUrl || '',
        spec_label: formData.specLabel,
        author: formData.author,
        description: formData.description,
        secondary_images: finalSecondaryImages,
      };

      if (editMode && currentId) {
        await portfolioApi.updatePortfolioItem(currentId, payload);
      } else {
        await portfolioApi.createPortfolioItem(payload);
      }

      setIsDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      alert('Error saving: ' + error.message);
    } finally {
      setFormLoading(false);
    }
  };

  function SortableRow({ item, children, isDragging }: { item: any; children: React.ReactNode; isDragging?: boolean }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging: isSortDragging,
    } = useSortable({ id: item.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging || isSortDragging ? 0.4 : 1,
      position: isSortDragging ? 'relative' as const : undefined,
      zIndex: isSortDragging ? 999 : undefined,
    };

    return (
      <Box
        ref={setNodeRef}
        style={style}
        sx={{
          display: 'grid',
          gridTemplateColumns: '40px 80px 1.5fr 1fr 1fr 120px',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: isSortDragging ? 'action.hover' : 'transparent',
          '&:hover': { bgcolor: 'action.hover' },
          '&:last-child': { borderBottom: 'none' },
        }}
      >
        <Box
          {...attributes}
          {...listeners}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'grab',
            color: 'text.secondary',
            '&:hover': { color: 'error.main' },
            touchAction: 'none',
            py: 1,
          }}
        >
          <GripVertical size={18} />
        </Box>
        {children}
      </Box>
    );
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote'],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Manage Portfolio
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<Plus />}
          onClick={handleOpenNew}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Create New
        </Button>
      </Box>

      {/* DATA TABLE */}
      <Paper sx={{ width: '100%', mb: 4, borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'grey.200' }}>
        {/* Header Row */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '40px 80px 1.5fr 1fr 1fr 120px',
            alignItems: 'center',
            bgcolor: 'grey.50',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ py: 1.5 }} />
          <Box sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary' }}>Image</Box>
          <Box sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary' }}>Title</Box>
          <Box sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary' }}>Category</Box>
          <Box sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary' }}>Author</Box>
          <Box sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary', textAlign: 'right' }}>Actions</Box>
        </Box>

        {/* Body */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress color="error" />
          </Box>
        ) : items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
            No portfolio items found.
          </Box>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <SortableRow key={item.id} item={item}>
                  <Box sx={{ px: 1, py: 1.5 }}>
                    <Avatar variant="rounded" src={item.image_url || item.imageUrl} sx={{ width: 56, height: 56 }} />
                  </Box>
                  <Box sx={{ px: 1, py: 1.5 }}>
                    <Typography variant="body2" fontWeight="600">{item.title}</Typography>
                  </Box>
                  <Box sx={{ px: 1, py: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">{item.category}</Typography>
                  </Box>
                  <Box sx={{ px: 1, py: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">{item.author || '-'}</Typography>
                  </Box>
                  <Box sx={{ px: 1, py: 1.5, textAlign: 'right' }}>
                    <IconButton color="primary" onClick={() => handleOpenEdit(item)} sx={{ mr: 0.5 }}>
                      <Edit size={18} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </SortableRow>
              ))}
            </SortableContext>
          </DndContext>
        )}
      </Paper>

      {/* CREATE / EDIT DIALOG */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid', borderColor: 'grey.200' }}>
          {editMode ? 'Edit Portfolio Entry' : 'Create New Portfolio Entry'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
              {/* Left Column: Basic Info & MS Word Editor */}
              <Grid item xs={12} lg={7}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="error"
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        color="error"
                      >
                        {PORTFOLIO_CATEGORIES.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Author (Optional)"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        color="error"
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Spec Label (Optional)"
                    name="specLabel"
                    value={formData.specLabel}
                    onChange={handleChange}
                    placeholder="e.g. 4K Resolution, Drone Shot"
                    color="error"
                  />

                  <Box>
                    <Typography variant="subtitle2" fontWeight="600" mb={1} color="text.primary">
                      Description (Design your text here)
                    </Typography>
                    <Box
                      sx={{
                        '.quill': {
                          bgcolor: 'white',
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: '1px solid',
                          borderColor: 'grey.300',
                        },
                        '.ql-toolbar': {
                          borderBottom: '1px solid',
                          borderColor: 'grey.300',
                          bgcolor: '#fafafa',
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                        },
                        '.ql-container': {
                          minHeight: '250px',
                          fontSize: '1rem',
                          fontFamily: 'inherit',
                          border: 'none'
                        },
                        '.ql-editor': {
                          minHeight: '250px',
                          wordBreak: 'normal',
                          overflowWrap: 'break-word',
                          whiteSpace: 'pre-wrap'
                        }
                      }}
                    >
                      <ReactQuill
                        theme="snow"
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        modules={modules}
                        placeholder="Write a compelling, beautiful description using the tools above..."
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Right Column: Image Uploads */}
              <Grid item xs={12} lg={5}>
                <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2} color="error.dark">
                    Media Gallery Upload
                  </Typography>

                  {/* Main Image Upload */}
                  <Box mb={4}>
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      Main Cover Image *
                    </Typography>

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      ref={mainImageInputRef}
                      onChange={handleMainImageUpload}
                    />

                    {!mainImagePreview ? (
                      <Box
                        onClick={() => mainImageInputRef.current?.click()}
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
                          Click to upload main image
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          SVG, PNG, JPG or GIF (max. 5MB)
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                        <img
                          src={mainImagePreview}
                          alt="Preview"
                          style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
                        />
                        <IconButton
                          onClick={removeMainImage}
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

                  <Divider sx={{ my: 3 }} />

                  {/* Secondary Images Upload */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" fontWeight="600">
                        Secondary Images
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        multiple
                        ref={secondaryImageInputRef}
                        onChange={handleSecondaryImageUpload}
                      />
                      <Button
                        startIcon={<UploadCloud size={16} />}
                        onClick={() => secondaryImageInputRef.current?.click()}
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ borderRadius: 2, textTransform: 'none' }}
                      >
                        Upload Images
                      </Button>
                    </Box>

                    {secondaryImages.length === 0 ? (
                      <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'white', borderRadius: 2, border: '1px dashed', borderColor: 'grey.300' }}>
                        <ImageIcon size={24} color="#9e9e9e" style={{ margin: '0 auto', marginBottom: 8 }} />
                        <Typography variant="body2" color="text.secondary">
                          No secondary images uploaded.
                        </Typography>
                      </Box>
                    ) : (
                      <Grid container spacing={2}>
                        {secondaryImages.map((item) => (
                          <Grid item xs={6} sm={4} key={item.id}>
                            <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                              <img
                                src={item.url}
                                alt="Secondary"
                                style={{ width: '100%', display: 'block' }}
                              />
                              <IconButton
                                onClick={() => handleRemoveSecondaryImage(item.id)}
                                sx={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  bgcolor: 'rgba(255,255,255,0.9)',
                                  p: 0.5,
                                  '&:hover': { bgcolor: 'error.main', color: 'white' }
                                }}
                                size="small"
                              >
                                <X size={14} />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
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
              {formLoading ? 'Saving...' : (editMode ? 'Update Item' : 'Create Item')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
