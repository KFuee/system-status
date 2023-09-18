"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function SiteCard() {
  const [operative, setOperative] = useState(true);

  const toggleOperative = () => {
    setOperative(!operative);
  };

  return (
    <Card className="flex flex-col">
      <CardTitle className="flex items-center justify-between max-h-52 overflow-hidden rounded-t-lg mb-4">
        <Image
          src="https://images.unsplash.com/photo-1694830470387-2e0f234ecaf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
          alt="Logo"
          width={0}
          height={0}
          sizes="100vh"
          className="w-full h-auto"
        />
      </CardTitle>
      <CardContent className="flex flex-col">
        <div className="flex items-end justify-between space-x-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-md font-bold">Dirección del sitio</h2>
            <Badge variant="secondary">
              <a
                href="https://test.com"
                target="_blank"
                className="flex flex-1 items-center justify-between space-x-2"
              >
                <span>https://test.com</span>

                <ExternalLink className="h-4 w-4" />
              </a>
            </Badge>
          </div>

          <Badge
            variant={operative ? "default" : "destructive"}
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
