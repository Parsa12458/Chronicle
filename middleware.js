export { auth as middleware } from "@/app/_lib/auth";

export const config = {
  matcher: [
    "/users/:userId/add-blog",
    "/users/:userId/edit",
    "/blogs/:blogId/edit-blog",
  ],
};
