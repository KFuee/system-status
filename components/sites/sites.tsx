import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SiteCard from "./site-card";

export default async function Sites() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const sites = await prisma.site.findMany({
    where: {
      user: {
        id: session.user.id,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map((site) => (
        <SiteCard key={site.id} site={site} />
      ))}
    </div>
  );
}
