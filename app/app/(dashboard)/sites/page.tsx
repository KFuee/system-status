import PlacholderCard from "@/components/placeholder-card";
import CreateSiteDialog from "@/components/sites/create-site-dialog";
import Sites from "@/components/sites/sites";
import { Suspense } from "react";

export default async function AllSites() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Todos los sitios</h1>

          <CreateSiteDialog />
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PlacholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites />
        </Suspense>
      </div>
    </div>
  );
}
