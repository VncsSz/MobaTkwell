"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState, useTransition } from "react"
import { Header } from "./header"
import { QuestionBubble } from "./question-bubble"
import { Challenge } from "./challenge"
import { Footer } from "./footer"
import { upsertChallengeProgress } from "@/actions/challenge-progress"
import { toast } from "sonner"
import { reduceHearts } from "@/actions/user-progress"

type Props = {
    initialPercentage: number
    initialHearts: number
    initialLessonId: number
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[]
    userSubscription: any
}

export const Quiz = ({ 
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription
}: Props) => {

    const [pending, startTransition] = useTransition()
    
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)
        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    })
    const challenge = challenges[activeIndex]
    //APAGAR SELECT OPTION
    const [selectedOption, setSelecetedOption] = useState<number>()
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")
    //APAGAR SELECT
    const options = challenge?.challengeOptions ?? []
    const onSelect = (id: number) => {
        if (status !== "none") return

        setSelecetedOption(id)
    }
    const title = challenge.type === "ASSIST" ? "Complete o jogo para avançar" : challenge.question
    const onNext = () => {
        setActiveIndex((current) => current + 1)
    }
    
    const [gameMessage, setGameMessage] = useState(false);

    window.addEventListener('message', (event) => {
        if (event.data.gameStatus === 'completed' && event.data.gameID === 'ratoQueijoFase2') {
            setGameMessage(true);
            if (gameMessage){
                onContinue(); // EVENTO ESTA SENDO PASSADO 2 VEZES
            }
        }
    });

    const onContinue = () => {
        //APAGAR ESSE RETURN

        if (status === "wrong") {
            setStatus("none")
            setSelecetedOption(undefined)
            return
        }

        if (status === "correct") {
            onNext();
            setStatus("none")
            setSelecetedOption(undefined)
            return
        }

        console.log(gameMessage)
        
        const correctOption = options.find((option) => option.correct)
        // DEFINIR COMO VAI FICAR A PARTE DA OPÇÂO CORRETA PARA ATIVAR O BOTAO NEXT

       //if (!correctOption){
            //return
        //}
        
        //ADICONAR O RETORNO DO IFRAME PARA "OPÇAO CORRETA" QUANDO O JOGO É CONCLUIDO
        if(gameMessage) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id).then((response) => {
                    if (response?.error === "hearts") {
                        console.error("Falta vidas")
                        return
                    }

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
                        console.error("Falta vidas")
                        return
                    }

                    setStatus("wrong")

                    if(!response?.error) {
                        setHearts((prev) => Math.max(prev - 1, 0))
                    }
                }).catch(() => toast.error("Ops, alguma coisa deu errado, tente novamente"))
            })
        }
    }


    return (
        <>
            <Header 
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[500px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question} />
                            )}
                            <Challenge 
                            //APAGAR FUNÇÂO NÂO UTILIZADA, COMO SELECT (MANTER STATUS)
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption = {selectedOption}
                                disabled = {pending}
                                type = {challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer 
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    )
}