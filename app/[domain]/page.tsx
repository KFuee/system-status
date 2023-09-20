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
      <div className="flex flex-col space-y-2 w-full sm:max-w-2xl">
        <div className="flex flex-row justify-between px-6 pt-6 sm:px-0 sm:pt-0">
          <div className="flex flex-row items-center justify-center">
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

        <p className="px-6 sm:px-0 sm:pb-0">{data.description}</p>
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

      <div className="space-y-4 w-full flex flex-col items-center justify-center">
        <UptimeChart title="API" />
        <UptimeChart title="Web" />
      </div>
    </div>
  );
}
