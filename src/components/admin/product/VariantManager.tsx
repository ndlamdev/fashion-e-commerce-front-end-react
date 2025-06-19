/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:22 PM - 16/04/2025
 *  User: Lam Nguyen
 **/
import { HumbleiconsPlusCircle } from "@/assets/images/icons/HumbleiconsPlusCircle.tsx";
import { CodexMenu } from "@/assets/images/icons/CodexMenu.tsx";
import { DetailedHTMLProps, HTMLAttributes, useCallback, useEffect, useState } from "react";
import OptionVariantType from "@/types/admin/option-variant.type.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Input from "@/components/form/Input";
import { Trash } from "lucide-react";

function VariantManager(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { setOptions?: (options: Record<string, string[]>) => void }) {
  const [optionVariants, setOptionVariants] = useState<OptionVariantType[]>([]);

  const createNewOption = () => {
    setOptionVariants((prevState) => [...prevState, { name: "", values: [{ newValue: "", oldValue: "" }], canAddNewValueOption: true }]);
  };

  const onChangeValueOptionVariant = (indexOptionVariant: number, indexValueOptionVariant: number, value: string) => {
    const optionVariant = optionVariants[indexOptionVariant];
    const valueOptionVariant = optionVariant.values[indexValueOptionVariant];
    if (indexValueOptionVariant == optionVariant.values.length - 1 && value.length > valueOptionVariant.oldValue.length && optionVariant.canAddNewValueOption) {
      optionVariant.canAddNewValueOption = false;
      optionVariant.values.push({ oldValue: "", newValue: "" });
    }

    setOptionVariants((prevState) =>
      prevState.map((item, i) =>
        indexOptionVariant === i
          ? {
            ...optionVariant,
            values: item.values.map((preValueOption, indexPreValueOption) =>
              indexPreValueOption == indexValueOptionVariant ? { ...preValueOption, oldValue: preValueOption.newValue, newValue: value } : preValueOption,
            ),
          }
          : item,
      ),
    );
  };

  const onDeleteValueOptionVariant = useCallback((indexOptionVariant: number, indexValueOptionVariant: number) => {
    const optionVariant = optionVariants[indexOptionVariant];
    if (optionVariant.values.length <= 1) return;
    setOptionVariants((prevState) =>
      prevState.map((item, i) =>
        indexOptionVariant === i
          ? {
            ...item,
            values: item.values.filter((_, index) => index !== indexValueOptionVariant),
          }
          : item,
      ),
    );
  }, [optionVariants]);

  const onChangeOptionVariantName = (indexOptionVariant: number, value: string) => {
    setOptionVariants((prevState) =>
      prevState.map((item, i) =>
        indexOptionVariant === i
          ? {
            ...item,
            name: value,
          }
          : item,
      ),
    );
  };

  const onFocusValueOptionVariant = (indexOptionVariant: number) => {
    setOptionVariants((prevState) =>
      prevState.map((item, i) =>
        indexOptionVariant === i
          ? {
            ...item,
            canAddNewValueOption: true,
          }
          : item,
      ),
    );
  };

  const onBlurValueOptionVariant = (indexOptionVariant: number, indexValueOptionVariant: number) => {
    const optionVariant = optionVariants[indexOptionVariant];
    if (optionVariant.values[indexValueOptionVariant].newValue.length < 1) {
      optionVariant.values[indexValueOptionVariant].newValue = optionVariant.values[indexValueOptionVariant].oldValue;
    }

    setOptionVariants((prevState) =>
      prevState.map((item, i) =>
        indexOptionVariant === i
          ? {
            ...optionVariant,
          }
          : item,
      ),
    );
  };

  useEffect(() => {
    const options: Record<string, string[]> = {}
    optionVariants.forEach((optionVariant) => {
      if (!options[optionVariant.name]) {
        options[optionVariant.name] = [];
      }
      optionVariant.values.forEach(value => options[optionVariant.name].push(value.newValue));
    });
  }, [optionVariants])

  return (
    <div {...props}>
      {!optionVariants.length ? (
        <button className={"flex w-[280px] items-center gap-2 rounded-md p-1 text-sm hover:bg-gray-100"} onClick={createNewOption}>
          <HumbleiconsPlusCircle width={15} height={15} />
          Thêm tùy chọn như màu sắc, kích thước
        </button>
      ) : (
        <div className={"rounded-md border-1 border-gray-200"}>
          {optionVariants.map((optionVariant, indexOptionVariant) => (
            <div className={"flex flex-row border-b-1 border-gray-200 p-4"}>
              <div className={"w-8"}>
                <CodexMenu color={"gray"} className={"mt-7.5"} />
              </div>
              <div className={"flex flex-1 flex-col gap-1"}>
                <label className={"text-sm"}>
                  <span>Loại tùy chọn</span>
                  <Select defaultValue={"COLOR"} onValueChange={(value) => onChangeOptionVariantName(indexOptionVariant, value)}>
                    <SelectTrigger className={`mt-1 w-full`}>
                      <SelectValue placeholder='Chọn loại tùy chọn' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='COLOR'>Màu sắc</SelectItem>
                      <SelectItem value='SIZE'>Kích thước</SelectItem>
                    </SelectContent>
                  </Select>
                </label>
                <div>
                  <label className={"text-sm"}>Giá trị tùy chọn</label>
                  {optionVariant.values.map((valueOptionVariant, indexValueOptionVariant) => (
                    <Input
                      placeholder={"Giá trị tùy chọn"}
                      className={"mb-0.75 border-1 border-gray-300 px-2 py-1 rounded-md flex items-center justify-center"}
                      value={valueOptionVariant.newValue}
                      onFocus={() => onFocusValueOptionVariant(indexOptionVariant)}
                      onBlur={() => onBlurValueOptionVariant(indexOptionVariant, indexValueOptionVariant)}
                      onChange={(event) => onChangeValueOptionVariant(indexOptionVariant, indexValueOptionVariant, event.target.value)}
                      rightIcon={<Trash className={" ml-2 w-4 text-red-600 opacity-0 hover:opacity-100 transition-all duration-300"} onClick={() => onDeleteValueOptionVariant(indexOptionVariant, indexValueOptionVariant)} />}
                      inputClassName={"text-sm"}
                    />
                  ))}
                </div>
                <div className={"mt-2 flex justify-between"}>
                  <button className={"rounded-md border-1 border-gray-300 px-2 py-0.5 text-sm text-red-500 hover:bg-gray-100"}
                    onClick={() => {
                      setOptionVariants((prevState) => prevState.filter((_, i) => i !== indexOptionVariant));
                    }}
                  >Xóa</button>
                  <button className={"rounded-md border-1 border-gray-300 bg-[rgba(0,0,0,0.8)] px-2 py-0.5 text-sm text-white hover:bg-black"}>Xong</button>
                </div>
              </div>
            </div>
          ))}
            <div className={"p-1 hover:bg-gray-100"}>
              <button className={"flex w-full items-center gap-2 p-1 text-sm"} onClick={createNewOption}>
                <HumbleiconsPlusCircle width={15} height={15} />
              Thêm tùy chọn khác
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VariantManager;
