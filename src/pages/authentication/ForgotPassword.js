import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import Meta from '../../components/Meta';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';

const ForgotPassword = () => {
  return (
    <>
      <Meta title="Quên mật khẩu" />
      <BreadCrumb title="Quên mật khẩu" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="shadow-lg p-4 rounded bg-white"
            style={{ maxWidth: '400px', width: '100%' }}
          >
            <h3 className="text-center mb-3 text-primary fw-bold">
              Đặt lại mật khẩu
            </h3>
            <p className="text-center mb-4 text-muted">
              Chúng tôi sẽ gửi email để bạn đặt lại mật khẩu của mình.
            </p>

            <form className="d-flex flex-column gap-3">
              {/* Email Input */}
              <CustomInput
                type="email"
                name="email"
                placeholder="Nhập email của bạn"
                className="form-control rounded-pill py-2 px-3"
              />

              {/* Buttons */}
              <div className="text-center mt-3">
                <button
                  className="btn btn-primary rounded-pill w-100 py-2 fw-bold"
                  type="submit"
                >
                  Gửi
                </button>

                <Link
                  to="/login"
                  className="d-inline-block mt-3 text-decoration-none text-secondary"
                >
                  Hủy
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
