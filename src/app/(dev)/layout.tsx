import { redirect } from "next/navigation";

export default function DevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return children;
}
