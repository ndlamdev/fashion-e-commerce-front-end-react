/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:51PM - 05/03/2025
 *  User: lam-nguyen
 **/

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsCancel01 } from "@/assets/images/icons/HugeiconsCancel01.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";
import useScrolled from "@/utils/helper/use-scrolled.ts";
import VerticalMenuProps from "@/components/menu/props/vertical-menu.prop.ts";
import { useDispatch } from "react-redux";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import logo from "@/assets/images/icons/logo.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import LocalStorage from "@/utils/helper/LocalStorage";
import { Languages } from "@/configs/i18n.config";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/configs/store.config";

function VerticalMenu({ showMenu, onHidden, onAnimationComplete, onExitComplete }: VerticalMenuProps) {
  const [hiddenMenu, setHiddenMenu] = useState<boolean>(true);
  const [, scrollY] = useScrolled();
  const dispatch = useDispatch();
  const { access_token, user } = useAppSelector((state) => state.auth);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setHiddenMenu(!showMenu);
  }, [showMenu]);

  return (
    <AnimatePresence initial={false} onExitComplete={onExitComplete}>
      {!hiddenMenu && (
        <motion.div
          initial={{ left: -1000 }}
          animate={{ left: 0 }}
          transition={{ duration: 0.75 }}
          exit={{ left: -1000 }}
          onUpdate={(value) => {
            if (value.left == 0) onAnimationComplete?.();
          }}
          className={"absolute top-0 z-999 w-full bg-[#E5E5E5] lg:hidden"}>
          <div className={`sticky top-3 z-1 flex h-[40px] items-center justify-end ${scrollY < 20 ? "pe-3" : "pe-1"}`}>
            <div
              className={`${scrollY >= 20 && "rounded-full bg-gray-100 p-2"}`}
              onClick={() => {
                setHiddenMenu(true);
                onHidden?.();
              }}>
              <HugeiconsCancel01 />
            </div>
          </div>
          <div className={"absolute top-3 left-4 h-[40px] w-[40px]"}>
            <img src={logo} alt='KimiFashion Logo' className={"!h-10 !w-10 rounded-sm"} />
          </div>
          <div className={"mx-3 my-4 flex flex-col items-center gap-3 rounded-2xl bg-white p-3"}>
            <Tabs defaultValue='male' className='w-full'>
              <TabsList className={"rounded-0 grid w-full grid-cols-3 border-b-1 border-gray-500 bg-[none]"}>
                <TabsTrigger value='male'>{t("header.product_types.male")}</TabsTrigger>
                <TabsTrigger value='female'>{t("header.product_types.female")}</TabsTrigger>
                <TabsTrigger value='sport'>{t("header.product_types.sport")}</TabsTrigger>
              </TabsList>
              <TabsContent value='male'>
                <div className={"w-full px-[20px]"}>
                  <Carousel className='w-full'>
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <Card>
                            <CardContent className='flex aspect-[6/2] items-center justify-center p-6'>
                              <span className='text-4xl font-semibold'>{index + 1}</span>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className={"rounded-circle left-[-15px] size-10 bg-gray-200"} />
                    <CarouselNext className={"rounded-circle right-[-15px] size-10 bg-gray-200"} />
                  </Carousel>
                  <button className={"my-3 w-full rounded bg-gray-200 p-2"}>{t("header.explore.men")}</button>
                  <Accordion
                    type='single'
                    collapsible
                    onValueChange={(value) => {
                      console.log(value);
                    }}>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger className={"items-center pb-0 font-bold"}>
                        <h6 className={"mb-0"}>{t("header.outstanding")}</h6>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className={"flex flex-col"}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <li
                              key={`asfafasfa${index}`}
                              className={"rounded p-2 active:bg-gray-200"}
                              onClick={(event) => {
                                console.log(event.currentTarget.textContent);
                              }}>
                              {index}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                      <AccordionTrigger className={"items-center pb-0 font-bold"}>
                        <h6 className={"mb-0"}>{t("header.outstanding")}</h6>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className={"flex flex-col"}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <li
                              key={`asdfasdgag${index}`}
                              className={"rounded p-2 active:bg-gray-200"}
                              onClick={(event) => {
                                console.log(event.currentTarget.textContent);
                              }}>
                              {index}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              <TabsContent value='female'>
                <div className={"w-full px-[20px]"}>
                  <Carousel className='w-full'>
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <Card>
                            <CardContent className='flex aspect-[6/2] items-center justify-center p-6'>
                              <span className='text-4xl font-semibold'>{index + 6}</span>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className={"rounded-circle left-[-15px] size-10 bg-gray-200"} />
                    <CarouselNext className={"rounded-circle right-[-15px] size-10 bg-gray-200"} />
                  </Carousel>
                  <button className={"my-3 w-full rounded bg-gray-200 p-2"}>{t("header.explore.women")}</button>
                </div>
              </TabsContent>
              <TabsContent value='sport'>
                <div className={"w-full px-[20px]"}>
                  <Carousel className='w-full'>
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <Card>
                            <CardContent className='flex aspect-[6/2] items-center justify-center p-6'>
                              <span className='text-4xl font-semibold'>{index + 11}</span>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className={"rounded-circle left-[-15px] size-10 bg-gray-200"} />
                    <CarouselNext className={"rounded-circle right-[-15px] size-10 bg-gray-200"} />
                  </Carousel>
                  <button className={"my-3 w-full rounded bg-gray-200 p-2"}>{t("header.explore.sport")}</button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className={"size bg-white px-10 pt-4 pb-56"}>
            <ul className={"flex flex-col"}>
              <li className={"hover::bg-gray-200 rounded px-3 py-2 active:bg-gray-200"}>{t("header.customer_care_center")}</li>
              <li className={"hover::bg-gray-200 rounded px-3 py-2 active:bg-gray-200"}>{t("header.about")}</li>
              <li className={"hover::bg-gray-200 rounded px-3 py-2 active:bg-gray-200"}>{t("header.blog")}</li>
              {(!access_token || !user) && (<li
                className={"hover::bg-gray-200 rounded px-3 py-2 active:bg-gray-200"}
                onClick={() => {
                  dispatch(showDialog("login"));
                }}>
                {t("header.login")}
              </li>)}
              <li className={"rounded px-3 py-2"}>
                <Select defaultValue={LocalStorage.getValue("LANGUAGE") ?? "vi"} onValueChange={(value) => {
                  i18n.changeLanguage(value);
                  LocalStorage.setValue("LANGUAGE", value);
                }}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Ngôn ngữ' />
                  </SelectTrigger>
                  <SelectContent className={"z-70"}>
                    {Object.keys(Languages).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {t(`language.${lang}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VerticalMenu;
