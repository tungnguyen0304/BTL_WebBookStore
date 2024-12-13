import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../../components/Container";

const Contact = () => {
  return (
    <>
      <Meta title={"Liên hệ"} />
      <BreadCrumb title="Liên hệ với chúng tôi" />

      <Container class1="contact-wrapper py-5 home-wrapper-2" style={{ backgroundColor: '#f9f9f9' }}>
        {/* Google Map Section */}
        <div className="row mb-4">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15672.370547948087!2d106.8053863!3d10.8805585!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a5568c997f%3A0xdeac05f17a166e0c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJBIUUcgVFAuSENN!5e0!3m2!1svi!2s!4v1681695529036!5m2!1svi!2s"
              className="w-100 rounded"
              style={{ height: "450px", boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form and Info Section */}
        <div className="row">
          <div className="col-md-7">
            <div className="p-4 rounded bg-white shadow-sm">
              <h3 className="contact-title mb-4 text-primary">Gửi tin nhắn cho chúng tôi</h3>
              <form className="d-flex flex-column gap-3">
                <input
                  type="text"
                  className="form-control p-3"
                  placeholder="Tên của bạn"
                  style={{ borderRadius: "8px" }}
                />
                <input
                  type="email"
                  className="form-control p-3"
                  placeholder="Email của bạn"
                  style={{ borderRadius: "8px" }}
                />
                <input
                  type="tel"
                  className="form-control p-3"
                  placeholder="Số điện thoại"
                  style={{ borderRadius: "8px" }}
                />
                <textarea
                  className="form-control p-3"
                  cols="30"
                  rows="4"
                  placeholder="Tin nhắn"
                  style={{ borderRadius: "8px" }}
                ></textarea>
                <button className="btn btn-primary btn-lg mt-2" type="submit" style={{ borderRadius: "8px" }}>
                  Gửi
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-5 mt-4 mt-md-0">
            <div className="p-4 rounded bg-white shadow-sm">
              <h3 className="contact-title mb-4 text-primary">Liên hệ với chúng tôi</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-3 d-flex align-items-start gap-3">
                  <AiOutlineHome className="fs-4 text-secondary" />
                  <div>
                    <h6 className="mb-1">Địa chỉ</h6>
                    <p className="mb-0 text-muted">
                      Cơ sở Dĩ An: Khu phố Tân Lập, Phường Đông Hòa, <br />
                      TP. Dĩ An, Tỉnh Bình Dương
                    </p>
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start gap-3">
                  <BiPhoneCall className="fs-4 text-secondary" />
                  <div>
                    <h6 className="mb-1">Số điện thoại</h6>
                    <a href="tel:+840123456789" className="text-muted">
                      +84 0123456789
                    </a>
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start gap-3">
                  <AiOutlineMail className="fs-4 text-secondary" />
                  <div>
                    <h6 className="mb-1">Email</h6>
                    <a href="mailto:bkelhcmut@hcmut.edu.vn" className="text-muted">
                      bkelhcmut@hcmut.edu.vn
                    </a>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <BiInfoCircle className="fs-4 text-secondary" />
                  <div>
                    <h6 className="mb-1">Giờ làm việc</h6>
                    <p className="mb-0 text-muted">Thứ Hai - Thứ Sáu: 8 AM – 6 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
