export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/basic-information/:path*",
    "/about/:path*",
    "/organization/:path*",
    "/education/:path*",
    "/experience/:path*",
    "/leadership/:path*",
    "/miscellaneous/:path*",
  ],
};
