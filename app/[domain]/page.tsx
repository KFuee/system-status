import ServicesStatus from "@/components/site/services-status";
import UptimeChart, { Tracker } from "@/components/site/uptime-chart";
import { UiModeToggle } from "@/components/ui-mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSiteData } from "@/lib/fetchers";
import { useCallback } from "react";

const initialData: Tracker[] = [
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "rose", tooltip: "Downtime" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "gray", tooltip: "Maintenance" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "yellow", tooltip: "Degraded" },
  { color: "emerald", tooltip: "Operational" },
];

export default async function SiteHomePage({
  params: { domain },
}: {
  params: { domain: string };
}) {
  const data = await getSiteData(domain);

  if (!data) {
    return <div>Sitio no encontrado</div>;
  }

  return (
    <div className="flex flex-1 flex-col items-center w-full space-y-6 sm:p-6">
      <div className="flex flex-row justify-between w-full sm:max-w-2xl">
        <div className="flex flex-row items-center px-6 pt-6 sm:px-0 sm:pt-0 text-start">
          <Avatar className="mr-4 h-6 w-6">
            <AvatarImage
              src={`https://avatar.vercel.sh/${data.name}.png`}
              alt={data.name ?? "Logo"}
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{data.name}</h1>
        </div>

        <UiModeToggle />
      </div>

      <Card className="rounded-none sm:rounded-lg w-full sm:max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Servicios</CardTitle>
          <CardDescription>
            Estado actual de los servicios de {data.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServicesStatus />
        </CardContent>
      </Card>

      <div className="w-full sm:max-w-2xl space-y-4">
        <UptimeChart title="API" />
        <UptimeChart title="Web" />
      </div>
    </div>
  );
}
