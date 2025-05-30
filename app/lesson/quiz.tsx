"use client"

import { challengeOptions, challenges, userSubscription } from "@/db/schema"
import { useState, useTransition, useEffect } from "react"
import { Header } from "./header"
import Confetti from "react-confetti"
import { QuestionBubble } from "./question-bubble"
import { Challenge } from "./challenge"
import { Footer } from "./footer"
import { upsertChallengeProgress } from "@/actions/challenge-progress"
import { toast } from "sonner"
import { reduceHearts } from "@/actions/user-progress"
import { useAudio, useWindowSize, useMount } from "react-use"
import Image from "next/image"
import { ResultCard } from "./result-card"
import { useRouter } from "next/navigation"
import { useHeartsModal } from "@/store/use-hearts-modal"
import { usePracticeModal } from "@/store/use-practice-modal"

type Props = {
    initialPercentage: number
    initialHearts: number
    initialLessonId: number
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[]
    userSubscription: typeof userSubscription.$inferInsert & {
        isActive: boolean
    } | null
}

export const Quiz = ({ 
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription
}: Props) => {
    const router = useRouter()
    const { open: openHeartsModal } = useHeartsModal()
    const { open: openPracticeModal } = usePracticeModal()

    useEffect(() => {
        // Verifica se o usuário tem corações ao abrir o desafio, exceto se for prática
        const isPractice = initialPercentage === 100
        if (initialHearts === 0 && !userSubscription?.isActive && !isPractice) {
            openHeartsModal()
        }
    }, [initialHearts, userSubscription, openHeartsModal, initialPercentage])

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal()
        }
    })

    const {width, height} = useWindowSize()
    const [finishAudio] = useAudio({src: "/audio/finish.mp3", autoPlay: true})
    const [
        correctAudio,
        _c,
        correctControls,
    ] = useAudio({ src: "/audio/correct.wav"})
    const [
        incorrectAudio,
        _i,
        incorrectControls,
    ] = useAudio({ src: "/audio/incorrect.wav"})

    const [pending, startTransition] = useTransition()
    const [lessonId] = useState(initialLessonId)
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage
    })
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)
        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    })
    const challenge = challenges[activeIndex]
    //SELECT OPTION
    const [selectedOption, setSelecetedOption] = useState<number>()
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")
    //SELECT
    const options = challenge?.challengeOptions ?? []
    const onSelect = (id: number) => {
        if (status !== "none") return

        setSelecetedOption(id)
    }
    //const title = challenge.type === "EXTRA" ? "Complete o jogo para avançar" : challenge.gameTitle
    const onNext = () => {
        setActiveIndex((current) => current + 1)
    }
    
    const [gameMessage, setGameMessage] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    useEffect(() => {
        //Only client-side
        const handleMessage = (event: MessageEvent) => {
            // Verifica se o evento contém os dados esperados
            if (!event.data || typeof event.data.gameStatus === "undefined") {
                return;
            }

            // Evita múltiplas atualizações desnecessárias
            if (gameMessage) {
                return;
            }

            setGameMessage(true);
            setGameCompleted(event.data.gameStatus);
        };

        window.addEventListener("message", handleMessage);

        // Cleanup para evitar múltiplos listeners
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [gameMessage]);

    const onContinue = () => {

        //Só poder liberar o jogo novamente quando passar por esse IF (seja por enviar uma mensagem p jogo reiniciar ou bloquear o iframe)
        if (status === "wrong") {
            setStatus("none")
            setSelecetedOption(undefined)
            setGameMessage(false)
            return
        }

        //Só poder liberar o jogo novamente quando passar por esse IF (seja por enviar uma mensagem p jogo reiniciar ou bloquear o iframe)
        if (status === "correct") {
            onNext();
            setStatus("none")
            setSelecetedOption(undefined)
            setGameMessage(false)
            return
        }

        console.log(gameMessage)
        
       //const correctOption = options.find((option) => option.friendly)

       //if (!correctOption){
            //return
       //}
        
        if(gameCompleted) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id).then((response) => {
                    if (response?.error === "hearts") {
                        openHeartsModal()
                        return
                    }

                    correctControls.play()
                    setStatus("correct");
                    setPercentage((prev) => prev + 100/ challenges.length)

                    if(initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5))
                    }
                }).catch(() => toast.error("Ops... Algo está errado, tente novamente"))
            })
        } else {
            startTransition(() => {
                reduceHearts(challenge.id).then((response) => {
                    if (response?.error === "hearts") {
                        openHeartsModal()
                        return
                    }
                    incorrectControls.play()
                    setStatus("wrong")

                    if(!response?.error) {
                        setHearts((prev) => Math.max(prev - 1, 0))
                    }
                }).catch(() => toast.error("Ops, alguma coisa deu errado, tente novamente"))
            })
        }
    }
    //Finish Screen *
    //Infinity icon and a real points after shopping
    if (!challenge) {
        return(
            <>
            {finishAudio}
            <Confetti 
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            tweenDuration={10000}
            />
            <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                <Image
                    src="/img/finish.svg"
                    alt="Finish"
                    className="hidden lg:block"
                    height={100}
                    width={100}
                />
                <Image
                    src="/img/finish.svg"
                    alt="Finish"
                    className="block lg:hidden"
                    height={50}
                    width={50}
                />
                <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                    Muito bem! <br /> Você concluiu os desafios.
                </h1>
                <div className="flex items-center gap-x-4 w-full">
                    <ResultCard
                        variant="points"
                        value={challenges.length * 10}
                    />
                    <ResultCard
                        variant="hearts"
                        value={hearts}
                    />
                </div>
            </div>
            <Footer 
            lessonId={lessonId}
            status="completed"
            onCheck={() => router.push("/learn")}
            />
            </>
        )
    }

    return (
        <>
            {incorrectAudio}
            {correctAudio}
            <Header 
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="w-full h-full flex flex-col gap-y-12 max-h-full max-w-full">
                        <div className="flex-1 flex items-center justify-center">
                            {challenge.type === "EXTRA" && (
                                <QuestionBubble gameTitle={challenge.gameTitle} />
                            )}
                            <Challenge 
                            //SELECT
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption = {gameMessage}
                                disabled = {pending}
                                type = {challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer 
                disabled={pending || !gameMessage}
                status={status}
                onCheck={onContinue}
            />
        </>
    )
}