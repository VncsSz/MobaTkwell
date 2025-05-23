import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2mmFHWCMWK7fp7DDk4WeXL8CkIB"
]
export const isAdmin = () => {
    const { userId } = auth()

    if (!userId) {
        return false
    }

    return adminIds.indexOf(userId) !== -1
}