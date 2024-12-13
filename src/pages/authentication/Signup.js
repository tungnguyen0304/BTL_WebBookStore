import React, { useState } from "react";
import axios from "axios";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { useNavigate, Link } from "react-router-dom";
import Container from "../../components/Container";
import {
  checkValidName,
  checkValidUsername,
  checkValidPass,
  checkValidEmail,
  checkValidPhoneNumber,
} from "../../utils/FormUtil";
import { useDispatch } from "react-redux";
import { login } from "../../actions/userRole";

const Signup = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState(profile);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
    if (errors[name]) errors[name] = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedInfo = Object.fromEntries(
      Object.entries(profile).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    const errors = {};
    if (!checkValidName(trimmedInfo.name))
      errors.name =
        "Tên không được trống và ít hơn 50 ký tự bao gồm các ký tự Việt Nam và khoảng trắng";

    if (!checkValidUsername(trimmedInfo.username))
      errors.username =
        "Username gồm 3 đến 20 ký tự chữ thường, chữ hoa, số, dấu gạch chân và dấu gạch nối";

    if (trimmedInfo.email.length !== 0) {
      if (!checkValidEmail(trimmedInfo.email)) {
        errors.email = "Email không hợp lệ";
      }
    }

    if (!checkValidPass(trimmedInfo.password))
      errors.password =
        "Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ hoa, 1 thường, 1 số, 1 ký tự đặc biệt";

    if (trimmedInfo.phone.length !== 0)
      if (!checkValidPhoneNumber(trimmedInfo.phone))
        errors.phone = "SĐT không hợp lệ";

    if (trimmedInfo.address.length > 255)
      errors.address = "Địa chỉ tối đa 255 ký tự";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      try {
        await axios.post(
          "http://localhost/BTL_Web/src/api/register.php",
          trimmedInfo
        );
        dispatch(login("0"));
        navigate(-1);
      } catch (error) {
        if (error.response) setErrors(error.response.data);
      }
    }
  };

  return (
    <>
      <Meta title={"Đăng ký"} />
      <BreadCrumb title="Đăng ký" />
      <Container class1="signup-wrapper py-5 home-wrapper-2">
        <div className="d-flex justify-content-center">
          <div className="card shadow-lg p-4 rounded" style={{ width: "500px" }}>
            <h3 className="text-center mb-4 text-primary">Đăng ký tài khoản</h3>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {/* Tên */}
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Tên"
                className={`form-control rounded-pill px-3 py-2 ${errors.name ? "is-invalid" : ""
                  }`}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}

              {/* Email */}
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Email"
                className={`form-control rounded-pill px-3 py-2 ${errors.email ? "is-invalid" : ""
                  }`}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}

              {/* Username */}
              <input
                name="username"
                value={profile.username}
                onChange={handleChange}
                placeholder="Username"
                className={`form-control rounded-pill px-3 py-2 ${errors.username ? "is-invalid" : ""
                  }`}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}

              {/* Mật khẩu */}
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                className={`form-control rounded-pill px-3 py-2 ${errors.password ? "is-invalid" : ""
                  }`}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}

              {/* Địa chỉ */}
              <input
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Địa chỉ"
                className={`form-control rounded-pill px-3 py-2 ${errors.address ? "is-invalid" : ""
                  }`}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address}</div>
              )}

              {/* Số điện thoại */}
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
                className={`form-control rounded-pill px-3 py-2 ${errors.phone ? "is-invalid" : ""
                  }`}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}

              {/* Button */}
              <button
                type="submit"
                className="btn btn-primary rounded-pill py-2 fw-bold"
              >
                Đăng ký
              </button>

              {/* Đăng nhập */}
              <div className="text-center mt-2">
                <span>Đã có tài khoản? </span>
                <Link to="/login" className="text-primary fw-bold">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
