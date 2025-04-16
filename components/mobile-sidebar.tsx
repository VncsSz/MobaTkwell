"use client";

import { 
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { Menu } from "lucide-react";
import React from "react";

export const MobileSidebar = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side="left">
                <Sidebar onSelect={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    )
}