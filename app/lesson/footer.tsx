import { useKey, useMedia } from "react-use"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

type Props = {
    onCheck: () => void
    status: "correct" | "wrong" | "none" | "completed"
    disabled?: boolean
    lessonId?: number
}

export const Footer = ({
    onCheck,
    status,
    disabled,
    lessonId,
}: Props) => {
    //Usa o teclado para confirmar a seleção, assim como o shortcut (remover ambos)
    useKey("Enter", onCheck, {}, [onCheck])

    useEffect(() => {
        if (!disabled && status === "none") {
            onCheck();
        }
    }, [disabled, status, onCheck]);

    const isMobile = useMedia("(max-width: 1024px)")

    return (
        <footer className={cn(
            "lg:-h[140px] h-[100px] border-t-2",
            status === "correct" && "border-transparent bg-green-100",
            status === "correct" && "border-transparent bg-rose-100",
        )}>
            <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
                {status === "correct" && (
                    <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Perfeito, vamos avançar!
                    </div>
                )}
                {status === "wrong" && (
                    <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
                        <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Ops, tente novamente!
                    </div>
                )}
                {status === "completed" && (
                    <Button 
                        variant="default"
                        size={isMobile ? "sm" : "lg"}
                        onClick={() => window.location.href = `/lesson/${lessonId}`}
                    >
                        Começar novamente
                    </Button>
                )}
                <Button
                    disabled={disabled}
                    className={cn("ml-auto", status === "none" && "hidden")}

                    onClick={onCheck}
                    size={isMobile ? "sm" : "lg"}
                    variant={status === "wrong" ? "danger" : "secondary"}
                >
                    {status === "none" && "Continuar"}
                    {status === "correct" && "Avançar"}
                    {status === "wrong" && "Repetir"}
                    {status === "completed" && "Finalizar"}
                </Button>
            </div>

        </footer>
    )
}