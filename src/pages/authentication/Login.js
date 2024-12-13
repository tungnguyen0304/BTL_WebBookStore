import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Meta from '../../components/Meta';
import { login } from '../../actions/userRole';
import Container from '../../components/Container';
import BreadCrumb from '../../components/BreadCrumb';

const Login = () => {
  const dispatch = useDispatch();

  const [loginCredential, setLoginCredential] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState(loginCredential);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedLoginCre = {
      username: loginCredential.username.trim(),
      password: loginCredential.password.trim(),
    };

    const errors = {};
    if (trimmedLoginCre.username.length === 0) {
      errors.username = 'Vui lòng điền username';
    }
    if (trimmedLoginCre.password.length === 0) {
      errors.password = 'Vui lòng điền mật khẩu';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      try {
        const response = await axios.post(
          'http://localhost/BTL_Web/src/api/verify-login.php',
          trimmedLoginCre
        );

        dispatch(login(response.data.role));
        navigate(-1);
      } catch (error) {
        if (error.response.status === 401) {
          setErrors({
            ...errors,
            password: 'Tên đăng nhập hoặc mật khẩu không đúng',
          });
        } else {
          console.log(error);
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginCredential((prevState) => ({ ...prevState, [name]: value }));

    if (errors[name]) {
      errors[name] = '';
    }
  };

  return (
    <>
      <Meta title={'Đăng nhập'} />
      
      <BreadCrumb title="Đăng nhập" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="shadow-lg p-4 bg-white rounded"
            style={{ maxWidth: '400px', width: '100%' }}
          >
            <h3 className="text-center mb-4 text-primary fw-bold">Đăng nhập</h3>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {/* Username */}
              <div>
                <input
                  name="username"
                  value={loginCredential.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className={`form-control rounded-pill px-3 py-2 ${errors.username ? 'is-invalid' : ''
                    }`}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  value={loginCredential.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  className={`form-control rounded-pill px-3 py-2 ${errors.password ? 'is-invalid' : ''
                    }`}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              {/* Quên mật khẩu */}
              <div className="text-end">
                <Link to="/forgot-password" className="text-decoration-none">
                  <small className="text-primary">Quên mật khẩu?</small>
                </Link>
              </div>

              {/* Nút Đăng nhập */}
              <button
                className="btn btn-primary rounded-pill fw-bold py-2"
                type="submit"
              >
                Đăng nhập
              </button>

              {/* Đăng ký */}
              <div className="text-center mt-2">
                <span>Chưa có tài khoản? </span>
                <Link to="/signup" className="text-primary fw-bold">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
