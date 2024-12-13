import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Container
} from "@mui/material";
import { Delete, Reviews } from "@mui/icons-material";
import AlertDialog from "../../components/AlertDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import NormalSearchBar from "../../components/NormalSearchBar";
import Meta from "../../components/Meta";

const UsersAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/BTL_Web/src/api/admin/users-list.php")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const pageCount = Math.ceil(users.length / rowsPerPage);
  const handlePageChange = (_, value) => setCurrentPage(value);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + rowsPerPage);

  const [viewUserPopup, setView] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const onViewDetail = (user) => setView(user);
  const onDelete = (ID) => {
    setUsers(users.filter((user) => user.ID !== ID));
  };

  const handleSearch = () => {
    axios
      .get("http://localhost/BTL_Web/src/api/admin/users-list.php", {
        params: { q: searchText.trim() },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Search error:", error));
  };

  return (
    <>
      <Meta title="Quản lý người dùng" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Header và Search */}
        <Grid container alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" fontWeight="bold" color="primary" padding="10px">
              Quản lý người dùng
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <NormalSearchBar
              label="Nhập thông tin cần tìm"
              searchText={searchText}
              setSearchText={setSearchText}
              handleSearch={handleSearch}
            />
          </Grid>
        </Grid>

        {/* Table */}
        <Paper elevation={3} sx={{ borderRadius: 3 }}>
          <Box className="table-responsive">
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  {["ID", "Username", "Tên", "Email", "SĐT", "Địa chỉ", "Thao tác"].map((col) => (
                    <TableCell key={col} align="center" sx={{ fontWeight: "bold" }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow
                    key={user.ID}
                    sx={{
                      "&:hover": { backgroundColor: "#f1f8e9" },
                      transition: "background-color 0.3s",
                    }}
                  >
                    <TableCell align="center">{user.ID}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.address}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Xem chi tiết">
                        <IconButton color="info" onClick={() => onViewDetail(user)}>
                          <Reviews />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa người dùng">
                        <IconButton color="error" onClick={() => setConfirmDel(user.ID)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            color="primary"
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>

        {/* Dialogs */}
        <AlertDialog
          title="Thông tin người dùng"
          open={!!viewUserPopup}
          setView={setView}
        >
          <Table>
            <TableBody>
              {[
                ["ID", viewUserPopup.ID],
                ["Tên", viewUserPopup.name],
                ["Username", viewUserPopup.username],
                ["Quyền", viewUserPopup.role === 0 ? "User" : "Admin"],
                ["SĐT", viewUserPopup.phone],
                ["Email", viewUserPopup.email],
                ["Địa chỉ", viewUserPopup.address],
              ].map(([label, value], idx) => (
                <TableRow key={idx}>
                  <TableCell variant="head" sx={{ fontWeight: "bold" }}>
                    {label}
                  </TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AlertDialog>
        <ConfirmDialog
          isOpen={!!confirmDel}
          setOpen={setConfirmDel}
          content={`Bạn có chắc chắn muốn xóa user có ID = ${confirmDel} không?`}
          confirm={() => onDelete(confirmDel)}
        />
      </Container>
    </>
  );
};

export default UsersAdminPage;
