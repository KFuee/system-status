import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import SidebarNav from "@/components/site/sidebar-nav";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export const metadata: Metadata = {
  title: "Ajustes sitio | System status",
  description: "Administra el sitio seleccionado y sus ajustes.",
};

interface SiteSettingsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function SiteSettingsLayout({
  children,
  params,
}: SiteSettingsLayoutProps) {
  const sidebarNavItems = useMemo(
    () => [
      {
        title: "Servicios",
        href: `/site/${params.id}/settings`,
      },
      {
        title: "Dominios",
        href: `/site/${params.id}/settings/domains`,
      },
      {
        title: "Avanzado",
        href: `/site/${params.id}/settings/advanced`,
      },
    ],
    [params.id]
  );

  return (
    <div className="block space-y-6">
      <Link
        href="/sites"
        className="text-md font-medium tracking-tight hover:underline flex flex-row items-center space-x-4"
      >
        <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        <span>Volver a la lista de sitios</span>
      </Link>

      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Ajustes</h2>
        <p className="text-muted-foreground">
          Administra el sitio seleccionado y sus ajustes.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
