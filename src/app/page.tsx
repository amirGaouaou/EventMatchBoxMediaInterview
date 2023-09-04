import Image from "next/image";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  } else {
    redirect("/dashboard");
  }
}
