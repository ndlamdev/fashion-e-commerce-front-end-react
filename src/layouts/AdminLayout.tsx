/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 09:10 AM - 14/04/2025
 *  User: Lam Nguyen
 **/

import { VerticalMenu } from "@/components/admin/menu/VerticalMenu.tsx";
import DialogConfirm from "@/components/dialog/DialogConfirm";
import { cartApi } from "@/redux/api/cart.api";
import authenticationService from "@/services/authentication.service";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState<boolean>(false);


  const handleLogout = () => {
    authenticationService
      .logout()
      .then(() => {
        navigate("/");
        setOpenDialog(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(cartApi.util.invalidateTags(["Cart"]));
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout failed");
      });
  };

  return (
    <>
      <div className={"flex h-[100vh] flex-col bg-black"}>
        <div className={"flex h-10 items-center justify-center text-white"}>
          <div className={"hidden items-center justify-center lg:flex"}>
            <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>Về KimiFashion</div>
            <span className={"text-gray-400"}>|</span>
            <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>Blog</div>
            <span className={"text-gray-400"}>|</span>
            <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>Trung tâm CSKH</div>
            <span className={"text-gray-400"}>|</span>
            <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"} onClick={() => navigate("/")}>
              Quay về trang chủ
            </div>
            <span className={"text-gray-400"}>|</span>
            <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"} onClick={() => setOpenDialog(true)}>
              Đăng Xuất
            </div>
          </div>
        </div>
        <div className={"grid flex-1 grid-cols-12 grid-rows-1 overflow-y-hidden rounded-tl-2xl rounded-tr-2xl border"}>
          <div className={"col-span-3 hidden h-full bg-neutral-200 md:block"}>
            <VerticalMenu />
          </div>
          <div className={"bg-red scroll-show col-span-12 overflow-y-auto bg-gray-100 p-5 md:col-span-9"}>
            <Outlet />
          </div>
        </div>
      </div>
      <DialogConfirm
        open={openDialog}
        onClickCancel={() => {
          setOpenDialog(false);
        }}
        onClickSubmit={handleLogout}
      /></>

  );
}

export default AdminLayout;
