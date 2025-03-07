/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:08PM - 05/03/2025
 *  User: lam-nguyen
 **/
import { SolarArrowRightLinear } from "@/assets/images/icons/SolarArrowRightLinear.tsx";

function Footer() {
  return (
    <div className={"bg-[#E4E4E4] py-[40px]"}>
      <div className={"xl:mx-[150px] lg:mx-[100px] mx-[50px]"}>
        <div className={"grid grid-cols-4 gap-5 grid-flow-row"}>
          <div className={"md:hidden row-span-1 col-span-4"}>
            <h6>Mua săm</h6>
            <h6>Thông tin doanh nghiệp</h6>
            <h6>Trợ giúp</h6>
          </div>
          <div className={"md:block hidden"}>
            <h6 className={"mb-4 font-bold"}>Mua sắm</h6>
            <ul className={"flex flex-col gap-1"}>
              <li>Giao hàng</li>
              <li>Thanh toán</li>
              <li>Trả hàng</li>
              <li>Tìm cửa hàng</li>
              <li>Magazine</li>
            </ul>
          </div>
          <div className={"md:block hidden"}>
            <h6 className={"mb-4"}>Thông tin doanh nghiệp</h6>
            <ul className={"flex flex-col gap-1"}>
              <li>Cơ hội nghề nghiệp tại KimiFashion</li>
              <li>Giới hiệp về KimiFashion</li>
              <li>Thời trang bền vững - KimiFashion</li>
              <li>Báo trí</li>
              <li>Quan hệ với nhà đầu tư</li>
              <li>Quản trị Doanh nghiệp</li>
            </ul>
          </div>
          <div className={"md:block hidden"}>
            <h6 className={"mb-4"}>Trợ giúp</h6>
            <ul className={"flex flex-col gap-1"}>
              <li>Dịch vụ khách hàng</li>
              <li>Tài khoản của tôi</li>
              <li>Các điều khoản & điều kiện</li>
              <li>Liên hệ</li>
              <li>Thông tin về cookie</li>
              <li>Chính sách bảo mật thông tin thanh toán</li>
              <li>Mua hàng thành công</li>
              <li>Cookie settings</li>
            </ul>
          </div>
          <div className={"col-span-4 md:col-span-1"}>
            <h6 className={"mb-4 md:inline-block block text-center"}>
              Tham gia ngay
            </h6>
            <div>
              <p className={"font-medium md:inline block text-center"}>
                Trở thành thành viên của KimiFashion và tận hưởng ưu đãi 10% cho lần mua
                hàng tiếp theo!
              </p>
            </div>
            <p className={"flex md:justify-start justify-center mt-3"}>
              <a href="#">
                <span className={"text-decoration-underline"}>Đọc thêm</span>
                <span>
									{" "}
                  <SolarArrowRightLinear className={"inline"} />
								</span>
              </a>
            </p>
          </div>
        </div>
        <div className={"flex flex-col gap-4 items-center mt-5"}>
          <div>List social</div>
          <p>
            Nội dung trên trang này được bảo vệ bản quyền và là tài sản của
            KimiFashion.
          </p>
          <div className={"p-4 bg-blue-400"}>Logo</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
