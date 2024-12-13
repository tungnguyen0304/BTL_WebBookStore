import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Container from "../../components/Container";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title={"Chính sách riêng tư"} />
      <BreadCrumb title="Chính sách riêng tư" />

      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2 className="text-center mb-4">Chính sách bảo mật</h2>

              <p>
                <strong>1. Mục đích và phạm vi thu thập thông tin:</strong>
                <br />
                Chúng tôi thu thập thông tin cá nhân của người dùng nhằm mục
                đích:
              </p>
              <ul>
                <li>Cung cấp dịch vụ và hỗ trợ khách hàng một cách tốt nhất.</li>
                <li>Phân tích, cải thiện trải nghiệm người dùng trên website.</li>
                <li>Thông báo về các chương trình khuyến mãi, ưu đãi.</li>
              </ul>

              <p>
                Các thông tin được thu thập bao gồm: tên, email, số điện thoại,
                địa chỉ và các thông tin cần thiết khác.
              </p>

              <p>
                <strong>2. Phạm vi sử dụng thông tin:</strong>
                <br />
                Chúng tôi cam kết sử dụng thông tin cá nhân của bạn chỉ trong
                phạm vi sau:
              </p>
              <ul>
                <li>Hỗ trợ giao hàng và thực hiện các dịch vụ liên quan.</li>
                <li>
                  Cung cấp thông tin liên quan đến sản phẩm, dịch vụ theo yêu
                  cầu.
                </li>
                <li>Gửi thông tin khuyến mãi, bản tin mới nhất.</li>
                <li>Nghiên cứu, phân tích thị trường và cải thiện dịch vụ.</li>
              </ul>

              <p>
                <strong>3. Thời gian lưu trữ thông tin:</strong>
                <br />
                Thông tin cá nhân sẽ được lưu trữ trong hệ thống của chúng tôi
                cho đến khi bạn có yêu cầu hủy bỏ hoặc chúng tôi không còn nhu
                cầu sử dụng thông tin.
              </p>

              <p>
                <strong>4. Cam kết bảo mật thông tin:</strong>
                <br />
                Chúng tôi cam kết bảo mật tuyệt đối thông tin khách hàng. Mọi
                thông tin cá nhân được thu thập sẽ được lưu trữ an toàn và không
                chia sẻ với bên thứ ba, trừ các trường hợp sau:
              </p>
              <ul>
                <li>Theo yêu cầu của cơ quan pháp luật có thẩm quyền.</li>
                <li>
                  Khi có sự đồng ý của khách hàng trong việc chia sẻ thông tin.
                </li>
              </ul>

              <p>
                <strong>5. Quyền lợi khách hàng:</strong>
                <br />
                Bạn có quyền yêu cầu chỉnh sửa, cập nhật hoặc xóa thông tin cá
                nhân của mình bằng cách liên hệ với chúng tôi qua:
              </p>
              <ul>
                <li>Email: <strong>support@yourwebsite.com</strong></li>
                <li>Số điện thoại: <strong>0123 456 789</strong></li>
              </ul>

              <p>
                <strong>6. Thay đổi chính sách:</strong>
                <br />
                Chúng tôi có thể cập nhật chính sách bảo mật này tùy từng thời
                điểm. Mọi thay đổi sẽ được thông báo cụ thể trên trang web.
              </p>

              <p>
                Việc bạn tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn đồng
                ý với các điều khoản trong chính sách bảo mật này.
              </p>

              <p className="mt-4">
                Xin cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
