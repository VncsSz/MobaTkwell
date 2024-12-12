import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(["/"])

export default clerkMiddleware(
  (auth, req) => {
    // strategy to protect all routes except public routes
    if (isPublicRoute(req)) return // if it's a public route, do nothing


    auth().protect() // for any other route, require auth
  },
(req) => ({
  clockSkewInMs: 10000,
}),)

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}