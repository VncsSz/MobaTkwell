import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(["/",'/manifest.json'])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
  }
},
(req) => ({
  clockSkewInMs: 10000,
}),)

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|manifest\\.json|icons(?:/.*)?|.*\\.(?:css|js|json|jpg|jpeg|png|webp|gif|svg|woff|woff2|ttf|eot|otf)).*)',
    '/(api|trpc)(.*)',
  ],
}