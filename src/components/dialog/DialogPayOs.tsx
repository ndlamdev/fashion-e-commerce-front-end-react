/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:55 AM - 18/05/2025
 *  User: Administrator
 **/

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useEffect } from "react";
import { PayOSConfig, usePayOS } from "@payos/payos-checkout";

function DialogPayOs(config: PayOSConfig) {
  const { open, exit } = usePayOS(config);

  useEffect(() => {
    open();
  }, [open]);

  return (
    <Dialog open={true}>
      <DialogContent
        className={"max-w-[580px] p-0"}
        classIcon={"hidden"}
      >
        <DialogHeader>
          <DialogTitle className={"text-center text-xl"}></DialogTitle>
          <DialogDescription className={"mt-5 flex w-full gap-5 px-10"}> </DialogDescription>
        </DialogHeader>
        <div id={"pay-os-container"} className={"w-full h-[100dvh]"}>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogPayOs;
