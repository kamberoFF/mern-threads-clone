import { authMiddleware } from '@clerk/nextjs/server' // Make sure the import is correct

export default authMiddleware({
  publicRoutes: ['/', '/api/webhook/clerk', '/api/uploadthing'], // Specify which routes are public
  ignoredRoutes: ['/api/webhook/clerk', '/api/uploadthing'],     // Ignore specific routes from authentication checks
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}