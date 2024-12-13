import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Tooltip,
  Grid,
  Pagination,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { ExitToApp, Reviews, Edit } from '@mui/icons-material';
import AlertDialog from '../../components/AlertDialog';
import NormalSearchBar from '../../components/NormalSearchBar';
import Meta from "../../components/Meta";

const ProductsAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('http://localhost/BTL_Web/src/api/admin/products-list.php')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const pageCount = Math.ceil(products.length / rowsPerPage);
  const handlePageChange = (_, value) => setCurrentPage(value);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + rowsPerPage);

  const [viewProductPopup, setView] = useState(false);
  const onViewDetail = (product) => setView(product);

  const handleSearch = () => {
    axios.get('http://localhost/BTL_Web/src/api/admin/products-list.php', {
      params: { q: searchText.trim() },
    }).then(response => setProducts(response.data))
      .catch(error => console.error(error));
  };

  return (
    <>
      <Meta title="Quản lý sản phẩm" />
      <Box sx={{ my: 4, mx: 2 }}>
        {/* Header */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" fontWeight="bold" color="primary" padding="10px">
                Quản lý sản phẩm
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <NormalSearchBar
                label="Nhập thông tin cần tìm"
                searchText={searchText}
                setSearchText={setSearchText}
                handleSearch={handleSearch}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Link to="add">
              <Button variant="contained" color="primary">
                Thêm sản phẩm mới
              </Button>
            </Link>
          </Box>
        </Paper>

        {/* Table */}
        <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
          <Box className="table-responsive">
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                  {['ID', 'Tên', 'Giá', 'Số lượng đã bán', 'Số lượng còn lại', 'Thao tác'].map((col) => (
                    <TableCell key={col} align="center" sx={{ fontWeight: 'bold' }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProducts.map((product) => (
                  <TableRow
                    key={product.ID}
                    sx={{
                      '&:hover': { backgroundColor: '#f1f8e9' },
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <TableCell align="center">{product.ID}</TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                    <TableCell align="center">{product.sold_qty}</TableCell>
                    <TableCell align="center">{product.current_qty}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Xem chi tiết">
                        <IconButton color="success" onClick={() => onViewDetail(product)}>
                          <Reviews />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Tới trang sản phẩm">
                        <Link to={`/product/${product.ID}`}>
                          <IconButton color="info">
                            <ExitToApp />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa sản phẩm">
                        <Link to={`edit?id=${product.ID}`}>
                          <IconButton color="warning">
                            <Edit />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                color="primary"
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          </Box>
        </Paper>

        {/* Product Detail Dialog */}
        <AlertDialog title="Thông tin sản phẩm" open={!!viewProductPopup} setView={setView}>
          <Table>
            <TableBody>
              {[
                ['ID', viewProductPopup.ID],
                ['Tên', viewProductPopup.name],
                ['Thể loại', viewProductPopup.category_name],
                ['Tác giả', viewProductPopup.author_name],
                ['NSX/NXB', viewProductPopup.manufacturer_name],
                ['Giá', viewProductPopup.price],
                ['Số lượng đã bán', viewProductPopup.sold_qty],
                ['Số lượng còn lại', viewProductPopup.current_qty],
                ['Trạng thái', viewProductPopup.in_stock ? 'Còn kinh doanh' : 'Ngưng kinh doanh'],
              ].map(([label, value]) => (
                <TableRow key={label}>
                  <TableCell variant="head" sx={{ fontWeight: 'bold' }}>{label}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AlertDialog>
      </Box>
    </>
  );
};

export default ProductsAdminPage;
