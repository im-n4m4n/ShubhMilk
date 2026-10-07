import { redirect } from "next/navigation";

/** /admin → the Decap CMS panel (served from /public/admin). */
export default function AdminRedirect() {
  redirect("/admin/index.html");
}
