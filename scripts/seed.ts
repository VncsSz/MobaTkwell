import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql, { schema })

const main = async () => {
    try {
        console.log("Seeding database")

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)
        

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Aprendiz",
                imageSrc: "ap.svg",
            },
            {
                id: 2,
                title: "Mestre",
                imageSrc: "me.svg",
            },
            {
                id: 3,
                title: "Profissional",
                imageSrc: "pr.svg",
            },
            {
                id: 4,
                title: "Experiente",
                imageSrc: "ex.svg",
            },
        ])

        await db.insert(schema.units).values([
            {
                id:1,
                courseId: 1,
                title: "Unidade 1",
                description: "Aprenda o basico de logica",
                order: 1,            
            },
        ])

        await db.insert(schema.lessons).values([
            {
                id:1,
                unitId: 1,
                order: 1,  
                title: "Jogo 1",           
            },{
                id:2,
                unitId: 1,
                order: 2,  
                title: "Jogo 1",           
            },{
                id:3,
                unitId: 1,
                order: 3,  
                title: "Jogo 1",           
            },{
                id:4,
                unitId: 1,
                order: 4,  
                title: "Jogo 1",           
            },{
                id:5,
                unitId: 1,
                order: 5,  
                title: "Jogo 1",           
            },
        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Ajude o rato chegar até o queijo',
            },
            {
                id: 2,
                lessonId: 1,
                type: "SELECT",
                order: 2,
                question: 'Cuidado com o labirinto',
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/verde.svg",
                correct: true,
                game: "https://tk-games.vercel.app/games/maze-runner.html",
                audioSrc: "/verde.mp3",
            },
            {
                id: 2,
                challengeId: 2,
                imageSrc: "/verde.svg",
                correct: true,
                game: "https://tk-games.vercel.app/games/rat-cheese.html",
                audioSrc: "/verde.mp3",
            },
        ])


        console.log("Seed finished")

    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the database")
    }
}

main ();