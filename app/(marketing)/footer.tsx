import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">

                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/br.svg" alt="Brasil" height={32} width={40} className="mr-4 rounded-md"/>
                    Brasil
                </Button>

                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/ba.svg" alt="Bahia" height={32} width={40} className="mr-4 rounded-md"/>
                    Bahia
                </Button>

                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/fsa.svg" alt="Feira de Santana" height={32} width={40} className="mr-4 rounded-md"/>
                    Feira de Santana
                </Button>

                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/ifba.svg" alt="IFBA" height={32} width={40} className="mr-4 rounded-md"/>
                    IFBA
                </Button>

                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/cnpq.svg" alt="CNPq" height={32} width={40} className="mr-4 rounded-md"/>
                    CNPq
                </Button>
            </div>
        </footer>
    )
}