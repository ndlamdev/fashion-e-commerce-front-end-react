/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:46AM - 05/03/2025
 * User: lam-nguyen
 **/
import { FaSolidUserAlt } from "@/assets/images/icons/FaSolidUserAlt.tsx";
import logo from "@/assets/images/icons/logo.jpg";
import { LucideSearch } from "@/assets/images/icons/LucideSearch.tsx";
import { SolarArrowRightLinear } from "@/assets/images/icons/SolarArrowRightLinear";
import { SolarHamburgerMenuLinear } from "@/assets/images/icons/SolarHamburgerMenuLinear.tsx";
import { SolarHeartBold } from "@/assets/images/icons/SolarHeartBold.tsx";
import ShoppingBag from "@/components/cart/ShoppingBag.tsx";
import ShoppingBagItem from "@/components/cart/ShoppingBagItem.tsx";
import HeaderProps from "@/components/header/props/header-prop.ts";
import Searcher from "@/components/header/Searcher.tsx";
import QuickSearchProduct from "@/components/product/QuickSearchProduct.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Languages } from "@/configs/i18n.config";
import { RootState } from "@/configs/store.config.ts";
import { useGetCartQuery } from "@/redux/api/cart.api.ts";
import { useQuickSearchQuery } from "@/redux/api/product.api";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import { useGetCollectionsQuery } from "@/services/collection.service.ts";
import { CollectionEnum, CollectionValue } from "@/utils/enums/collection.enum.ts";
import jwtHelper from "@/utils/helper/jwtHelper";
import useScrolled from "@/utils/helper/use-scrolled.ts";
import { debounce } from "lodash";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import LocalStorage from "@/utils/helper/LocalStorage";

