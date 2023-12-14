"use client";

import { useSetting } from "@/hooks/useSetting";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { ModeToggle } from "../modeToggle";

export const SettingModal = () => {
  const setting = useSetting();

  return (
    <>
      <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
        <DialogContent>
          <DialogHeader className="border-b pb-3">
            <h1 className="text-lg font-medium">Pengaturan</h1>
          </DialogHeader>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-1">
              <Label>Tampilan</Label>
              <span className="text-[0.8rem] text-muted-foreground">
                Sesuaikan Tampilan FI Notes kalian
              </span>
            </div>
            <ModeToggle />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
