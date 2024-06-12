import { auth, authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
 
export default authMiddleware({
  publicRoutes: ['/api/webhooks/clerk']
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};