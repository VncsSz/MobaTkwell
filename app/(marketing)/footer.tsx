import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-15 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">

                <Button asChild size="lg" variant="ghost" className="w-full">
                    <a href="https://portal.ifba.edu.br/" target="_blank" rel="noopener noreferrer">
                        <Image src="/img/ifba.svg" alt="IFBA" height={82} width={90} className="mr-4 rounded-md"/>
                        IFBA
                    </a>
                </Button>

                <Button asChild size="lg" variant="ghost" className="w-full">
                    <a href="https://www.gov.br/cnpq/pt-br" target="_blank" rel="noopener noreferrer">
                        <Image src="/img/cnpq.svg" alt="CNPq" height={62} width={70} className="mr-4 rounded-md"/>
                        CNPq
                    </a>
                </Button>
            </div>
        </footer>
    )
}