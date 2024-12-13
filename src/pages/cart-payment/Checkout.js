import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../../components/Container";
import Meta from "../../components/Meta";
import OrderItems from "../user-page/OrderItem";
import {
  getLocalCartContent,
  clearLocalCart,
} from "../../utils/setCartLocal";
import {
  checkValidName,
  checkValidPhoneNumber,
} from "../../utils/FormUtil";
import { useSelector } from "react-redux";

const Checkout = () => {
  const userRole = useSelector((state) => state.userRole);
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    method: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost/BTL_Web/src/api/user-info.php")
      .then((response) => response.data)
      .then((response) => {
        setInfo((prev) => ({
          ...prev,
          name: response.name,
          phone: response.phone,
          address: response.address,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [errors, setErrors] = useState(info);
  const methods = [
    { value: "0", text: "Thanh toán khi nhận hàng" },
    { value: "1", text: "Thanh toán trực tuyến" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));
    if (errors[name]) errors[name] = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedInfo = Object.fromEntries(
      Object.entries(info).map(([key, value]) => [key, value.trim()])
    );

    const errors = {};
    if (!checkValidName(trimmedInfo.name))
      errors.name = "Tên không được trống và ít hơn 50 ký tự.";
    if (!checkValidPhoneNumber(trimmedInfo.phone))
      errors.phone = "Số điện thoại không hợp lệ";
    if (!trimmedInfo.address)
      errors.address = "Vui lòng điền địa chỉ nhận hàng";
    if (!trimmedInfo.method)
      errors.method = "Vui lòng chọn phương thức thanh toán.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const compactCartContent = cartContent.map((item) => ({
        productID: item.ID,
        qty: item.qty,
      }));
      const order = { ...info, orderContent: compactCartContent };

      axios
        .post("http://localhost/BTL_Web/src/api/order.php", order)
        .then(() => {
          clearLocalCart();
          navigate("/orders");
        })
        .catch((error) => console.error(error));
    }
  };

  const cartContent = getLocalCartContent();
  const subtotal = cartContent.reduce(
    (acc, product) => acc + product.qty * product.price,
    0
  );
  const deliveryCost = 15000;
  const total = subtotal + deliveryCost;

  const VNCurrencyFormatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <Meta title={"Thanh toán"} />
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        {userRole !== "" ? (
          <>
            <div className="mb-3">
              <Link to="/cart" className="text-primary d-flex align-items-center">
                <BiArrowBack className="me-2" />
                Trở về giỏ hàng
              </Link>
            </div>

            <div className="row g-4">
              {/* Thông tin người nhận */}
              <div className="col-12 col-md-7">
                <div className="p-4 bg-light rounded shadow-sm">
                  <h4 className="mb-3 text-primary">Thông tin nhận hàng</h4>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Tên người nhận hàng</label>
                      <input
                        name="name"
                        value={info.name}
                        onChange={handleChange}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="Tên người nhận hàng"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Số điện thoại</label>
                      <input
                        name="phone"
                        value={info.phone}
                        onChange={handleChange}
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        placeholder="Số điện thoại"
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Địa chỉ nhận hàng</label>
                      <input
                        name="address"
                        value={info.address}
                        onChange={handleChange}
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        placeholder="Địa chỉ nhận hàng"
                      />
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>

                    <h5 className="text-primary mt-4">Phương thức thanh toán</h5>
                    {methods.map((option) => (
                      <div key={option.value} className="form-check">
                        <input
                          className={`form-check-input ${errors.method ? "is-invalid" : ""
                            }`}
                          name="method"
                          type="radio"
                          value={option.value}
                          checked={info.method === option.value}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">{option.text}</label>
                      </div>
                    ))}
                    {errors.method && <div className="text-danger">{errors.method}</div>}
                  </form>
                </div>
              </div>

              {/* Thông tin đơn hàng */}
              <div className="col-12 col-md-5">
                <div className="p-4 bg-white rounded shadow-sm">
                  {cartContent.map((product) => (
                    <OrderItems key={product.ID} product={product} />
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Thành tiền:</span>
                    <strong>{VNCurrencyFormatter.format(subtotal)}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Phí vận chuyển:</span>
                    <strong>{VNCurrencyFormatter.format(deliveryCost)}</strong>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Tổng tiền:</h5>
                    <h5 className="text-primary">
                      {VNCurrencyFormatter.format(total)}
                    </h5>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary w-100 mt-3"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-muted">
            Bạn phải đăng nhập để đặt hàng
            <br />
            <Link to="/login" className="btn btn-primary mt-3">
              Đăng nhập
            </Link>
          </div>
        )}
      </Container>
    </>
  );
};

export default Checkout;
