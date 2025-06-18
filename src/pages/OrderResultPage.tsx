/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:21 AM - 23/05/2025
 *  User: kimin
 **/

import { CheckCircle, XCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

function OrderResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { success } = location.state || {
    success: undefined,
  };

  useEffect(() => {
    if (success == undefined) navigate("/")

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate, success]);

  useEffect(() => {
    document.title = "KimiFashion - Kết quả đặt hàng";
  }, []);


  return (
    <div className='flex items-center justify-center bg-gray-100 px-4 py-10'>
      <div className='max-w-md rounded-2xl bg-white p-8 text-center shadow-lg'>
        {success ? (
          <>
            <CheckCircle className='mx-auto mb-4 h-16 w-16 text-green-500' />
            <h1 className='mb-2 text-2xl font-bold text-green-600'>Đặt hàng thành công!</h1>
            <p className='text-gray-600'>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng sớm nhất có thể.</p>
          </>
        ) : (
          <>
            <XCircle className='mx-auto mb-4 h-16 w-16 text-red-500' />
            <h1 className='mb-2 text-2xl font-bold text-red-600'>Đặt hàng thất bại!</h1>
            <p className='text-gray-600'>Rất tiếc, đã có lỗi xảy ra khi xử lý đơn hàng của bạn. Vui lòng thử lại.</p>
          </>
        )}
        <button className='mt-6 rounded-xl bg-blue-600 px-6 py-2 font-semibold text-white transition-all hover:bg-blue-700' onClick={() => navigate("/")}>
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
}

export default OrderResultPage;
