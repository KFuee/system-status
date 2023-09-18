import CreateSiteDialog from "@/components/sites/create-site-dialog";
import SiteCard from "@/components/sites/site-card";

export default function AllSites() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Todos los sitios</h1>

          <CreateSiteDialog />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SiteCard />
        </div>
      </div>
    </div>
  );
}
