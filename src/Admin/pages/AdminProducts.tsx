/* eslint-disable */
// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  IconButton,
  Divider,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  MenuItem
} from '@mui/material';
import { Save, UploadCloud, X, Plus, Trash2, Image as ImageIcon, Edit } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Product, ProductImage, ProductSpecification, ProductFeature, ProductFAQ } from '../../types/featureProduct.type';
import { productsApi } from '../../api/products';
import { uploadImage } from '../../utils/uploadImage';
import { services } from '../../data/product.data';

export default function AdminProducts() {
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    category: '',
    about: '',
    description: '',
    oldPrice: 0,
    newPrice: 0,
    discountRate: 0,
    thumbnail: '',
    images: [],
    additionalInfo: [],
    features: [],
    faq: [],
    isFeatured: true,
    isAvailable: true,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<{ id: string; url: string }[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<{ id: string; file: File }[]>([]);
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<any[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoadingItems(true);
      const data = await productsApi.getProducts();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await productsApi.deleteProduct(id);
      fetchItems();
    } catch (error: any) {
      alert("Delete failed: " + error.message);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    
    setFormData({
      title: item.title,
      category: item.category || '',
      about: item.about,
      description: item.description,
      oldPrice: item.old_price,
      newPrice: item.new_price,
      discountRate: item.discount_rate,
      thumbnail: item.thumbnail,
      isFeatured: item.is_featured,
      isAvailable: item.is_available,
      images: item.product_images?.map((i: any) => ({ id: i.id, url: i.image_url || i.url, alt: i.alt_text || i.alt })) || [],
      additionalInfo: item.product_specifications?.map((s: any) => ({ id: s.id, key: s.spec_key, value: s.spec_value })) || [],
      features: item.product_features?.map((f: any) => ({ id: f.id, title: f.title, description: f.description })) || [],
      faq: item.product_faqs?.map((f: any) => ({ id: f.id, question: f.question, answer: f.answer })) || [],
    });

    setThumbnailPreview(item.thumbnail || null);
    
    if (item.product_images) {
      setGalleryPreviews(item.product_images.map((i: any) => ({ id: i.id, url: i.image_url || i.url })));
    } else {
      setGalleryPreviews([]);
    }
    
    setThumbnailFile(null);
    setGalleryFiles([]);
    
    setIsDialogOpen(true);
  };

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleDescriptionChange = (content: string) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  // ----- File Upload Handlers -----
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
      setThumbnailFile(file);
      setFormData(prev => ({ ...prev, thumbnail: file.name }));
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages: ProductImage[] = files.map(file => ({
        id: Date.now().toString() + Math.random().toString(), // temporary ID
        url: file.name, // would be real URL after upload
        alt: ''
      }));
      
      const newPreviews = files.map((file, i) => ({
        id: newImages[i].id,
        url: URL.createObjectURL(file)
      }));

      const newFiles = files.map((file, i) => ({
        id: newImages[i].id,
        file
      }));

      setGalleryPreviews(prev => [...prev, ...newPreviews]);
      setGalleryFiles(prev => [...prev, ...newFiles]);
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...newImages]
      }));
    }
  };

  const removeGalleryImage = (idToRemove: string) => {
    setGalleryPreviews(prev => prev.filter(p => p.id !== idToRemove));
    setGalleryFiles(prev => prev.filter(f => f.id !== idToRemove));
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter(img => img.id !== idToRemove)
    }));
  };

  const updateGalleryAlt = (id: string, altText: string) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).map(img => img.id === id ? { ...img, alt: altText } : img)
    }));
  };

  // ----- Dynamic Array Handlers -----
  const handleAddArrayItem = (key: 'additionalInfo' | 'features' | 'faq', defaultItem: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: [...(prev[key] as any[] || []), { id: Date.now().toString(), ...defaultItem }]
    }));
  };

  const handleRemoveArrayItem = (key: 'additionalInfo' | 'features' | 'faq', index: number) => {
    setFormData(prev => {
      const newArray = [...(prev[key] as any[] || [])];
      newArray.splice(index, 1);
      return { ...prev, [key]: newArray };
    });
  };

  const handleArrayItemChange = (key: 'additionalInfo' | 'features' | 'faq', index: number, field: string, value: string) => {
    setFormData(prev => {
      const newArray = [...(prev[key] as any[] || [])];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [key]: newArray };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let thumbnailUrl = formData.thumbnail;
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile);
      }

      let finalImages = formData.images || [];
      if (galleryFiles.length > 0) {
        finalImages = await Promise.all(
          finalImages.map(async (img) => {
            const fileObj = galleryFiles.find(gf => gf.id === img.id);
            if (fileObj) {
              const url = await uploadImage(fileObj.file);
              return { ...img, url };
            }
            return img;
          })
        );
      }

      const productPayload = {
        title: formData.title,
        category: formData.category,
        about: formData.about,
        description: formData.description,
        old_price: formData.oldPrice,
        new_price: formData.newPrice,
        discount_rate: formData.discountRate,
        thumbnail: thumbnailUrl || '',
        is_featured: formData.isFeatured,
        is_available: formData.isAvailable,
        images: finalImages,
        specifications: formData.additionalInfo,
        features: formData.features,
        faqs: formData.faq,
      };

      if (editingId) {
        await productsApi.updateProduct(editingId, productPayload as any);
        alert('Successfully updated product!');
      } else {
        await productsApi.createProduct(productPayload as any);
        alert('Successfully saved product!');
      }
      
      // Reset form
      setFormData({
        title: '', category: '', about: '', description: '', oldPrice: 0, newPrice: 0,
        discountRate: 0, thumbnail: '', images: [], additionalInfo: [],
        features: [], faq: [], isFeatured: false, isAvailable: true
      });
      setThumbnailPreview(null);
      setThumbnailFile(null);
      setGalleryPreviews([]);
      setGalleryPreviews([]);
      setGalleryFiles([]);
      setEditingId(null);
      setIsDialogOpen(false);
      fetchItems();
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
      ['blockquote'],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Manage Products
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<Plus />} 
          onClick={() => {
            setFormData({
              title: '', category: '', about: '', description: '', oldPrice: 0, newPrice: 0,
              discountRate: 0, thumbnail: '', images: [], additionalInfo: [],
              features: [], faq: [], isFeatured: true, isAvailable: true
            });
            setThumbnailPreview(null);
            setThumbnailFile(null);
            setGalleryPreviews([]);
            setGalleryFiles([]);
            setEditingId(null);
            setIsDialogOpen(true);
          }}
        >
          Create New Product
        </Button>
      </Box>

      {/* Data Table */}
      <Paper sx={{ width: '100%', mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingItems ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <CircularProgress color="error" />
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No products found. Click "Create New Product" to add one.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      {item.thumbnail ? (
                        <Box
                          component="img"
                          src={item.thumbnail}
                          sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                        />
                      ) : (
                        <Box sx={{ width: 60, height: 60, bgcolor: 'grey.200', borderRadius: 1 }} />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body2" fontWeight="600">{item.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{item.category || '-'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="error.main" fontWeight="bold">Rs. {item.new_price}</Typography>
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

      <Dialog 
        open={isDialogOpen} 
        onClose={() => !loading && setIsDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="error.main">
            {editingId ? 'Edit Product' : 'Create New Product'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editingId ? 'Update the details for this product package.' : 'Fill out the details below to add a new product package.'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: { xs: 2, md: 4 } }}>
          <form onSubmit={handleSubmit} id="product-form">
            <Grid container spacing={4}>
            
            {/* Left Column: Basic Info & MS Word Editor */}
            <Grid item xs={12} lg={7}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                <TextField
                  fullWidth
                  label="Product Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  color="error"
                />

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
                  <MenuItem value="">Select a category</MenuItem>
                  {services.map((s) => (
                    <MenuItem key={s.id} value={s.title}>{s.title}</MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="Short About Text"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  required
                  color="error"
                  placeholder="A brief catchy summary of this product..."
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Old Price"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleNumberChange}
                      color="error"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="New Price"
                      name="newPrice"
                      value={formData.newPrice}
                      onChange={handleNumberChange}
                      required
                      color="error"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Discount Rate (%)"
                      name="discountRate"
                      value={formData.discountRate}
                      onChange={handleNumberChange}
                      color="error"
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', gap: 4, mt: 1 }}>
                  <FormControlLabel
                    control={<Switch color="error" checked={formData.isFeatured} onChange={handleSwitchChange} name="isFeatured" />}
                    label="Featured Product"
                  />
                  <FormControlLabel
                    control={<Switch color="error" checked={formData.isAvailable} onChange={handleSwitchChange} name="isAvailable" />}
                    label="Available"
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight="600" mb={1} color="text.primary">
                    Full Description (Design your text here)
                  </Typography>
                  <Box 
                    sx={{ 
                      '.quill': { bgcolor: 'white', borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'grey.300' },
                      '.ql-toolbar': { borderBottom: '1px solid', borderColor: 'grey.300', bgcolor: '#fafafa', borderTop: 'none', borderLeft: 'none', borderRight: 'none' },
                      '.ql-container': { minHeight: '200px', fontSize: '1rem', fontFamily: 'inherit', border: 'none' },
                      '.ql-editor': { minHeight: '200px' }
                    }}
                  >
                    <ReactQuill 
                      theme="snow" 
                      value={formData.description} 
                      onChange={handleDescriptionChange}
                      modules={modules}
                      placeholder="Write a beautiful detailed description..."
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* Features Section */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="error.dark">Product Features</Typography>
                    <Button startIcon={<Plus size={16} />} onClick={() => handleAddArrayItem('features', { title: '', description: '' })} variant="outlined" color="error" size="small" sx={{ borderRadius: 2 }}>
                      Add Feature
                    </Button>
                  </Box>
                  {formData.features?.length === 0 && <Typography variant="body2" color="text.secondary">No features added yet.</Typography>}
                  {formData.features?.map((feature, index) => (
                    <Card key={feature.id} variant="outlined" sx={{ mb: 2, borderColor: 'grey.300', borderRadius: 2 }}>
                      <CardContent sx={{ pb: '16px !important', position: 'relative' }}>
                        <IconButton size="small" color="error" onClick={() => handleRemoveArrayItem('features', index)} sx={{ position: 'absolute', top: 8, right: 8 }}>
                          <Trash2 size={18} />
                        </IconButton>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={11}>
                            <TextField fullWidth size="small" label="Feature Title" value={feature.title} onChange={(e) => handleArrayItemChange('features', index, 'title', e.target.value)} color="error" sx={{ mb: 2 }} />
                            <TextField fullWidth size="small" label="Feature Description" value={feature.description} onChange={(e) => handleArrayItemChange('features', index, 'description', e.target.value)} color="error" multiline rows={2} />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Box>

                {/* Specifications Section */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="error.dark">Specifications</Typography>
                    <Button startIcon={<Plus size={16} />} onClick={() => handleAddArrayItem('additionalInfo', { key: '', value: '' })} variant="outlined" color="error" size="small" sx={{ borderRadius: 2 }}>
                      Add Spec
                    </Button>
                  </Box>
                  {formData.additionalInfo?.map((info, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <TextField fullWidth size="small" label="Key (e.g. Dimensions)" value={info.key} onChange={(e) => handleArrayItemChange('additionalInfo', index, 'key', e.target.value)} color="error" />
                      <TextField fullWidth size="small" label="Value (e.g. 10x15 inches)" value={info.value} onChange={(e) => handleArrayItemChange('additionalInfo', index, 'value', e.target.value)} color="error" />
                      <IconButton color="error" onClick={() => handleRemoveArrayItem('additionalInfo', index)}>
                        <Trash2 size={20} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>

                {/* FAQ Section */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="error.dark">FAQs</Typography>
                    <Button startIcon={<Plus size={16} />} onClick={() => handleAddArrayItem('faq', { question: '', answer: '' })} variant="outlined" color="error" size="small" sx={{ borderRadius: 2 }}>
                      Add FAQ
                    </Button>
                  </Box>
                  {formData.faq?.map((faq, index) => (
                    <Card key={faq.id} variant="outlined" sx={{ mb: 2, borderColor: 'grey.300', borderRadius: 2 }}>
                      <CardContent sx={{ pb: '16px !important', position: 'relative' }}>
                        <IconButton size="small" color="error" onClick={() => handleRemoveArrayItem('faq', index)} sx={{ position: 'absolute', top: 8, right: 8 }}>
                          <Trash2 size={18} />
                        </IconButton>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={11}>
                            <TextField fullWidth size="small" label="Question" value={faq.question} onChange={(e) => handleArrayItemChange('faq', index, 'question', e.target.value)} color="error" sx={{ mb: 2 }} />
                            <TextField fullWidth size="small" label="Answer" value={faq.answer} onChange={(e) => handleArrayItemChange('faq', index, 'answer', e.target.value)} color="error" multiline rows={2} />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Box>

              </Box>
            </Grid>

            {/* Right Column: Image Uploads */}
            <Grid item xs={12} lg={5}>
              <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={3} color="error.dark">
                  Media Uploads
                </Typography>

                {/* Thumbnail Upload */}
                <Box mb={4}>
                  <Typography variant="body2" fontWeight="600" mb={1}>Thumbnail Image *</Typography>
                  <input type="file" accept="image/*" hidden ref={thumbnailInputRef} onChange={handleThumbnailUpload} />
                  {!thumbnailPreview ? (
                    <Box
                      onClick={() => thumbnailInputRef.current?.click()}
                      sx={{
                        border: '2px dashed', borderColor: 'grey.400', borderRadius: 2, p: 3, textAlign: 'center', cursor: 'pointer', bgcolor: 'white', transition: 'all 0.2s',
                        '&:hover': { borderColor: 'error.main', bgcolor: '#fff9f9' }
                      }}
                    >
                      <UploadCloud size={32} color="#d32f2f" style={{ margin: '0 auto', marginBottom: 8 }} />
                      <Typography variant="body2" fontWeight="500">Upload Thumbnail</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                      <img src={thumbnailPreview} alt="Thumbnail" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                      <IconButton onClick={() => { setThumbnailPreview(null); setFormData(p => ({...p, thumbnail: ''})); }} sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'error.main', color: 'white' } }} size="small">
                        <X size={16} />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Gallery Images Upload */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" fontWeight="600">Gallery Images</Typography>
                    <input type="file" accept="image/*" hidden multiple ref={galleryInputRef} onChange={handleGalleryUpload} />
                    <Button startIcon={<UploadCloud size={16} />} onClick={() => galleryInputRef.current?.click()} variant="outlined" color="error" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>
                      Add Images
                    </Button>
                  </Box>

                  {galleryPreviews.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'white', borderRadius: 2, border: '1px dashed', borderColor: 'grey.300' }}>
                      <ImageIcon size={24} color="#9e9e9e" style={{ margin: '0 auto', marginBottom: 8 }} />
                      <Typography variant="body2" color="text.secondary">No gallery images uploaded.</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {galleryPreviews.map((preview) => {
                        const imgData = formData.images?.find(i => i.id === preview.id);
                        return (
                          <Card key={preview.id} variant="outlined" sx={{ display: 'flex', borderColor: 'grey.300', borderRadius: 2, p: 1 }}>
                            <Box sx={{ position: 'relative', width: 80, height: 80, flexShrink: 0, borderRadius: 1, overflow: 'hidden' }}>
                              <img src={preview.url} alt="Gallery item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                            <Box sx={{ ml: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <TextField 
                                size="small" 
                                fullWidth 
                                label="Alt Text (Optional)" 
                                value={imgData?.alt || ''} 
                                onChange={(e) => updateGalleryAlt(preview.id, e.target.value)}
                                color="error"
                                variant="standard"
                              />
                            </Box>
                            <IconButton onClick={() => removeGalleryImage(preview.id)} color="error" sx={{ alignSelf: 'center', ml: 1 }}>
                              <Trash2 size={20} />
                            </IconButton>
                          </Card>
                        );
                      })}
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
                  form="product-form"
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
                  {loading ? 'Saving...' : (editingId ? 'Update Product' : 'Save Product')}
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
