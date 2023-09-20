"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Site } from "@prisma/client";
import { Button } from "../ui/button";
import Link from "next/link";
import DeleteSiteDialog from "./delete-site-dialog";

export default function SiteCard({ site }: { site: Site }) {
  const [operative, setOperative] = useState(true);

  const toggleOperative = () => {
    setOperative(!operative);
  };

  return (
    <Card className="flex flex-col">
      <CardTitle className="group relative items-center justify-between h-52 overflow-hidden rounded-t-lg mb-4">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 space-x-2">
          <DeleteSiteDialog id={site.id} />
          <Button variant="secondary">
            <Link href={`/site/${site.id}/settings`}>Configurar</Link>
          </Button>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1694830470387-2e0f234ecaf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
          alt="Logo"
          width={0}
          height={0}
          sizes="100vh"
          className="absolute inset-0 w-full h-full object-cover transform group-hover:blur-md transition-transform duration-500"
        />
      </CardTitle>

      <CardContent className="flex flex-col">
        <div className="flex items-end justify-between space-x-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-md font-bold">Dirección del sitio</h2>
            <Badge variant="outline">
              <a
                href={
                  site.subdomain
                    ? `${
                        process.env.NEXT_PUBLIC_ROOT_DOMAIN === "localhost:3000"
                          ? "http"
                          : "https"
                      }://${site.subdomain}.${
                        process.env.NEXT_PUBLIC_ROOT_DOMAIN
                      }`
                    : "#"
                }
                target="_blank"
                className="flex flex-1 items-center justify-between space-x-2"
              >
                <span>
                  {site.subdomain
                    ? `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
                    : "Sin asignar"}
                </span>

                <ExternalLink className="h-4 w-4" />
              </a>
            </Badge>
          </div>

          <Badge
            variant={operative ? "secondary" : "destructive"}
            onClick={toggleOperative}
            className="cursor-pointer line-clamp-1 truncate flex items-center justify-center"
          >
            {operative ? "Operativo" : "No operativo"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
