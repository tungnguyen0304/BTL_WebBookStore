import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import Meta from "../../components/Meta";

const ShippingPolicy = () => {
  return (
    <>
      <Meta title={"Chính sách vận chuyển"} />
      <BreadCrumb title="Chính sách vận chuyển" />

      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2 className="text-center mb-4">Chính sách vận chuyển</h2>

              <p>
                <strong>1. Phạm vi vận chuyển:</strong>
                <br />
                Chúng tôi cung cấp dịch vụ giao hàng trên toàn quốc. Các khu vực
                ngoại thành và vùng sâu vùng xa có thể phát sinh thêm thời gian
                và chi phí vận chuyển.
              </p>

              <p>
                <strong>2. Thời gian giao hàng:</strong>
                <br />
                - Đối với khu vực nội thành: 2-3 ngày làm việc.<br />
                - Đối với khu vực ngoại thành: 3-5 ngày làm việc.<br />
                - Đối với khu vực vùng sâu, vùng xa: 5-7 ngày làm việc.
              </p>

              <p>
                Lưu ý: Thời gian giao hàng không bao gồm ngày lễ, tết và ngày
                cuối tuần.
              </p>

              <p>
                <strong>3. Phí vận chuyển:</strong>
                <br />
                Phí vận chuyển sẽ được tính dựa trên địa chỉ nhận hàng và khối
                lượng đơn hàng.
              </p>
              <ul>
                <li>Miễn phí vận chuyển cho đơn hàng từ 500.000 VNĐ trở lên.</li>
                <li>
                  Đối với các đơn hàng dưới 500.000 VNĐ: phí vận chuyển từ 20.000
                  VNĐ - 50.000 VNĐ tùy khu vực.
                </li>
              </ul>

              <p>
                <strong>4. Quy trình giao hàng:</strong>
              </p>
              <ul>
                <li>
                  Sau khi đặt hàng thành công, chúng tôi sẽ xác nhận đơn hàng qua
                  email hoặc điện thoại.
                </li>
                <li>
                  Hàng hóa sẽ được đóng gói cẩn thận và gửi đến đơn vị vận chuyển
                  trong vòng 24 giờ.
                </li>
                <li>
                  Quý khách có thể theo dõi trạng thái đơn hàng qua mã vận đơn
                  được cung cấp.
                </li>
              </ul>

              <p>
                <strong>5. Trách nhiệm khi giao hàng:</strong>
                <br />
                - Nếu hàng hóa bị hư hỏng hoặc thất lạc trong quá trình vận
                chuyển, chúng tôi sẽ chịu hoàn toàn trách nhiệm và tiến hành đổi
                hàng mới cho quý khách.<br />
                - Quý khách vui lòng kiểm tra tình trạng hàng hóa khi nhận và
                thông báo ngay cho chúng tôi nếu có vấn đề phát sinh.
              </p>

              <p>
                <strong>6. Thay đổi địa chỉ giao hàng:</strong>
                <br />
                Nếu quý khách cần thay đổi địa chỉ giao hàng, vui lòng liên hệ
                bộ phận chăm sóc khách hàng qua email hoặc số điện thoại trước
                khi đơn hàng được vận chuyển.
              </p>

              <p>
                <strong>7. Liên hệ hỗ trợ:</strong>
                <br />
                Nếu có bất kỳ câu hỏi hoặc vấn đề nào liên quan đến việc giao
                hàng, quý khách vui lòng liên hệ:
              </p>
              <ul>
                <li>
                  Email: <strong>support@yourwebsite.com</strong>
                </li>
                <li>
                  Hotline: <strong>0123 456 789</strong>
                </li>
              </ul>

              <p className="mt-4">
                Chúng tôi cam kết mang đến dịch vụ giao hàng nhanh chóng và an
                toàn nhất cho khách hàng. Xin cảm ơn quý khách đã tin tưởng và
                ủng hộ!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ShippingPolicy;
