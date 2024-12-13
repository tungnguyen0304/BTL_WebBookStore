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
  Typography,
  Paper,
} from '@mui/material';
import { ListAlt } from '@mui/icons-material';
import Meta from "../../components/Meta";
import Container from '../../components/Container';

const UserOrdersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/BTL_Web/src/api/user-orders-list.php')
      .then(response => response.data)
      .then(response => setOrders(response))
      .catch(error => {
        if (error.response?.status === 404) {
          setOrders([]);
        }
      });
  }, []);

  const pageCount = Math.ceil(orders.length / rowsPerPage);
  const handlePageChange = (event, value) => setCurrentPage(value);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <>
      <Meta title="Đơn hàng của bạn" />
      <Container class1="home-wrapper-2 py-3">
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Đơn hàng của bạn
          </Typography>
        </Grid>

        {orders.length !== 0 ? (
          <Box className="table-responsive">
            <Table aria-label="orders table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                  <TableCell sx={{ fontWeight: 'bold', color: "#333" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: "#333" }}>Tên người nhận hàng</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: "#333" }}>Thời gian đặt hàng</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: "#333" }}>Tổng tiền</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: "#333" }}>Trạng thái</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: "#333" }} width="150px" align="center">
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow
                    key={order.ID}
                    hover
                    sx={{
                      '&:hover': { backgroundColor: "#f1f5f9" },
                    }}
                  >
                    <TableCell>{order.ID}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.order_datetime}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          color: order.status === 1 ? 'green' : 'orange',
                        }}
                      >
                        {order.status === 1 ? "Đã nhận hàng" : "Đang giao hàng"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Xem nội dung đơn hàng">
                        <Link to={`/orders/order?id=${order.ID}`}>
                          <IconButton color="primary">
                            <ListAlt />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                color="primary"
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          </Box>
        ) : (
          <Box textAlign="center" py={5}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              Bạn không có đơn hàng nào
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default UserOrdersList;
