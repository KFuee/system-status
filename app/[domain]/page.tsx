import ServicesStatus from "@/components/site/services-status";
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
    <div className="flex flex-1 flex-col items-start w-full space-y-6">
      <div className="flex flex-row items-center">
        <Avatar className="mr-4 h-6 w-6">
          <AvatarImage
            src={`https://avatar.vercel.sh/${data.name}.png`}
            alt={data.name ?? "Logo"}
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
      </div>

      <Card className="w-full">
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
    </div>
  );
}
