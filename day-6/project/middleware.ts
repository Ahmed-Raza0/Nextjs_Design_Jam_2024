import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { middleware as dashboardMiddleware } from "./app/dashboard/middleware";

export async function middleware(request: NextRequest) {
  // Update session for all requests
  const sessionResponse = await updateSession(request);

  // If the request path matches "/dashboard", run the dashboard middleware
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // You can directly call the dashboard middleware here
    return dashboardMiddleware(request);
  }

  // Return session update response for other paths
  return sessionResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
