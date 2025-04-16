import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import {
    ClerkLoading,
    ClerkLoaded,
    UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
    className?: string;
    onSelect?: () => void;
};

export const Sidebar = ({ className, onSelect }: Props) => {
    return (
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", 
            className,
        )}>
            <Link href="/learn" onClick={onSelect}>
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/img/TWHeader.svg" height={40} width={40} alt="Mascot"/>
                    <h1 className="text-2xl font-extrabold text-purple-600 tracking-wide">
                        ThinkWell
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">

                <SidebarItem 
                label="Aprenda" 
                href="/learn"
                iconSrc="/img/learn.svg"
                onSelect={onSelect}
                />

                <SidebarItem 
                label="Classificações" 
                href="/leaderboard"
                iconSrc="/img/leaderboard.svg"
                onSelect={onSelect}
                />

                <SidebarItem 
                label="Missões" 
                href="/quests"
                iconSrc="/img/quests.svg"
                onSelect={onSelect}
                />

                <SidebarItem 
                label="Compras" 
                href="/shop"
                iconSrc="/img/shop.svg"
                onSelect={onSelect}
                />
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton 
                        appearance={{
                            elements: { userButtonPopoverCard: { pointerEvents: "initial" },  
                            userButtonBox: { flexDirection: "row-reverse"}},
                          }}
                        showName/>
                </ClerkLoaded>
            </div>
        </div>
    )
}