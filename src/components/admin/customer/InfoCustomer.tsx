import { FC, memo, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ClipboardIcon, EllipsisIcon } from "lucide-react";
import { hiddenDialog, showDialog } from "@/redux/slice/dialog.slice.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { InfoCustomerProp } from "@/components/admin/customer/props/infoCustomer.prop.ts";
import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import { useLocation, Link } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const InfoCustomer: FC<InfoCustomerProp & {className?: string}> = memo((props) => {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state: RootState) => state.dialog);
  const { pathname } = useLocation()
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.customers.customer_info"
	});

  const copyEmailHandle = useCallback(async () => {
    if (!props.email) return;
    try {
      await navigator.clipboard.writeText(props.email);
      toast.info(t('copy_mail_success'))
    } catch (err) {
      console.error(err);
      toast.info(t('copy_mail_failure'))
    }
  }, [props.email, t])

  return (
    <>
      <section className={"rounded-lg shadow-sm shadow-accent-foreground w-full sm:w-3/10 p-3 bg-white text-xs sm:text-sm text-neutral-600" + (props.className ? ` ${props.className}` : "")}>
        <div className="flex justify-between items-center">
          <span className={'font-bold'}>{t('customer')}</span>
          <Popover>
            <PopoverTrigger className={"cursor-pointer"} asChild>
              <Button variant={"ghost"} className={"cursor-pointer max-sm:size-8"}>
                <EllipsisIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
              <p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>{t('edit_contact_info')}</p>
              <p onClick={() => dispatch(showDialog('manage-addresses'))} className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Quản lý địa chỉ</p>
              <p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>{t('edit_marketing_info')}</p>
            </PopoverContent>
          </Popover>
        </div>
        {(!pathname.includes('/admin/customers/')) &&
          <>
            <Link to={`/admin/customers/${props.id}`} className={'text-sky-600 '}><span className={'hover:underline'}>{props.full_name}</span></Link>
            {!props.hidden_no_order && <p className="">{props.no_order ? `${props.no_order} ${t('orders')}` :`0 ${t('orders')}`}</p>}

          </>
        }
        <p className={'font-bold my-2'}>Contact information</p>
        <p className={'flex justify-between'}><span className={'text-sky-700 hover:underline cursor-pointer'}>{props.email}</span> <ClipboardIcon onClick={copyEmailHandle} className={'size-4 cursor-pointer'} /></p>
        {props.phone && <p>{props.phone}</p>}
        <p className={'font-bold my-2'}>{t('default_address')}</p>
        <p>{props.full_name}</p>
        <p>{props.address_default?.street}</p>
        <p>{props.address_default?.ward}</p>
        <p>{props.address_default?.district}</p>
        <p>{props.address_default?.city}</p>
        <p>{props.address_default?.phone}</p>
        <p className={'font-bold my-2'}>{t('marketing')}</p>
        <div className="flex space-x-2 mb-2">
          <Checkbox value={'email-subscribed'} id={'email-subscribed'} />
          <Label htmlFor={'email-subscribed'} className={'text-xs sm:text-sm'}>{t('email_subscribed')}</Label>
        </div>
        <div className="flex space-x-2">
          <Checkbox value={'SMS-subscribed'} id={'SMS-subscribed'} />
          <Label htmlFor={'SMS-subscribed'} className={'text-xs sm:text-sm'}>{t('sms_subscribed')}</Label>
        </div>
      </section>
      <DialogConfirm
        open={dialog === "show-confirm"}
        onOpenChange={(value) => !value && showDialog("none")}
        onClickCancel={() => {
          dispatch(hiddenDialog())
        }}
        onClickSubmit={() => {
          dispatch(hiddenDialog())
          showDialog("none");

        }}
        title={t('title_question')}
      />
    </>
  )
},)

export default InfoCustomer