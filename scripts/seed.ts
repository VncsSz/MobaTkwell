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
        await db.delete(schema.userSubscription)

        

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Aprendiz",
                imageSrc: "img/ap.svg",
            },
            {
                id: 2,
                title: "Mestre",
                imageSrc: "img/me.svg",
            },
            {
                id: 3,
                title: "Profissional",
                imageSrc: "img/pr.svg",
            },
            {
                id: 4,
                title: "Experiente",
                imageSrc: "img/ex.svg",
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
                type: "GAME",
                order: 1,
                gameTitle: '',
            },
            {
                id: 2,
                lessonId: 1,
                type: "GAME",
                order: 2,
                gameTitle: '',
            },
            {
                id: 3,
                lessonId: 2,
                type: "GAME",
                order: 1,
                gameTitle: '',
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/verde.svg",
                friendly: true,
                gameSrc: "https://tk-games.vercel.app/games/MazeG/index.html",
                audioSrc: "/verde.mp3",
            },
            {
                id: 2,
                challengeId: 2,
                imageSrc: "/verde.svg",
                friendly: true,
                gameSrc: "https://tk-games.vercel.app/games/maze-runner.html",
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