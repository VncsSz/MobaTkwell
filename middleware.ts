import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(["/","/manifest.webmanifest"])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
  }
},
(req) => ({
  clockSkewInMs: 10000,
}),)

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/manifest.webmanifest', '/(api|trpc)(.*)'],
}