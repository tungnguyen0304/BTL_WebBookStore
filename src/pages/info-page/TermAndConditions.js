import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Container from "../../components/Container";

const TermAndConditions = () => {
  return (
    <>
      <Meta title={"Điều khoản và điều kiện"} />
      <BreadCrumb title="Điều khoản và điều kiện" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2 className="text-center mb-4">Điều khoản sử dụng</h2>

              <p>
                Xin vui lòng đọc kỹ các điều khoản và điều kiện sau đây trước khi sử dụng
                trang web của chúng tôi. Bằng cách truy cập và sử dụng trang web này, bạn đồng
                ý tuân thủ và bị ràng buộc bởi các điều khoản này. Nếu bạn không đồng ý,
                vui lòng không sử dụng trang web của chúng tôi.
              </p>

              <h3 className="mt-4">1. Quyền sở hữu trí tuệ</h3>
              <p>
                Tất cả nội dung trên trang web này, bao gồm nhưng không giới hạn đến văn bản,
                hình ảnh, biểu tượng, đồ họa, âm thanh, video, mã nguồn và phần mềm đều
                thuộc sở hữu của chúng tôi hoặc các bên cấp phép. Mọi quyền được bảo lưu.
              </p>

              <h3 className="mt-4">2. Sử dụng trang web</h3>
              <p>
                Bạn chỉ được phép sử dụng trang web này cho các mục đích hợp pháp và phù hợp
                với các điều khoản quy định. Bạn không được sử dụng trang web để thực hiện
                bất kỳ hành động nào vi phạm pháp luật hoặc xâm phạm quyền lợi của chúng tôi
                hoặc bên thứ ba.
              </p>

              <h3 className="mt-4">3. Thay đổi điều khoản</h3>
              <p>
                Chúng tôi có quyền thay đổi các điều khoản và điều kiện này bất kỳ lúc nào mà
                không cần thông báo trước. Việc bạn tiếp tục sử dụng trang web đồng nghĩa
                với việc bạn chấp nhận và tuân thủ các thay đổi mới.
              </p>

              <h3 className="mt-4">4. Bảo mật</h3>
              <p>
                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và tuân thủ các quy định
                về bảo mật thông tin. Thông tin của bạn sẽ không bị chia sẻ với bên thứ ba
                mà không có sự đồng ý của bạn, ngoại trừ trường hợp pháp luật yêu cầu.
              </p>

              <h3 className="mt-4">5. Giới hạn trách nhiệm</h3>
              <p>
                Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất hoặc thiệt hại nào phát
                sinh do việc sử dụng hoặc không thể sử dụng trang web này. Bạn đồng ý sử dụng
                trang web trên cơ sở tự chịu rủi ro và hoàn toàn chịu trách nhiệm về các
                hành động của mình.
              </p>

              <h3 className="mt-4">6. Liên hệ</h3>
              <p>
                Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào liên quan đến điều khoản và
                điều kiện này, vui lòng liên hệ với chúng tôi qua địa chỉ:
              </p>
              <ul>
                <li>
                  Email: <strong>info@bookstore.com</strong>
                </li>
                <li>
                  Hotline: <strong>0123 456 789</strong>
                </li>
              </ul>

              <p className="mt-4 text-center">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermAndConditions;
