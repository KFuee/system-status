import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="flex flex-1 items-center flex-col max-w-md w-full">
      <header className="flex flex-row items-center w-100">
        <Avatar className="mr-4 h-6 w-6">
          <AvatarImage
            src={`https://avatar.vercel.sh/${data.name}.png`}
            alt={data.name ?? "Logo"}
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl">{data.name}</h1>
      </header>
    </div>
  );
}
