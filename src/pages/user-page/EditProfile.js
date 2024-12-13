import {
  Grid,
  FormControl,
  TextField,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import {
  checkValidName,
  checkValidEmail,
  checkValidPhoneNumber,
} from "../../utils/FormUtil";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import ConfirmDialog from "../../components/ConfirmDialog";

const EditProfile = () => {
  const userRole = useSelector((state) => state.userRole);
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState(profile);

  const navigate = useNavigate();

  // Fetch user info
  useEffect(() => {
    axios
      .get("http://localhost/BTL_Web/src/api/user-info.php")
      .then((response) => {
        const { name, phone, email, address } = response.data;
        setProfile({ name, phone, email, address });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
    if (errors[name]) errors[name] = "";
  };

  const handleSubmit = async () => {
    const trimmedInfo = Object.fromEntries(
      Object.entries(profile).map(([key, value]) => [key, value.trim()])
    );

    const errors = {};

    if (!checkValidName(trimmedInfo.name))
      errors.name = "Tên không được trống và ít hơn 50 ký tự";

    if (trimmedInfo.email && !checkValidEmail(trimmedInfo.email))
      errors.email = "Email không hợp lệ";

    if (trimmedInfo.phone && !checkValidPhoneNumber(trimmedInfo.phone))
      errors.phone = "SĐT không hợp lệ";

    if (trimmedInfo.address.length > 255)
      errors.address = "Địa chỉ tối đa 255 ký tự";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      try {
        await axios.post("http://localhost/BTL_Web/src/api/user-edit.php", trimmedInfo);
        navigate("/view-profile");
      } catch (error) {
        if (error.response) setErrors(error.response.data);
      }
    }
  };

  const [confirmSaving, setConfirmSaving] = useState(false);
  const [confirmGoingBack, setConfirmGoingBack] = useState(false);

  return (
    <>
      <Meta title="Chỉnh sửa hồ sơ" />

      {userRole !== "" ? (
        <Container class1="home-wrapper-2 py-3">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="75vh">
            <Paper
              elevation={6}
              sx={{
                p: 4,
                maxWidth: "700px",
                width: "100%",
                borderRadius: 4,
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                align="center"
                color="primary"
                mb={3}
              >
                Chỉnh sửa hồ sơ
              </Typography>

              <form>
                <Grid container spacing={3}>
                  {/* Tên */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Tên"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  {/* Địa chỉ */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Địa chỉ"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        error={!!errors.address}
                        helperText={errors.address}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  {/* SĐT */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Số điện thoại"
                        name="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Box mt={4} display="flex" justifyContent="center" gap={2}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={() => setConfirmSaving(true)}
                  >
                    Lưu
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    onClick={() => setConfirmGoingBack(true)}
                  >
                    Thoát
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>

          <ConfirmDialog
            isOpen={confirmSaving}
            setOpen={setConfirmSaving}
            content="Bạn chắc chắn muốn lưu thay đổi?"
            confirm={handleSubmit}
          />
          <ConfirmDialog
            isOpen={confirmGoingBack}
            setOpen={setConfirmGoingBack}
            content="Bạn chắc chắn muốn thoát? Mọi thay đổi sẽ không được lưu."
            confirm={() => navigate(-1)}
          />
        </Container>
      ) : (
        <Box className="text-center text-muted" py={5}>
          Bạn phải đăng nhập trước.

          <br />

          <Link to="/login">Đăng nhập</Link>
        </Box>
      )}
    </>
  );
};

export default EditProfile;
