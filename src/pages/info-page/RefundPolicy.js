import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Container from "../../components/Container";

const RefundPolicy = () => {
  return (
    <>
      <Meta title={"Chính sách hoàn trả"} />
      <BreadCrumb title="Chính sách hoàn trả" />

      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2 className="text-center mb-4">Chính sách hoàn trả</h2>

              <p>
                <strong>1. Điều kiện áp dụng hoàn trả:</strong>
                <br />
                Chúng tôi chấp nhận hoàn trả hoặc đổi sản phẩm trong các trường
                hợp sau:
              </p>
              <ul>
                <li>Sản phẩm bị hư hỏng hoặc lỗi do nhà sản xuất.</li>
                <li>Sản phẩm giao không đúng với đơn đặt hàng của khách hàng.</li>
                <li>
                  Sản phẩm còn nguyên tem, nhãn mác và chưa qua sử dụng (trong
                  vòng 7 ngày kể từ khi nhận hàng).
                </li>
              </ul>

              <p>
                <strong>2. Thời gian hoàn trả:</strong>
                <br />
                Quý khách có thể yêu cầu hoàn trả sản phẩm trong vòng{" "}
                <strong>7 ngày</strong> kể từ ngày nhận hàng. Quá thời gian này,
                chúng tôi sẽ không chấp nhận các yêu cầu hoàn trả.
              </p>

              <p>
                <strong>3. Quy trình hoàn trả:</strong>
              </p>
              <ul>
                <li>Bước 1: Liên hệ với bộ phận hỗ trợ khách hàng qua hotline.</li>
                <li>
                  Bước 2: Gửi sản phẩm về địa chỉ của chúng tôi kèm hóa đơn mua
                  hàng.
                </li>
                <li>
                  Bước 3: Chúng tôi xác nhận tình trạng sản phẩm và tiến hành
                  hoàn tiền hoặc đổi hàng.
                </li>
              </ul>

              <p>
                <strong>4. Phương thức hoàn tiền:</strong>
                <br />
                Hoàn tiền sẽ được thực hiện thông qua:
              </p>
              <ul>
                <li>
                  Chuyển khoản ngân hàng (theo thông tin tài khoản do khách hàng
                  cung cấp).
                </li>
                <li>
                  Hoàn tiền vào phương thức thanh toán ban đầu (ví dụ: thẻ tín
                  dụng, ví điện tử).
                </li>
              </ul>

              <p>
                Thời gian hoàn tiền: <strong>5-7 ngày làm việc</strong> kể từ
                khi xác nhận hoàn trả thành công.
              </p>

              <p>
                <strong>5. Phí vận chuyển hoàn trả:</strong>
                <br />
                - Trường hợp lỗi từ phía chúng tôi (giao nhầm hàng, hàng lỗi),
                chúng tôi sẽ chịu hoàn toàn phí vận chuyển.
                <br />
                - Nếu lý do hoàn trả đến từ khách hàng, phí vận chuyển sẽ do
                khách hàng chi trả.
              </p>

              <p>
                <strong>6. Liên hệ hỗ trợ:</strong>
                <br />
                Để yêu cầu hoàn trả hoặc biết thêm thông tin chi tiết, vui lòng
                liên hệ:
              </p>
              <ul>
                <li>Email: <strong>support@yourwebsite.com</strong></li>
                <li>Số điện thoại: <strong>0123 456 789</strong></li>
              </ul>

              <p className="mt-4">
                Chúng tôi luôn nỗ lực để mang đến trải nghiệm mua hàng tốt nhất
                cho bạn. Xin cảm ơn đã tin tưởng và sử dụng dịch vụ của chúng
                tôi!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RefundPolicy;
