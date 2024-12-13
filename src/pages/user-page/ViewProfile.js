import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Meta from "../../components/Meta";
import Container from "../../components/Container";

const ViewProfile = () => {
  const userRole = useSelector((state) => state.userRole);
  const [Profile, setProfile] = useState({
    name: "",
    username: "",
    address: "",
    email: "",
    phone: "",
  });

  // Fetch user info
  useEffect(() => {
    axios
      .get("http://localhost/BTL_Web/src/api/user-info.php")
      .then((response) => {
        console.log("API Response:", response.data); // Log phản hồi từ server
        setProfile(response.data);
      })
      .catch((error) => {
        console.log("Error fetching user info:", error);
      });
  }, []);

  return (
    <div>
      <Meta title="Hồ sơ của bạn" />

      {userRole !== "" ? (
        <>
          <Container class1="home-wrapper-2 py-3">
            <Box className="profile-card" sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Hồ sơ của bạn
              </Typography>

              <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <AccountCircleIcon color="primary" />

                        <strong> Username:</strong>
                      </TableCell>

                      <TableCell>{Profile.username}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <AccountCircleIcon color="primary" />

                        <strong> Tên:</strong>
                      </TableCell>

                      <TableCell>{Profile.name}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <EmailIcon color="secondary" />

                        <strong> Email:</strong>
                      </TableCell>

                      <TableCell>{Profile.email}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <PhoneIcon color="success" />

                        <strong> SĐT:</strong>
                      </TableCell>

                      <TableCell>{Profile.phone}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <HomeIcon color="action" />

                        <strong> Địa chỉ:</strong>
                      </TableCell>

                      <TableCell>{Profile.address}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box mt={3} textAlign="center">
                <Link to="/edit-profile">
                  <button className="btn btn-primary" style={{ padding: "10px 20px", borderRadius: "20px" }}>
                    Chỉnh sửa hồ sơ
                  </button>
                </Link>
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <Box className="text-center text-muted" py={5}>
          Bạn phải đăng nhập trước

          <br />

          <Link to="/login">Đăng nhập</Link>
        </Box>
      )}
    </div>
  );
};

export default ViewProfile;
