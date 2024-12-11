import { challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useCallback } from "react"
import { useAudio, useKey } from "react-use"
//FAZER UMA SEQUENCIA DE JOGOS DENTRO DO CARD
type Props = {
    id: number
    imageSrc: string | null
    audioSrc: string | null
    game: string
    shortcut: string
    selected?: boolean
    onClick: () => void
    disabled?: boolean
    status?: "correct" | "wrong" | "none"
    type: typeof challenges.$inferSelect["type"]
}

export const Card = ({
    id,
    imageSrc,
    audioSrc,
    game,
    shortcut,
    selected,
    onClick,
    status,
    disabled,
    type,
}: Props) => {
    const [audio, _, controls] = useAudio({ src: audioSrc || ""})
    // TIRAR AUDIO E IMAGEM, CONSERTAR LAYOUT E TIRAR HANDLECLICK E USEKEY
    const handleClick = useCallback(() => {
        if (disabled) return

        controls.play()
        onClick()
    }, [disabled, onClick, controls])

    useKey(shortcut, handleClick, {}, [handleClick])

    return (
        <div
            onClick={handleClick}
            className={cn("h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
                type === "ASSIST" && "lg:p-3 w-full"
            )}
        >
                <div
                    className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[400px] w-full"
                >
                    <iframe 
                    src={`${game}`}
                    width="400px"
                    height='400px'
                    ></iframe>
                </div>
        </div>
    )
}