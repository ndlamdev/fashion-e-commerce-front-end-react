import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { Label } from "@/components/ui/label.tsx";
import { CategoryType } from "@/types/collection/category.type.ts";
import { CheckboxCustom } from "@/components/checkbox/CheckboxCustom.tsx";
import { Checkbox } from "@/components/ui/checkbox";
import { SameRadioGroup, SameRadioGroupItem } from "@/components/radio-group/SameRadioGroup.tsx";
import { CircleIcon, ListFilterPlus } from "lucide-react";
import AccordionCustom from "@/components/accordion/AccordionCustom.tsx";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer.tsx";
import Input from "@/components/form/Input.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useEffect, useReducer, useState } from "react";
import FilterItem, { FilterReducer } from "@/components/collection/FilterItem.tsx";
import { filterItemInitial } from "@/assets/data/collection/filterItem.data.ts";

export default function CollectionFilter(props: CollectionFilterProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [filterItems, dispatch] = useReducer(FilterReducer, filterItemInitial);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Xử lý khi checkbox thay đổi
  const handleToggle = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  let nextId = 10;
  const handleAddFilterItem = (item: string) => {
    dispatch({
      type: "add",
      payload: {
        id: nextId++,
        name: item,
      },
    });

  };
  if (isDesktop) {
    return (
      <ScrollArea className="overscroll-auto h-dvh">
        <div className={" text-gray-500 text-sm font-bold"}>
          {props.categoryGroup &&
            <AccordionCustom
              isDown
              className={"w-full"}
              trigger={
                <span className={"cursor-pointer"}>
            Nhóm sản phẩm
          </span>
              }
              content={
                <SameRadioGroup>
                  {props.categoryGroup.map((item: CategoryType, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <SameRadioGroupItem onClick={() => handleAddFilterItem(item.name)} className={"cursor-pointer size-5 "} value={item.name}
                                          id={item.id + ""}>
                        <CircleIcon className={"fill-blue-700 absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2"} />
                      </SameRadioGroupItem>
                      <Label className={"cursor-pointer"} htmlFor={item.id + ""}>{item.name}</Label>
                    </div>
                  ))}
                </SameRadioGroup>
              } />
          }
          <AccordionCustom
            className={"w-full"}
            trigger={
              <span className={"cursor-pointer"}>
           Kích cỡ
          </span>
            }
            content={
              <div className={"flex flex-wrap gap-2 items-center"}>
                {props.size.map((item: string, index: number) => (
                  <div key={index} className={"relative border-1 border-gray-300 uppercase px-6 py-2 rounded-sm"}>
                    <CheckboxCustom onCheckedChange={() => {
                      handleToggle(item)
                      dispatch({
                        type: "add",
                        payload: {
                          id: nextId++,
                          name: item
                        }
                      })
                    }} className={"absolute top-0 left-0 border-4 border-none size-full rounded-sm cursor-pointer"}>
                      <div key={index} className={"size-full text-center uppercase px-6 py-2 rounded-sm bg-blue-700 cursor-pointer"}>
                        {item}
                      </div>
                    </CheckboxCustom>
                    {item}
                  </div>
                ))}
              </div>
            } />

          <AccordionCustom
            className={"w-full"}
            trigger={
              <span className={"cursor-pointer"}>
          Màu sắc
          </span>
            }
            content={
              <SameRadioGroup className={"flex flex-wrap items-center gap-4"}>
                {props.color.map((item, index) => (
                  <div key={index} className={"py-3"}>
                    <div className="relative rounded-full size-6  cursor-pointer" style={{ backgroundColor: `${item.codeColor}` }}>
                      <SameRadioGroupItem className={"size-6 border-none rounded-full cursor-pointer"} value={item.name} id={item.codeColor}>
                        <span className={"absolute rounded-full size-6 outline-2 outline-offset-2 outline-blue-700"}></span>
                      </SameRadioGroupItem>
                      <Label className={"cursor-pointer"} htmlFor={item.codeColor}>{item.name}</Label>
                    </div>
                  </div>

                ))}
              </SameRadioGroup>
            } />

          {props.material &&
            <AccordionCustom
              className={"w-full"}
              trigger={
                <span className={"cursor-pointer"}>
         chất liệu
          </span>
              }
              content={
                <div className={""}>
                  {props.material.map((item: string, index: number) => (
                    <div key={index} className={"flex items-center space-x-2 space-y-2 "}>
                      <Checkbox className={"cursor-pointer size-5 data-[state=checked]:bg-blue-700 data-[state=checked]:border-none"} id={item + index} />
                      <Label className={"cursor-pointer"} htmlFor={item + index}>{item}</Label>
                    </div>
                  ))}
                </div>
              } />
          }

          {props.fitWith &&
            <AccordionCustom
              className={"w-full"}
              trigger={
                <span className={"cursor-pointer"}>
               Phù hợp với
            </span>
              }
              content={
                <div className={""}>
                  {props.fitWith.map((item: string, index: number) => (
                    <div key={index} className={"flex items-center space-x-2 space-y-2 "}>
                      <Checkbox className={"cursor-pointer size-5 data-[state=checked]:bg-blue-700 data-[state=checked]:border-none"} id={item + index} />
                      <Label className={"cursor-pointer"} htmlFor={item + index}>{item}</Label>
                    </div>
                  ))}
                </div>
              } />
          }
        </div>
      </ScrollArea>
    );
  }
  return (
    <Drawer>
      <DrawerTrigger><Input className={"w-32 p-1 rounded-full bg-neutral-200 flex"} placeholder={"Bộ lọc"}
                            rightIcon={<ListFilterPlus />} /></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tìm kiếm sản phẩm?</DrawerTitle>
          <DrawerDescription>
            {filterItems.length > 0 ?
              (<div className="max-sm:visible hi' flex items-center space-x-2">
                {filterItems.map((item) => (<FilterItem {...item} key={item.id} />))}
                <span className={"text-sm text-blue-700 hover:underline cursor-pointer"}>xóa lọc</span>
              </div>) : (<span>Vui lòng chọn bộ lọc</span>)}

          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className={"p-0"}>
          <ScrollArea className={"h-100 w-full overflow-y-auto scroll-smooth "}>
            <div className={"p-5 text-gray-500 text-sm font-bold"}>
              {props.categoryGroup &&
                <AccordionCustom
                  isDown
                  className={"w-full"}
                  trigger={
                    <span className={"cursor-pointer"}>
            Nhóm sản phẩm
          </span>
                  }
                  content={
                    <SameRadioGroup>
                      {props.categoryGroup.map((item: CategoryType) => (
                        <div className="flex items-center space-x-2">
                          <SameRadioGroupItem className={"cursor-pointer size-5 "} value={item.name} id={item.id + ""}>
                            <CircleIcon className={"fill-blue-700 absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2"} />
                          </SameRadioGroupItem>
                          <Label className={"cursor-pointer"} htmlFor={item.id + ""}>{item.name}</Label>
                        </div>
                      ))}
                    </SameRadioGroup>
                  } />
              }
              <AccordionCustom
                className={"w-full"}
                trigger={
                  <span className={"cursor-pointer"}>
           Kích cỡ
          </span>
                }
                content={
                  <div className={"flex items-center space-x-2"}>
                    {props.size.map((item: string, index: number) => (
                      <div className={"relative border-1 border-gray-300 uppercase px-6 py-2 rounded-sm"}>
                        <CheckboxCustom className={"absolute top-0 left-0 border-4 border-none size-full rounded-sm cursor-pointer"}>
                          <div key={index} className={"size-full text-center uppercase px-6 py-2 rounded-sm bg-blue-700 cursor-pointer"}>
                            {item}
                          </div>
                        </CheckboxCustom>
                        {item}
                      </div>
                    ))}
                  </div>
                } />

              <AccordionCustom
                className={"w-full"}
                trigger={
                  <span className={"cursor-pointer"}>
          Màu sắc
          </span>
                }
                content={
                  <SameRadioGroup className={"flex flex-wrap items-center space-x-2 "}>
                    {props.color.map((item) => (
                      <div className={"py-3"}>
                        <div className="relative rounded-full size-6  cursor-pointer" style={{ backgroundColor: `${item.codeColor}` }}>
                          <SameRadioGroupItem className={"size-6 border-none rounded-full cursor-pointer"} value={item.name} id={item.codeColor}>
                            <span className={"absolute rounded-full size-6 outline-2 outline-offset-2 outline-blue-700"}></span>
                          </SameRadioGroupItem>
                          <Label className={"cursor-pointer"} htmlFor={item.codeColor}>{item.name}</Label>
                        </div>
                      </div>

                    ))}
                  </SameRadioGroup>
                } />

              {props.material &&
                <AccordionCustom
                  className={"w-full"}
                  trigger={
                    <span className={"cursor-pointer"}>
         chất liệu
          </span>
                  }
                  content={
                    <div className={""}>
                      {props.material.map((item: string, index: number) => (
                        <div className={"flex items-center space-x-2 space-y-2 "}>
                          <Checkbox className={"cursor-pointer size-5 data-[state=checked]:bg-blue-700 data-[state=checked]:border-none"} id={item + index} />
                          <Label className={"cursor-pointer"} htmlFor={item + index}>{item}</Label>
                        </div>
                      ))}
                    </div>
                  } />
              }

              {props.fitWith &&
                <AccordionCustom
                  className={"w-full"}
                  trigger={
                    <span className={"cursor-pointer"}>
               Phù hợp với
            </span>
                  }
                  content={
                    <div className={""}>
                      {props.fitWith.map((item: string, index: number) => (
                        <div className={"flex items-center space-x-2 space-y-2 "}>
                          <Checkbox className={"cursor-pointer size-5 data-[state=checked]:bg-blue-700 data-[state=checked]:border-none"} id={item + index} />
                          <Label className={"cursor-pointer"} htmlFor={item + index}>{item}</Label>
                        </div>
                      ))}
                    </div>
                  } />
              }
            </div>
          </ScrollArea>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}