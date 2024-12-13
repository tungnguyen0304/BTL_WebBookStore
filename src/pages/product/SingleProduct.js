import axios from "axios";
import {
  getLocalCartContent,
  getQuantityByUniqueName,
  decreaseInLocalCart,
  increaseInLocalCart,
} from "../../utils/setCartLocal";
import { Link } from "react-router-dom";
import { Tooltip, Box, Card, TextField, Button, CardContent, Avatar, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { IconButton, Typography, } from "@mui/material";
import ReactImageZoom from "react-image-zoom";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import BreadCrumb from "../../components/BreadCrumb";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

function getUniqueNameFromUrl(url) {
  // Split the URL string by the '/' character
  const urlParts = url.split("/");

  // Select the last element of the resulting array
  const uniqueName = urlParts[urlParts.length - 1];

  // Return the unique name
  return uniqueName;
}
function isInteger(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseInt(str))
  ); // ...and ensure strings of whitespace fail
}

const SingleProduct = () => {
  const userRole = useSelector((state) => state.userRole);
  const [qty, setQty] = useState(0);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [product, setProduct] = useState({});
  const [allReviews, setAllReviews] = useState([]);

  const onIncrease = () => {
    setQty((qty) => qty + 1);
    increaseInLocalCart(product);
    console.log(getLocalCartContent());
  };

  const onDecrease = () => {
    setQty((qty) => qty - 1);
    decreaseInLocalCart(product);
    console.log(getLocalCartContent());
  };

  const handleChange = (event) => {
    setReview(event.target.value);
    if (reviewError) {
      setReviewError("");
    }
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();

    const trimmedReview = review.trim();
    if (!trimmedReview) {
      setReviewError("Vui lòng nhập nội dung đánh giá.");
      return;
    }

    axios
      .post("http://localhost/BTL_Web/src/api/comment-on-product.php", {
        productID: product.ID,
        content: trimmedReview,
      })
      .then((response) => {
        // Reset ô nhập bình luận
        setReview("");
        setReviewError("");

        // Tạo bình luận mới để thêm vào allReviews
        const newComment = {
          ID: response.data.ID || Date.now(), // fallback nếu không có ID
          username: response.data.username || "Bạn",
          userRole: response.data.userRole || "0",
          comment_datetime: new Date().toISOString(), // Thời gian hiện tại
          content: trimmedReview,
        };

        // Cập nhật state allReviews bằng cách thêm bình luận mới vào đầu danh sách
        setAllReviews((prevReviews) => [newComment, ...prevReviews]);
      })
      .catch((error) => {
        setReviewError("Không thể gửi bình luận! Vui lòng thử lại.");
        console.error(error);
      });
  };

  const VNCurrencyFormatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });

  const VNDatetimeFormatter = new Intl.DateTimeFormat("vi", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  // Fecth product
  useEffect(() => {
    async function fetchData() {
      try {
        const uniqueName = getUniqueNameFromUrl(window.location.href);

        // Set qty of product by the current qty in cart
        setQty(getQuantityByUniqueName(uniqueName));

        // Fetch product info by unique name
        const productResponse = await axios.get(
          "http://localhost/BTL_Web/src/api/product-info.php",
          {
            params: isInteger(uniqueName)
              ? {
                id: uniqueName,
              }
              : {
                unique_name: uniqueName,
              },
          }
        );
        setProduct(productResponse.data);

        // Fetch product comments
        const commentsResponse = await axios.get(
          "http://localhost/BTL_Web/src/api/product-comments.php",
          {
            params: { productID: productResponse.data.ID },
          }
        );
        setAllReviews(commentsResponse.data);
      } catch (error) {
        if (error.response.status === 404) {
          // navigate('/error/404');
        }
      }
    }
    fetchData();
  }, []);
  const props = {
    // width: 594,
    // height: 600,
    zoomWidth: 600,
    img: product.image,
  };

  return (
    <>
      <Meta title={product.name} />

      <BreadCrumb title={product.name} />

      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        {/* <div className="container-xxl"> */}
        {" "}
        <div className="row justify-content-center align-items-stretch">
          <div className="col-sm-12 col-md-6 col-lg-5">
            <div className="main-product-image text-center h-100">
              <div>
                {Object.keys(product).length !== 0 && (
                  <ReactImageZoom {...props} />
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{product.name}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">
                  {VNCurrencyFormatter.format(product.price)}
                </p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">
                    ({allReviews.length} đánh giá)
                  </p>
                </div>
                <a className="review-btn" href="#review">
                  Viết đánh giá
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tác giả:</h3>
                  <p className="product-data">{product.author_name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">NXB/NSX:</h3>
                  <p className="product-data">{product.manufacturer_name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Thể loại:</h3>
                  <p className="product-data">{product.category_name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Số lượng còn lại:</h3>
                  <p className="product-data">{product.current_qty}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Số lượng đã bán:</h3>
                  <p className="product-data">{product.sold_qty}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Trạng thái:</h3>
                  <p className="product-data">
                    {product.in_stock ? "Còn hàng" : "Ngừng kinh doanh"}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-3 mb-2">
                  {qty > 0 ? (
                    <div className="">
                      <IconButton
                        aria-label="Remove button"
                        size="small"
                        onClick={onDecrease}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      <span>{qty}</span>
                      <IconButton
                        aria-label="Add button"
                        size="small"
                        onClick={onIncrease}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-30 ms-5">
                      <button
                        className="button border-0 bg-primary"
                        type="button"
                        onClick={onIncrease}
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </Container>

      {product.description && product.description.length !== 0 && (
        <Container class1="description-wrapper py-5 home-wrapper-2">
          <div className="row justify-content-center">
            <div className="col-10">
              <h4>Mô tả</h4>

              <div className="bg-white p-3" style={{ borderRadius: "15px" }}>
                <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
              </div>
            </div>
          </div>
        </Container>
      )}

      <Box
        py={5}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"  // Canh giữa theo chiều ngang
        justifyContent="center"  // Canh giữa theo chiều dọc
        sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}  // Optional: Chiều cao tối thiểu để canh giữa toàn màn hình
      >
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold" color={"primary"}>
          Đánh giá sản phẩm
        </Typography>

        {/* Phần Card thêm đánh giá */}
        <Card
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: "#f9f9f9",
            width: "100%", // Chiều rộng của Card
            maxWidth: "1000px", // Giới hạn chiều rộng tối đa
          }}
        >
          {userRole !== "" ? (
            <Box>
              <Typography variant="h6" mb={2}>
                Viết đánh giá
              </Typography>
              <form onSubmit={handleSubmitReview}>
                <Box mb={2} display="flex" justifyContent="center">
                  <ReactStars
                    count={5}
                    size={30}
                    value={4}
                    edit={true}
                    activeColor="#ffd700"
                  />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Nhập đánh giá của bạn..."
                  value={review}
                  onChange={handleChange}
                  error={!!reviewError}
                  helperText={reviewError}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ display: "block", ml: "auto" }}
                >
                  Gửi đánh giá
                </Button>
              </form>
            </Box>
          ) : (
            <Box textAlign="center" py={2}>
              <Typography variant="body1" color="textSecondary">
                Bạn phải đăng nhập để bình luận
              </Typography>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                  Đăng nhập
                </Button>
              </Link>
            </Box>
          )}
        </Card>

        {/* Phần Card danh sách đánh giá */}
        <Box mt={4} width="100%" maxWidth="1000px">
          {allReviews.length !== 0 ? (
            allReviews.map((review, index) => (
              <Card
                key={review.ID || index} // fallback nếu ID không tồn tại
                variant="outlined"
                sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {review.username ? review.username[0] : "?"}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.username || "Người dùng ẩn"}
                        {review.userRole === "1" && (
                          <Tooltip title="Quản trị viên">
                            <VerifiedUserIcon color="success" sx={{ ml: 1 }} />
                          </Tooltip>
                        )}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {review.comment_datetime
                          ? new Date(review.comment_datetime).toLocaleString("vi-VN")
                          : "Thời gian không xác định"}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <ReactStars
                    count={5}
                    size={20}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {review.content || "Nội dung không có sẵn"}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              Không có bình luận nào
            </Typography>
          )}

        </Box>
      </Box>

    </>
  );
};

export default SingleProduct;
