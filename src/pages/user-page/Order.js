import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { React, useState, useEffect } from 'react';
import OrderItems from './OrderItem';

export default function Order() {
  const [orderGeneralInfo, setOrderGeneralInfo] = useState({});
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const orderID = queryParameters.get('id');

    axios
      .get('http://localhost/BTL_Web/src/api/user-orders-list.php')
      .then(response => response.data)
      .then(response => {
        for (const order of response) {
          if (order.ID == orderID) {
            setOrderGeneralInfo(order);
          }
        }
      })
      .catch(error => {
        if (error.response.status === 404) {
          setOrderGeneralInfo({});
        }
      });

    axios
      .get('http://localhost/BTL_Web/src/api/user-order-content.php', {
        params: { id: orderID },
      })
      .then(response => response.data)
      .then(response => {
        setOrder(response);
      })
      .catch(error => {
        if (error.response.status === 404) {
          setOrderGeneralInfo([]);
        }
      });
  }, []);

  const orderStatus = orderGeneralInfo.status === 1 ? 'Đã nhận hàng' : 'Đang giao hàng';
  const orderStatusStyle = orderGeneralInfo.status === 0 ? { color: '#4caf50', fontWeight: 'bold' } : { color: '#ff9800', fontWeight: 'bold' };

  const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <Box className="container" sx={{ my: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          Đơn hàng
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {Object.keys(orderGeneralInfo).length !== 0 ? (
          <>
            <Grid container spacing={3}>
              {/* Thông tin đơn hàng */}
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Mã số đơn hàng: </strong> {orderGeneralInfo.ID}
                </Typography>

                <Typography variant="body1">
                  <strong>Người đặt hàng: </strong> {orderGeneralInfo.name}
                </Typography>

                <Typography variant="body1">
                  <strong>Số điện thoại: </strong> {orderGeneralInfo.phone}
                </Typography>

                <Typography variant="body1">
                  <strong>Địa chỉ nhận hàng: </strong>{' '}

                  {orderGeneralInfo.address}
                </Typography>

                <Typography variant="body1">
                  <strong>Ngày đặt hàng: </strong>{' '}

                  {orderGeneralInfo.order_datetime}
                </Typography>

                <Typography variant="body1">
                  <strong>Trạng thái đơn hàng: </strong>

                  <span style={orderStatusStyle}>{orderStatus}</span>
                </Typography>
              </Grid>

              {/* Danh sách sản phẩm */}
              <Grid item xs={12} md={6}>
                <Paper
                  variant="outlined"
                  sx={{ p: 2, backgroundColor: '#f9f9f9' }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mb: 1, color: '#333' }}
                  >
                    Sản phẩm trong đơn hàng
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Stack spacing={2}>
                    {order.map(product => (
                      <OrderItems key={product.ID} product={product} />
                    ))}
                  </Stack>
                </Paper>
              </Grid>

              {/* Tổng tiền */}
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#e8f5e9',
                  }}
                >
                  <Typography variant="body1" align="right">
                    <strong>Thành tiền: </strong>

                    {VNCurrencyFormatter.format(
                      orderGeneralInfo.total - orderGeneralInfo.delivery_cost
                    )}
                  </Typography>

                  <Typography variant="body1" align="right">
                    <strong>Phí vận chuyển: </strong>

                    {VNCurrencyFormatter.format(
                      orderGeneralInfo.delivery_cost
                    )}
                  </Typography>

                  <Typography
                    variant="h6"
                    align="right"
                    fontWeight="bold"
                    color="primary"
                  >
                    Tổng tiền: {VNCurrencyFormatter.format(orderGeneralInfo.total)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            sx={{ py: 5 }}
          >
            Đơn hàng không tồn tại
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
