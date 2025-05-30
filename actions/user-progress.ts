"use server"

import { POINTS_TO_REFILL } from "@/constants"
import db from "@/db/drizzle"
import { getCourseById, getUserProgress, getUserSubscription } from "@/db/queries"
import { challengeProgress, challenges, userProgress } from "@/db/schema"
import { auth, currentUser } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
        throw new Error("Sem autorização")
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Curso não encontrado")
    }

    if (!course.units.length || !course.units[0].lessons.length) {
        throw new Error("Curso vazio")
    }

    const existingUserProgress = await getUserProgress()

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "user",
            userImageSrc: user.imageUrl || "img/TWLogo.svg",
        }).where(eq(userProgress.userId, userId)) // Filtra pelo userId

        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "user",
        userImageSrc: user.imageUrl || "img/TWLogo.svg",
    })

    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")
}

export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("Acesso negado!")
    }

    const currentUserProgress = await getUserProgress()
    const userSubscription = await getUserSubscription()

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    })

    if (!challenge) {
        throw new Error("Desafio não encontrado")
    }

    const lessonId = challenge.lessonId

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        ),
    })

    const isPractice = !!existingChallengeProgress

    if (isPractice) {
        return { error: "practice" }
    }

    if (!currentUserProgress) {
        throw new Error("Progresso de usuário não encontrado")
    }

    if (userSubscription?.isActive) {
        return { error: "subscription" }
    }

    if (currentUserProgress.hearts === 0) {
        return { error: "hearts" }
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }).where(eq(userProgress.userId, userId))

    revalidatePath("/shop")
    revalidatePath("/learn")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)
}

export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress()

    if (!currentUserProgress) {
        throw new Error("Progresso de usuario não encontrado")
    }

    if (currentUserProgress.hearts === 5) {
        throw new Error("O número de vidas atingiu o limite")
    }

    if (currentUserProgress.points < POINTS_TO_REFILL) {
        throw new Error("Pontos insuficientes")
    }

    await db.update(userProgress).set({
        hearts: 5,
        points: currentUserProgress.points - POINTS_TO_REFILL,
    }).where(eq(userProgress.userId, currentUserProgress.userId))

    revalidatePath("/shop")
    revalidatePath("/learn")
    revalidatePath("/quest")
    revalidatePath("/leaderboard")
}