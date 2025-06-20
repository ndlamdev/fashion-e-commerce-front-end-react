import AccordionCustom from "@/components/accordion/AccordionCustom.tsx";
import { TabNavProps } from "@/components/profile/props/tabNav.props.ts";
import { TabNav } from "@/components/profile/TabNav.tsx";
import { BadgePercent, CornerDownRight, FolderIcon, LayoutDashboardIcon, LucideShoppingBag, TagIcon, UserRoundIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";




export function VerticalMenu() {
  const location = useLocation();
  const { t } = useTranslation(undefined, { keyPrefix: "page.admin.vertical_menu" });

  const MenuValues: (TabNavProps & { subMenu?: TabNavProps[] })[] = [
    { title: t('dashboard'), to: "/admin", iconLeft: <LayoutDashboardIcon /> },
    {
      title: t('orders'),
      to: "/admin/orders",
      iconLeft: <LucideShoppingBag />,
      subMenu: [
        { title: t('drafts'), to: "/admin/orders/drafts" },
        { title: t('abandoned_checkouts'), to: "/admin/orders/abandoned-checkouts" },
      ],
    },
    {
      title: t('products'),
      to: "/admin/products",
      iconLeft: <TagIcon />,
      subMenu: [
        { title: t('categories'), to: "/admin/collections" },
        { title: t('inventories'), to: "/admin/inventories" },
        { title: t('purchase_orders'), to: "/admin/products/purchase-order" },
      ],
    },
    {
      title: t('media'),
      to: "/admin/medias",
      iconLeft: <FolderIcon />
    },
    {
      title: t('customers'), to: "/admin/customers", iconLeft: <UserRoundIcon />, subMenu: [
        { title: t('segments'), to: "/admin/customers/segments" }
      ]
    },
    { title: t('discounts'), to: "/admin/discount", iconLeft: <BadgePercent /> },
  ];

  return (
    <nav className={"bg-neutral-200 p-3"}>
      {MenuValues.map((tabNav, index) => (
        <AccordionCustom
          isDown={location.pathname === tabNav.to}
          showContent={!!tabNav.subMenu}
          key={index}
          showIcon={false}
          trigger={
            <TabNav
              style={{
                backgroundColor: location.pathname === tabNav.to ? "#F5F5FA" : "",
              }}
              iconLeft={tabNav.iconLeft}
              to={tabNav.to}
              title={tabNav.title}
              tailwindStyle={"p-1 my-1 bg-neutral-200 hover:bg-neutral-50 text-sx font-bold text-neutral-600"}
            />
          }
          styleContent={"bg-neutral-200 p-1 pl-4"}
          content={
            <>
              {tabNav.subMenu?.map((subMenu) => (
                <div key={subMenu.title}>
                  <TabNav
                    style={{
                      backgroundColor: location.pathname == subMenu.to ? "#DDDDDD" : "",
                    }}
                    iconLeft={location.pathname == subMenu.to ? <CornerDownRight className={"text-neutral-500"} /> : ""}
                    to={subMenu.to}
                    title={subMenu.title}
                    tailwindStyle={"bg-neutral-200 text-neutral-600 hover:bg-neutral-100 rounded-lg p-1 my-1"}
                  />
                </div>
              ))}
            </>
          }
          className={"m-0 w-full p-0"}
        />
      ))}
    </nav>
  );
}
