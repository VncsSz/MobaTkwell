import { challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"
import Image from "next/image"
import { useCallback } from "react"
import { useAudio, useKey } from "react-use"
type Props = {
    id: number
    imageSrc: string | null
    audioSrc: string | null
    gameSrc: string
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
    gameSrc,
    selected,
    onClick,
    status,
    disabled,
    type,
}: Props) => {
    const [audio, _, controls] = useAudio({ src: audioSrc || ""})

    const handleClick = useCallback(() => {
        if (disabled) return

        controls.play()
        onClick()
    }, [disabled, onClick, controls])

    return (
        <div
            onClick={handleClick}
            className={cn(
                "h-full w-full cursor-pointer flex justify-center items-center relative",
                type === "EXTRA" && "lg:p-3"
            )}
        >
            <div className="relative w-full h-full flex justify-center items-center">
                {/* Iframe principal */}
                <iframe 
                    src={`${gameSrc}`}
                    className="w-full h-full"
                ></iframe>

                {/* Loading Overlay */}
                {selected && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-80 text-white text-2xl">
                        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                    </div>
                )}

                {/* Correct Overlay */}
                {selected && status === "correct" && (
                    <div className="absolute inset-0 flex justify-center items-center bg-green-500 bg-opacity-90 text-white text-2xl font-bold">
                        🎉 Parabéns! 🎉
                    </div>
                )}

                {/* Wrong Overlay */}
                {selected && status === "wrong" && (
                    <div className="absolute inset-0 flex justify-center items-center bg-red-500 bg-opacity-90 text-white text-2xl font-bold">
                        ❌ Tente Novamente ❌
                    </div>
                )}
            </div>
        </div>
    )
}