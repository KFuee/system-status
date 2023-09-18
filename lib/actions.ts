"use server";

import { revalidateTag } from "next/cache";
import { getSession } from "./auth";
import prisma from "./prisma";
import { formSchema as createSiteFormSchema } from "@/components/sites/create-site-dialog";
import * as z from "zod";

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
