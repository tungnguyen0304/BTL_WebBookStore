import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ExitToApp, Block, CheckCircle } from '@mui/icons-material';
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
import Meta from '../../components/Meta';
import NormalSearchBar from '../../components/NormalSearchBar';

const CommentsAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [comments, setComments] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('http://localhost/BTL_Web/src/api/admin/comments-list.php')
      .then(response => setComments(response.data))
      .catch(error => console.log(error));
  }, []);

  const pageCount = Math.ceil(comments.length / rowsPerPage);
  const handlePageChange = (event, value) => setCurrentPage(value);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);

  const handleSearch = () => {
    axios.get('http://localhost/BTL_Web/src/api/admin/comments-list.php', {
      params: { q: searchText.trim() },
    })
      .then(response => setComments(response.data))
      .catch(() => setComments([]));
  };

  const handleToggleCommentStatus = (ID) => {
    axios.get('http://localhost/BTL_Web/src/api/admin/toggle-comment-status.php', {
      params: { id: ID },
    })
      .then(() => {
        const updatedComments = comments.map((comment) =>
          comment.ID === ID
            ? { ...comment, status: comment.status === '1' ? null : '1' }
            : comment
        );
        setComments(updatedComments);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Meta title="Quản lý bình luận" />

      <Box sx={{ py: 4, px: 2, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#ffffff',
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h4" color="primary" fontWeight="bold" padding="10px">
              Quản lý bình luận
            </Typography>
            <NormalSearchBar
              label="Nhập thông tin cần tìm"
              searchText={searchText}
              setSearchText={setSearchText}
              handleSearch={handleSearch}
            />
          </Grid>

          {comments.length !== 0 ? (
            <Box className="table-responsive">
              <Table>
                <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
                  <TableRow>
                    <TableCell><b>ID</b></TableCell>
                    <TableCell><b>Username</b></TableCell>
                    <TableCell><b>Tên sản phẩm</b></TableCell>
                    <TableCell><b>Nội dung</b></TableCell>
                    <TableCell><b>Thời gian</b></TableCell>
                    <TableCell width="150px"><b>Thao tác</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentComments.map((comment) => (
                    <TableRow
                      key={comment.ID}
                      hover
                      sx={{
                        '&:hover': { backgroundColor: '#f1f8ff' },
                      }}
                    >
                      <TableCell>{comment.ID}</TableCell>
                      <TableCell>{comment.user_name}</TableCell>
                      <TableCell>{comment.product_name}</TableCell>
                      <TableCell>{comment.content}</TableCell>
                      <TableCell>{comment.comment_datetime}</TableCell>
                      <TableCell>
                        <Tooltip title="Tới trang sản phẩm">
                          <Link to={`/product/${comment.productID}`}>
                            <IconButton color="info">
                              <ExitToApp />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        {comment.status === null ? (
                          <Tooltip title="Khóa bình luận">
                            <IconButton
                              sx={{ color: 'red' }}
                              onClick={() => handleToggleCommentStatus(comment.ID)}
                            >
                              <Block />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Mở khóa bình luận">
                            <IconButton
                              sx={{ color: 'green' }}
                              onClick={() => handleToggleCommentStatus(comment.ID)}
                            >
                              <CheckCircle />
                            </IconButton>
                          </Tooltip>
                        )}
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
          ) : (
            <Typography
              variant="h6"
              color="textSecondary"
              align="center"
              sx={{ py: 4 }}
            >
              Không có bình luận nào
            </Typography>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default CommentsAdminPage;
