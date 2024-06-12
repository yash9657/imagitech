import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// add routes to be protected by auth here
const isHomeRoute = createRouteMatcher(['/']);

// By default clerk will not protect any routes. All routes must be explicitly protected.
export default clerkMiddleware((auth, req) => {
    if(isHomeRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};