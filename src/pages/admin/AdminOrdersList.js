import axios from 'axios';
import { Reviews } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
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
  Paper,
  Typography,
} from '@mui/material';
import Meta from "../../components/Meta";
import AlertDialog from '../../components/AlertDialog';
import NormalSearchBar from '../../components/NormalSearchBar';

const OrdersAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Fetch order data
  useEffect(() => {
    axios.get('http://localhost/BTL_Web/src/api/admin/orders-list.php')
      .then(response => setOrders(response.data))
      .catch(error => console.log(error));
  }, []);

  const pageCount = Math.ceil(orders.length / rowsPerPage);
  const handlePageChange = (event, value) => setCurrentPage(value);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // View order popup
  const [viewOrderPopup, setView] = useState(false);
  const onViewDetail = (order) => setView(order);

  const handleSearch = () => {
    axios.get('http://localhost/BTL_Web/src/api/admin/orders-list.php', { params: { q: searchText.trim() } })
      .then(response => setOrders(response.data))
      .catch(() => setOrders([]));
  };

  return (
    <>
      <Meta title="Quản lý đơn hàng" />
      <Box sx={{ py: 4, px: 2, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Grid container alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h4" color="primary" fontWeight="bold" padding="10px">
              Quản lý đơn hàng
            </Typography>
            <NormalSearchBar
              label="Nhập thông tin cần tìm"
              searchText={searchText}
              setSearchText={setSearchText}
              handleSearch={handleSearch}
            />
          </Grid>

          {/* Table */}
          <Box className="table-responsive">
            <Table aria-label="orders table">
              <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Tên người nhận hàng</b></TableCell>
                  <TableCell><b>Thời gian đặt hàng</b></TableCell>
                  <TableCell><b>Tổng tiền</b></TableCell>
                  <TableCell><b>Trạng thái</b></TableCell>
                  <TableCell width="150px"><b>Thao tác</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow hover key={order.ID} sx={{ '&:hover': { backgroundColor: '#f1f8ff' } }}>
                    <TableCell>{order.ID}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.order_datetime}</TableCell>
                    <TableCell>{order.total} đ</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          color: order.status === 1 ? '#2e7d32' : '#d32f2f',
                          backgroundColor: order.status === 1 ? '#e8f5e9' : '#ffebee',
                          fontWeight: 'bold',
                        }}
                      >
                        {order.status === 1 ? 'Đã nhận hàng' : 'Đang giao hàng'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Xem chi tiết">
                        <IconButton color="primary" onClick={() => onViewDetail(order)}>
                          <Reviews />
                        </IconButton>
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

          {/* Alert Dialog */}
          <AlertDialog
            title="Thông tin đơn hàng"
            open={!!viewOrderPopup}
            setView={setView}
          >
            <Table>
              <TableBody>
                {[
                  { label: 'ID', value: viewOrderPopup.ID },
                  { label: 'Tên người nhận hàng', value: viewOrderPopup.name },
                  { label: 'SĐT', value: viewOrderPopup.phone },
                  { label: 'Địa chỉ', value: viewOrderPopup.address },
                  { label: 'Phương thức thanh toán', value: viewOrderPopup.method === '1' ? 'COD' : 'Online' },
                  { label: 'Thời gian đặt hàng', value: viewOrderPopup.order_datetime },
                  { label: 'Tiền vận chuyển', value: `${viewOrderPopup.delivery_cost} đ` },
                  { label: 'Tổng tiền', value: `${viewOrderPopup.total} đ` },
                  {
                    label: 'Trạng thái',
                    value: viewOrderPopup.status === 1 ? 'Đã nhận hàng' : 'Đang giao hàng',
                  },
                ].map((item, index) => (
                  <TableRow key={index}>
                    <TableCell variant="head" sx={{ fontWeight: 'bold' }}>
                      {item.label}
                    </TableCell>
                    <TableCell>{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AlertDialog>
        </Paper>
      </Box>
    </>
  );
};

export default OrdersAdminPage;
