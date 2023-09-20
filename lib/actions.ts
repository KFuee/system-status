"use server";

import { revalidateTag } from "next/cache";
import { getSession, withSiteAuth } from "./auth";
import prisma from "./prisma";
import { formSchema as createSiteFormSchema } from "@/components/sites/create-site-dialog";
import * as z from "zod";
import { Site } from "@prisma/client";
import {
  addDomainToVercel,
  removeDomainFromVercelProject,
  validDomainRegex,
} from "./domains";

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

export const updateSite = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {
    const value = formData.get(key) as string;

    try {
      let response;

      if (key === "customDomain") {
        if (value.includes(process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "")) {
          return {
            error: "El dominio no puede incluir el dominio raíz",
          };

          // if the custom domain is valid, we need to add it to Vercel
        } else if (validDomainRegex.test(value)) {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: value,
            },
          });
          await addDomainToVercel(value);

          // empty value means the user wants to remove the custom domain
        } else if (value === "") {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: null,
            },
          });
        }

        // if the site had a different customDomain before, we need to remove it from Vercel
        if (site.customDomain && site.customDomain !== value) {
          response = await removeDomainFromVercelProject(site.customDomain);
        }
      } else {
        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: value,
          },
        });
      }

      revalidateTag(
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
      );
      site.customDomain && revalidateTag(`${site.customDomain}-metadata`);

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `Este ${key} ya está en uso`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  }
);
