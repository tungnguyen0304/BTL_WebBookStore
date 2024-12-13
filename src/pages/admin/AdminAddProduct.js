import {
  Grid,
  FormControl,
  TextField,
  Autocomplete,
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import Meta from "../../components/Meta";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    categoryID: '',
    image: '',
    price: '',
    current_qty: '',
    sold_qty: '',
    authorID: '',
    manufacturerID: '',
    description: '',
  });
  
  const [errors, setErrors] = useState({});
  const [authorsList, setAuthorsList] = useState([]);
  const [manufacturersList, setManufacturersList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [confirmSaving, setConfirmSaving] = useState(false);
  const [confirmGoingBack, setConfirmGoingBack] = useState(false);
  const navigate = useNavigate();

  // Fetch options for product details
  useEffect(() => {
    axios.get('http://localhost/BTL_Web/src/api/product-info-option.php')
      .then((response) => {
        const data = response.data;
        setAuthorsList(JSON.parse(data.authorsList));
        setManufacturersList(JSON.parse(data.manufacturersList));
        setCategoriesList(JSON.parse(data.categoriesList));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost/BTL_Web/src/api/admin/product-add.php', product);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Meta title="Thêm sản phẩm mới" />

      <Box sx={{ py: 4, px: 2 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            Thêm sản phẩm mới
          </Typography>

          <form>
            <Grid container spacing={3}>
              {/* Tên sản phẩm */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tên sản phẩm"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>

              {/* Thể loại */}
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={categoriesList}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) =>
                    setProduct({ ...product, categoryID: newValue ? newValue.ID : '' })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Thể loại" fullWidth error={!!errors.categoryID} />
                  )}
                />
              </Grid>

              {/* Link hình ảnh */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Link hình ảnh"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.image}
                  helperText={errors.image}
                />
              </Grid>

              {/* Giá */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Giá"
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price}
                />
              </Grid>

              {/* Số lượng */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Số lượng"
                  name="current_qty"
                  type="number"
                  value={product.current_qty}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.current_qty}
                  helperText={errors.current_qty}
                />
              </Grid>

              {/* Số lượng đã bán */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Số lượng đã bán"
                  name="sold_qty"
                  type="number"
                  value={product.sold_qty}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.sold_qty}
                  helperText={errors.sold_qty}
                />
              </Grid>

              {/* Tác giả */}
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={authorsList}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) =>
                    setProduct({ ...product, authorID: newValue ? newValue.ID : '' })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tác giả" fullWidth error={!!errors.authorID} />
                  )}
                />
              </Grid>

              {/* NXB/NSX */}
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={manufacturersList}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) =>
                    setProduct({ ...product, manufacturerID: newValue ? newValue.ID : '' })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="NXB/NSX" fullWidth error={!!errors.manufacturerID} />
                  )}
                />
              </Grid>

              {/* Mô tả sản phẩm */}
              <Grid item xs={12}>
                <TextField
                  label="Mô tả sản phẩm"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>

              {/* Nút hành động */}
              <Grid item xs={12} display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setConfirmSaving(true)}
                >
                  Lưu
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setConfirmGoingBack(true)}
                >
                  Thoát
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmSaving}
        setOpen={setConfirmSaving}
        content="Bạn chắc chắn muốn tạo sản phẩm?"
        confirm={handleSubmit}
      />

      <ConfirmDialog
        isOpen={confirmGoingBack}
        setOpen={setConfirmGoingBack}
        content="Bạn chắc chắn muốn thoát? Tất cả mọi thay đổi sẽ bị hủy bỏ."
        confirm={() => navigate(-1)}
      />
    </>
  );
};

export default AdminAddProduct;
