import { unstable_cache } from "next/cache";
import prisma from "./prisma";

export async function getSiteData(domain: string) {
  const decodedDomain = decodeURIComponent(domain);
  const subdomain = decodedDomain.endsWith(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  )
    ? decodedDomain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.site.findUnique({
        where: subdomain ? { subdomain } : { customDomain: decodedDomain },
        include: { user: true },
      });
    },
    [`${decodedDomain}-metadata`],
    {
      revalidate: 900,
      tags: [`${decodedDomain}-metadata`],
    }
  )();
}
