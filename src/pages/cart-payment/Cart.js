import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import {
  getLocalCartContent,
  decreaseInLocalCart,
  increaseInLocalCart,
  removeFromLocalCart,
} from "../../utils/setCartLocal";
import CartItem from "../../components/CartItem";
import EmptyCart from "../../images/empty-cart.jpg";

const Cart = () => {
  const [cartContent, setCartContent] = useState(getLocalCartContent());

  const onIncrease = (product) => {
    const exist = cartContent.find((x) => x.ID === product.ID);
    if (exist) {
      setCartContent(
        cartContent.map((x) =>
          x.ID === product.ID ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartContent([...cartContent, { ...product, qty: 1 }]);
    }
    increaseInLocalCart(product);
  };

  const onDecrease = (product) => {
    const exist = cartContent.find((x) => x.ID === product.ID);
    if (exist.qty === 1) {
      setCartContent(cartContent.filter((x) => x.ID !== product.ID));
    } else {
      setCartContent(
        cartContent.map((x) =>
          x.ID === product.ID ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
    decreaseInLocalCart(product);
  };

  const onDelete = (product) => {
    setCartContent(cartContent.filter((x) => x.ID !== product.ID));
    removeFromLocalCart(product);
  };

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
      <Meta title={"Giỏ hàng"} />

      <BreadCrumb title="Giỏ hàng" />
      
      {cartContent.length !== 0 ? (
        <Container class1="cart-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="card p-4" style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <h3 className="mb-4 text-center text-primary">Giỏ hàng của bạn</h3>
                {cartContent.map((product) => (
                  <CartItem
                    key={product.ID}
                    product={product}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </div>
            {/* Tổng tiền */}
            <div className="col-12 mt-4">
              <div
                className="p-3 rounded"
                style={{
                  background: "#f8f9fa",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h5 className="text-end mb-2">
                  Thành tiền:{" "}
                  <strong className="text-success">
                    {VNCurrencyFormatter.format(subtotal)}
                  </strong>
                </h5>
                <h5 className="text-end mb-2">
                  Phí vận chuyển:{" "}
                  <strong className="text-danger">
                    {VNCurrencyFormatter.format(deliveryCost)}
                  </strong>
                </h5>
                <h4 className="text-end">
                  Tổng tiền:{" "}
                  <strong className="text-primary">
                    {VNCurrencyFormatter.format(total)}
                  </strong>
                </h4>
                <div className="text-end mt-3">
                  <Link to="/checkout" className="btn btn-success px-4 py-2">
                    Tiến hành thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <div className="text-center my-5">
          <img
            src={EmptyCart}
            style={{ width: "300px", marginBottom: "20px" }}
            alt="Empty cart"
          />
          <h5 className="text-secondary mb-3">Giỏ hàng trống</h5>
          <Link to="/" className="btn btn-primary px-4 py-2">
            Tiếp tục mua sắm
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
