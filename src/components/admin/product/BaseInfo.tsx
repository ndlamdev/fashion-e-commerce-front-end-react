/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:42 PM - 16/04/2025
 *  User: kimin
 **/

import { Input } from "@/components/ui/input.tsx";
import QuillEditor from "@/components/editor/QuillEditor.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { DetailedHTMLProps, HTMLAttributes, useContext, useEffect } from "react";
import CreateProductPageContext from "@/context/CreateProductPageContext.tsx";
import { useGetAllCollectionQuery } from "@/redux/api/collection.api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { showDialog } from "@/redux/slice/dialog.slice";

function BaseInfo(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const createProductPageContext = useContext(CreateProductPageContext);
  const { data, isError } = useGetAllCollectionQuery()
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isError) return;
    toast.error("Không thể tải danh sách bộ sưu tập. Vui lòng thử lại sau.");
  }, [isError])

  return (
    <div {...props}>
      <label>
        <span>Tên sản phẩm</span>
        <Input id={"title-product"} className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
      </label>
      <div>
        <label htmlFor={"description-product"}>Mô tả</label>
        <QuillEditor className={"mt-1"} />
      </div>
      <div>
        <label htmlFor={"description-product"}>Đa phương tiện</label>
        <div
          className={`mt-1 flex h-35 max-h-50 items-center justify-center rounded-xl border-dashed ${createProductPageContext.borderStyle}`}
          onClick={() => { }}>
          <div className={"flex items-center gap-2"}>
            <button className={"rounded-sm border-1 border-gray-600 bg-white p-1 text-sm text-black hover:bg-gray-100"} onClick={() => { }}>
              Tải lên mới
            </button>
            <p className={"text-sm cursor-pointer hover:bg-gray-200 p-1 rounded-sm"} onClick={() => dispatch(showDialog("choose-media"))}>Chọn từ hiện có</p>
          </div>
        </div>
      </div>
      <div>
        <p>Danh mục</p>
        <Select>
          <SelectTrigger className={`mt-1 w-full ${createProductPageContext.borderStyle}`}>
            <SelectValue placeholder={"Chọn danh mục"} />
          </SelectTrigger>
          <SelectContent>
            {data?.data.map(it => (<SelectItem value={it.id}>{it.title}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default BaseInfo;
