import axios from 'axios'
import { Slide } from 'react-slideshow-image'
import React, { useState, useEffect } from 'react'
import Meta from '../../components/Meta'
import 'react-slideshow-image/dist/styles.css'
import Container from '../../components/Container'
import ProductCard from '../../components/ProductCard'

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: '300px'
  // height: "30vh",
}

const slideImages = [
  {
    url: 'images/flash_sale.jpg'
  },
  {
    url: 'images/flash_sale2.jpg'
  },
  {
    url: 'images/flash_sale3.jpg'
  }
]

const Home = () => {
  const [categoriesList, setCategoriesList] = useState([])

  const [products, setProducts] = useState({})

  useEffect(() => {
    axios
      .get('http://localhost/BTL_Web/src/api/product-info-option.php')
      .then(response => {
        return response.data
      })
      .then(response => {
        setCategoriesList(JSON.parse(response.categoriesList))
      })
      .catch(error => {
        console.log(error)
      })

    axios
      .get('http://localhost/BTL_Web/src/api/products-homepage.php')
      .then(response => {
        return response.data
      })
      .then(response => {
        setProducts(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className='py-5'>
      <Meta title={'Trang chủ'} />

      {/* Wrapper cho Slider và Banner */}
      <Container
        className="home-wrapper-2 py-5"
        style={{ backgroundColor: '#f4f7fc', paddingTop: '100px', paddingBottom: '100px' }}
      >
        <div className="row g-4 align-items-start mb-5">
          {/* Slider hình lớn */}
          <div className="col-sm-12 col-md-6">
            <Slide autoplay arrows>
              {slideImages.map((slideImage, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${slideImage.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '420px',
                    borderRadius: '15px',
                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    display: 'flex',
                    alignItems:'center',
                    justifyContent:'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: '#fff',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                    }}
                  >
                    Flash Sale - Ưu đãi hấp dẫn!
                  </div>
                </div>
              ))}
            </Slide>
          </div>

          {/* 4 Banners nhỏ */}
          <div className="col-sm-12 col-md-6">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              {['images/catbanner-01.jpg', 'images/catbanner-02.jpg', 'images/catbanner-03.jpg', 'images/catbanner-04.jpg'].map(
                (src, index) => (
                  <div
                    key={index}
                    className="small-banner position-relative overflow-hidden"
                    style={{
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      width: '48%',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    <img
                      src={src}
                      className="img-fluid rounded-3"
                      alt="small banner"
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                    <div
                      className="position-absolute top-0 w-100 h-100 d-flex align-items-center justify-content-center"
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        fontWeight: '600',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                    >
                      Xem ngay
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Danh sách sản phẩm nổi bật */}
      {categoriesList.length !== 0 &&
        Object.keys(products).length !== 0 &&
        categoriesList.map(
          (category, index) =>
            products[category.ID].length !== 0 && (
              <div className='py-5'>
                <Container
                  key={index}
                  className="featured-wrapper py-5"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    marginBottom: '40px', // Khoảng cách dưới giữa các section
                    marginTop: '20px',    // Khoảng cách trên
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="row mb-3">
                    <div className="col-8">
                      <h3 className="section-heading text-primary">{category.name}</h3>
                    </div>
                    <div className="col-4 text-end">
                      <a href={'/category/' + category.unique_name} className="btn btn-outline-primary btn-sm">
                        Xem tất cả
                      </a>
                    </div>
                  </div>

                  {/* Grid với khoảng cách gọn gàng */}
                  <div className="row g-4"> {/* g-4 tăng khoảng cách giữa các thẻ sản phẩm */}
                    {products[category.ID].map((product) => (
                      <div key={product.ID} className="col-6 col-sm-4 col-md-3">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
            )
        )}

      {/* Sản phẩm bán chạy */}
      {Object.keys(products).length !== 0 && products['top_sellers'].length !== 0 && (
        <div className='py-4'>
          <Container
            className="popular-wrapper py-5"
            style={{
              backgroundColor: '#f4f9f6',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '40px', // Tạo khoảng cách với phần sau
              marginTop: '20px',
            }}
          >
            <div className="row mb-3">
              <div className="col-12">
                <h3 className="section-heading text-success">Sản phẩm bán chạy</h3>
              </div>
            </div>

            {/* Grid với khoảng cách thoáng hơn */}
            <div className="row g-4"> {/* g-4 tạo khoảng cách giữa các thẻ */}
              {products['top_sellers'].map((product) => (
                <div key={product.ID} className="col-6 col-sm-4 col-md-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}

    </div>

  )
}

export default Home
