"use server";

import { revalidateTag } from "next/cache";
import { getSession, withSiteAuth } from "./auth";
import prisma from "./prisma";
import { formSchema as createSiteFormSchema } from "@/components/sites/create-site-dialog";
import * as z from "zod";
import { Site } from "@prisma/client";

export const createSite = async (
  data: z.infer<typeof createSiteFormSchema>
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Necesitas iniciar sesión para crear un sitio",
    };
  }

  const { name, description, subdomain } = data;

  try {
    const response = await prisma.site.create({
      data: {
        name,
        description,
        subdomain,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `Ya existe un sitio con el subdominio ${subdomain}`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const deleteSite = withSiteAuth(async (_: FormData, site: Site) => {
  try {
    const response = await prisma.site.delete({
      where: {
        id: site.id,
      },
    });

    revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );

    response.customDomain && revalidateTag(`${site.customDomain}-metadata`);
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});
