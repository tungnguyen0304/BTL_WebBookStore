import {
  Grid,
  FormControl,
  TextField,
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material';
import React, { useState } from 'react';
import Meta from "../../components/Meta";
import ConfirmDialog from '../../components/ConfirmDialog';
import axios from 'axios';

const AdminManageProductInfo = () => {
  const [authorName, setAuthorName] = useState('');
  const [manufacturer, setManufacturer] = useState({ name: '', country: '' });

  const [authorError, setAuthorError] = useState('');
  const [manufacturerError, setManufacturerError] = useState({});

  const handleChangeManu = (e) => {
    const { name, value } = e.target;
    setManufacturer((prevState) => ({ ...prevState, [name]: value }));
    if (manufacturerError[name]) {
      setManufacturerError({ ...manufacturerError, [name]: '' });
    }
  };

  const handleSubmitAuthor = async () => {
    let error = '';
    const trimmedAuthorName = authorName.trim();

    if (trimmedAuthorName.length === 0) {
      error = 'Tên tác giả không được trống';
    } else if (trimmedAuthorName.length > 50) {
      error = 'Tên tác giả phải ít hơn 50 ký tự';
    }

    if (error) {
      setAuthorError(error);
    } else {
      try {
        await axios.post('http://localhost/BTL_Web/src/api/admin/author-add.php', {
          name: trimmedAuthorName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmitManu = async () => {
    const errors = {};
    const trimmedManuName = manufacturer.name.trim();
    const trimmedCountryName = manufacturer.country.trim();

    if (trimmedManuName.length === 0) {
      errors.name = 'Tên NSX/NXB không được trống';
    } else if (trimmedManuName.length > 50) {
      errors.name = 'Tên NSX/NXB phải ít hơn 50 ký tự';
    }

    if (trimmedCountryName.length > 20) {
      errors.country = 'Tên quốc gia phải ít hơn 20 ký tự';
    }

    if (Object.keys(errors).length > 0) {
      setManufacturerError(errors);
    } else {
      try {
        await axios.post('http://localhost/BTL_Web/src/api/admin/manufacturer-add.php', {
          name: trimmedManuName,
          country: trimmedCountryName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [confirmSaveAuthor, setConfirmSaveAuthor] = useState(false);
  const [confirmSaveManu, setConfirmSaveManu] = useState(false);

  return (
    <>
      <Meta title="Quản lý thông tin sản phẩm" />

      <Box sx={{ py: 4, backgroundColor: '#f5f5f5' }}>
        {/* Thêm tác giả */}
        <Box mb={4} className="container">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Thêm tác giả mới
            </Typography>

            <form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Tên tác giả"
                      name="name"
                      value={authorName}
                      onChange={(e) => {
                        setAuthorName(e.target.value);
                        if (authorError) setAuthorError('');
                      }}
                      error={!!authorError}
                      helperText={authorError}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setConfirmSaveAuthor(true)}
                  >
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>

        {/* Thêm NSX/NXB */}
        <Box className="container">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Thêm NSX/NXB mới
            </Typography>

            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Tên NSX/NXB"
                      name="name"
                      value={manufacturer.name}
                      onChange={handleChangeManu}
                      error={!!manufacturerError.name}
                      helperText={manufacturerError.name}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Quốc gia"
                      name="country"
                      value={manufacturer.country}
                      onChange={handleChangeManu}
                      error={!!manufacturerError.country}
                      helperText={manufacturerError.country}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setConfirmSaveManu(true)}
                  >
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Box>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmSaveAuthor}
        setOpen={setConfirmSaveAuthor}
        content="Bạn chắc chắn muốn thêm tác giả?"
        confirm={handleSubmitAuthor}
      />
      <ConfirmDialog
        isOpen={confirmSaveManu}
        setOpen={setConfirmSaveManu}
        content="Bạn chắc chắn muốn thêm NSX/NXB?"
        confirm={handleSubmitManu}
      />
    </>
  );
};

export default AdminManageProductInfo;