function Header({ showMenu }: HeaderProps) {
  const [, scrollY] = useScrolled();
  // const [scrollUp, setScrollUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token, user } = useSelector((state: RootState) => state.auth);
  const [searchAction, setSearchAction] = useState<"SEARCH" | "EXIT" | "HIDDEN">("HIDDEN");
  const { data, isLoading } = useGetCollectionsQuery();
  const [type, setType] = useState<CollectionEnum>(CollectionEnum.MALE);
  const { data: cartData } = useGetCartQuery();
  const { t, i18n } = useTranslation();

  const [title, setTitle] = useState<string>();
  const { data: dataQuickSearch, isLoading: isLoadingQuickSearch, isError: isErrorQuickSearch } = useQuickSearchQuery(title, { skip: !title });

  const debounceSearch = debounce((title: string) => {
    console.log("title", title, !title.length);
    setTitle(title);
  }, 500);

  const onSearchHandler = useCallback(
    (title: string) => {
      if (!title) return;
      navigate("/collection", {
        state: {
          prompt: title,
        },
      });
      setSearchAction("HIDDEN");
    },
    [navigate],
  );

  const isRoleAdmin = useMemo(() => {
    if (!access_token) return false;
    const payload = jwtHelper.getPayload(access_token);
    return payload && payload.roles.includes("ROLE_ADMIN")
  }, [access_token])


  return (
    <div>
      <motion.header className={"sticky top-0 z-2 bg-white"} initial={{ top: 0 }} animate={{ top: scrollY >= 100 ? -40 : 0 }} transition={{ duration: 0.75 }}>
        <div className={`relative flex w-full items-center justify-center gap-3 bg-gray-500 text-gray-100`}>
          <div className={"hidden items-center justify-center lg:flex"}>
            <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>{t("header.about")}</div>
            <span className={"text-gray-400"}>|</span>
            <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>{t("header.blog")}</div>
            <span className={"text-gray-400"}>|</span>
            <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>{t("header.customer_care_center")}</div>
            {isRoleAdmin && <>
              <span className={"text-gray-400"}>|</span>
              <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"} onClick={() => navigate("/admin")}>{t("header.admin")}</div>
            </>}
            {(!access_token || !user) && (
              <>
                <span className={"text-gray-400"}>|</span>
                <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"} onClick={() => dispatch(showDialog("login"))}>
                  {t("header.login")}
                </div>
              </>
            )}
            <span className={"text-gray-400"}>|</span>
            <div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>
              <Select defaultValue={LocalStorage.getValue("LANGUAGE") ?? "vi"} onValueChange={(value) => {
								i18n.changeLanguage(value);
								LocalStorage.setValue("LANGUAGE", value);
								window.location.reload()
							}}>
                <SelectTrigger className='h-5 px-1'>
                  <SelectValue placeholder={t("language.title")} />
                </SelectTrigger>
                <SelectContent className={"z-70"}>
                  {Object.keys(Languages).map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {t(`language.${lang}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className={"align-items-center grid grid-cols-7 grid-rows-1 px-4 py-1 lg:mx-8"}>
          <div className={"col-span-2 flex items-center gap-2"}>
            <div onClick={showMenu} className={"lg:hidden"}>
              <SolarHamburgerMenuLinear width={30} height={30} />
            </div>

            <div className={"hidden lg:block"}>
              <div className={"flex size-18 cursor-pointer items-center justify-center bg-blue-400"} onClick={() => navigate("/")}>
                <img src={logo} alt='logo.jpg' />
              </div>
            </div>
            <div className={"search-component relative block lg:hidden"}>
              <AnimatePresence initial={true} onExitComplete={() => setSearchAction("HIDDEN")}>
                {searchAction === "SEARCH" && (
                  <motion.div
                    animate={{ width: "100vw", opacity: 1, left: -54 }}
                    initial={{ width: 0, opacity: 0, left: 0 }}
                    exit={{ width: 0, opacity: 0, left: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute -top-[19px] z-5 block h-[68px] bg-white px-5 py-4`}>
                    <div className={"flex h-full gap-2"}>
                      <Searcher
                        className={"border-center flex h-full w-full items-center rounded-full border px-2 py-1"}
                        autoFocus={true}
                        onTextChange={debounceSearch}
                        onSearch={onSearchHandler}
                        onEnter={onSearchHandler}
                      />
                      <p
                        className={`flex aspect-square h-full items-center justify-center rounded-md border-1 border-red-500 ${searchAction === "SEARCH" ? "flex" : "hidden"}`}
                        onClick={() => setSearchAction("EXIT")}>
                        X
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <LucideSearch width={30} height={30} onClick={() => setSearchAction("SEARCH")} />
            </div>
          </div>
          <div className={"col-span-3 flex justify-center"}>
            <div className={"block lg:hidden"}>
              <div className={"flex size-[60px] cursor-pointer items-center justify-center"} onClick={() => navigate("/")}>
                <img src={logo} alt='logo.jpg' />
              </div>
            </div>
            <div className={"mb-0 hidden items-center justify-center gap-4 lg:flex"}>
              <HoverCard openDelay={50} closeDelay={100}>
                {Object.values(CollectionEnum).map((collection: CollectionEnum) => (
                  <HoverCardTrigger
                    key={collection}
                    onMouseEnter={() => setType(collection)}
                    onClick={() =>
                      navigate(`/collection?type=${collection}`, {
                        state: { type: CollectionValue[collection] },
                      })
                    }
                    className={"cursor-pointer text-lg font-bold uppercase hover:border-b-2"}>
                    {t(`header.product_types.${collection.toLowerCase()}`)}
                  </HoverCardTrigger>
                ))}
                <HoverCardContent
                  className={
                    "grid min-h-25 w-[80vw] -translate-x-12 translate-y-6 grid-cols-3 place-content-around gap-2 border-1 border-black bg-linear-to-t"
                  }>
                  {isLoading && <Skeleton className={"w-[75vw]"} />}
                  {data?.data &&
                    data.data[type].map((item, index) => (
                      <p
                        key={index}
                        onClick={() => navigate(`/collection?cid=${item.id}&type=${type}`, { state: { name: item.title } })}
                        className={"group flex cursor-pointer items-center gap-1 font-bold text-black hover:text-neutral-600"}>
                        {item.title}
                        <SolarArrowRightLinear className={"hidden group-hover:block"} height={20} width={20} />
                      </p>
                    ))}
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <div className={"relative col-span-2 flex items-center justify-end gap-2"}>
            <Searcher readOnly={true} onClick={() => setSearchAction("SEARCH")} onSearch={() => setSearchAction("SEARCH")} />
            <AnimatePresence initial={true} onExitComplete={() => setSearchAction("HIDDEN")}>
              {searchAction === "SEARCH" && (
                <motion.div
                  animate={{ width: "99dvw", opacity: 1, right: -45 }}
                  initial={{ width: 0, opacity: 0, right: 0 }}
                  exit={{ width: 0, opacity: 0, right: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute -right-[54px] z-5 hidden h-full overflow-hidden bg-white px-5 py-4 lg:block`}>
                  <div className={"flex h-full gap-2"}>
                    <Searcher
                      className={"border-center flex h-full w-full items-center rounded-full border px-2 py-1"}
                      autoFocus={true}
                      onTextChange={debounceSearch}
                      onSearch={onSearchHandler}
                      onEnter={onSearchHandler}
                    />
                    <p
                      className={`flex aspect-square h-full items-center justify-center rounded-md border-1 border-red-500 ${searchAction === "SEARCH" ? "flex" : "hidden"}`}
                      onClick={() => setSearchAction("EXIT")}>
                      X
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={"z-4 cursor-pointer"}>
              {access_token && user ? (
                <Avatar
                  onClick={() => {
                    navigate("/profile/info");
                  }}>
                  <AvatarImage src={user?.avatar ?? "https://github.com/shadcn.png"} alt={"@shadcn"} />
                  <AvatarFallback>{user.full_name}</AvatarFallback>
                </Avatar>
              ) : (
                <FaSolidUserAlt width={24} height={24} onClick={() => dispatch(showDialog("login"))} />
              )}
            </div>
            <div className={"z-4 cursor-pointer"}>
              <SolarHeartBold width={29} height={29} />
            </div>
            <div className={"group relative"}>
              <a href={!access_token ? "#" : "/cart"} className={"relative z-3"}>
                <ShoppingBag countItem={cartData?.data.cart_items.length ?? 0} />
              </a>
              <div className={"absolute top-0 right-0 z-2 hidden w-[25rem] group-hover:lg:block"}>
                <div className={"relative top-14 right-0 max-h-[27rem] min-h-[4rem] overflow-y-scroll rounded-2xl bg-white p-4"}>
                  {cartData?.data.cart_items.length ? (
                    <div className={"h-full overflow-auto"}>
                      <div className={"flex justify-between"}>
                        <p>{cartData?.data.cart_items.length} sản phẩm</p>
                        <a href={"/cart"} className={"text-blue-500"}>
                          {t("header.cart.view_all")}
                        </a>
                      </div>
                      <Separator className={"my-2"} />
                      <ul className={"flex h-full flex-col justify-between gap-y-2"}>
                        {cartData.data.cart_items.map((value, index) => (
                          <ShoppingBagItem {...value} key={`shopping_bag_item_${index}`} />
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className={"text-center"}>{t("header.cart.empty")}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ height: 35 }}
          // animate={{ height: scrollY >= 10 ? 0 : 35 }}
          transition={{ duration: 0.75 }}
          // onUpdate={(latest) => {
          // 	if (scrollUp) window.scrollTo({ top: (window.scrollY - (latest as { height: number }).height) * 1.5 - 5 });
          // }}
          // onAnimationStart={(value) => setScrollUp((value as { height: number }).height != 0)}
          className={`mb-2 grid w-full grid-cols-5 gap-2 overflow-hidden bg-gray-700 lg:grid-cols-3 ${scrollY < 10 && "py-1"}`}>
          <div className={"col-span-3 col-start-2 overflow-hidden lg:col-span-1 lg:col-start-2"}>
            <motion.div
              className='w-[400px] overflow-hidden text-nowrap text-white'
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: 2, duration: 10, ease: "linear" }}>
              {t("header.free_shipping")}
            </motion.div>
          </div>
          <div className={"text-start"}>
            <SolarArrowRightLinear color={"white"} />
          </div>
        </motion.div>
      </motion.header>
      {searchAction === "SEARCH" && (
        <div
          className={
            "border-gray absolute top-[115px] left-0 z-3 flex max-h-screen w-full flex-col gap-y-5 overflow-x-hidden overflow-y-auto border-t-5 border-b-5 border-black bg-white p-5 sm:max-h-100"
          }>
          {isLoadingQuickSearch && <Skeleton className={"min-h-5 w-full bg-blue-500"} />}
          {!title || !title.length || !dataQuickSearch ? (
            <div className={`min-h-5 w-full text-center font-bold ${isErrorQuickSearch ? "text-red-500" : ""}`}>{isErrorQuickSearch ? t("header.search.error") : t("header.search.hint")}</div>
          ) : (
            dataQuickSearch &&
            (dataQuickSearch.data.length ? (
              dataQuickSearch.data.map((it) => (
                <QuickSearchProduct
                  className={"flex w-full cursor-pointer flex-row items-center gap-2"}
                  key={`quick_search_product_${it.id}`}
                  {...it}
                  image={it.image}
                  onClick={() => {
                    navigate(`/product-detail/${it.id}`);
                    setSearchAction("EXIT");
                  }}
                />
              ))
            ) : (
              <div className={"min-h-5 w-full text-center font-bold"}>{t("header.search.no_results")}</div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default memo(Header);
