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
import React, { useState, useEffect } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import Meta from '../../components/Meta';
import axios from 'axios';

const AdminEditProduct = () => {
  const navigate = useNavigate();

  // State lưu trữ dữ liệu
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
  const [categoriesList, setCategoriesList] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);
  const [manufacturersList, setManufacturersList] = useState([]);

  // Xác nhận Dialog
  const [confirmSaving, setConfirmSaving] = useState(false);
  const [confirmGoingBack, setConfirmGoingBack] = useState(false);

  // Fetch dữ liệu ban đầu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const optionsResponse = await axios.get(
          'http://localhost/BTL_Web/src/api/product-info-option.php'
        );
        const productResponse = await axios.get(
          'http://localhost/BTL_Web/src/api/product-info.php',
          { params: { id: new URLSearchParams(window.location.search).get('id') } }
        );

        setCategoriesList(JSON.parse(optionsResponse.data.categoriesList));
        setAuthorsList(JSON.parse(optionsResponse.data.authorsList));
        setManufacturersList(JSON.parse(optionsResponse.data.manufacturersList));
        setProduct(productResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/error/404');
      }
    };

    fetchData();
  }, [navigate]);

  // Xử lý thay đổi giá trị
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error
  };

  // Submit dữ liệu
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost/BTL_Web/src/api/admin/product-edit.php', product);
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <>
      <Meta title="Chỉnh sửa sản phẩm" />
      <Box sx={{ py: 4, px: 2 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            Chỉnh sửa sản phẩm
          </Typography>
          <form>
            <Grid container spacing={3}>
              {/* Tên sản phẩm */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tên sản phẩm"
                  name="name"
                  value={product.name || ''}
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
                  value={categoriesList.find((c) => c.ID === product.categoryID) || null}
                  onChange={(e, newValue) =>
                    setProduct({ ...product, categoryID: newValue ? newValue.ID : '' })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Thể loại" error={!!errors.categoryID} />
                  )}
                />
              </Grid>

              {/* Link hình ảnh */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Link hình ảnh"
                  name="image"
                  value={product.image || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              {/* Giá */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Giá"
                  name="price"
                  type="number"
                  value={product.price || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              {/* Số lượng */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Số lượng"
                  name="current_qty"
                  type="number"
                  value={product.current_qty || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              {/* Số lượng đã bán */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Số lượng đã bán"
                  name="sold_qty"
                  type="number"
                  value={product.sold_qty || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              {/* Tác giả */}
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={authorsList}
                  getOptionLabel={(option) => option.name}
                  value={authorsList.find((a) => a.ID === product.authorID) || null}
                  onChange={(e, newValue) =>
                    setProduct({ ...product, authorID: newValue ? newValue.ID : '' })
                  }
                  renderInput={(params) => <TextField {...params} label="Tác giả" />}
                />
              </Grid>

              {/* NXB/NSX */}
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={manufacturersList}
                  getOptionLabel={(option) => option.name}
                  value={manufacturersList.find((m) => m.ID === product.manufacturerID) || null}
                  onChange={(e, newValue) =>
                    setProduct({ ...product, manufacturerID: newValue ? newValue.ID : '' })
                  }
                  renderInput={(params) => <TextField {...params} label="NXB/NSX" />}
                />
              </Grid>

              {/* Mô tả */}
              <Grid item xs={12}>
                <TextField
                  label="Mô tả sản phẩm"
                  name="description"
                  value={product.description || ''}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>

              {/* Nút lưu và thoát */}
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
        content="Lưu thay đổi?"
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

export default AdminEditProduct;
