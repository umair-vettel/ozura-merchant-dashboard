"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateWidgetForm from "./CreateWidgetForm";

type Props = {};

const CreateWidget = ({ getData }: { getData: any }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size={"default"}
            type="submit"
            className="flex gap-2 items-center"
          >
            <span className="hidden md:flex"> Create a Payment Link</span>
            <PlusCircleIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a Payment Link</DialogTitle>
            <DialogDescription>
              {`Please fill the details below to create a Payment Link`}
            </DialogDescription>
          </DialogHeader>
          <CreateWidgetForm getData={getData} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateWidget;
