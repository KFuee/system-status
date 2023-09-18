import SiteCard from "@/components/sites/site-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AllSites() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Todos los sitios</h1>

          <Button variant="default" className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />

            <span className="text-sm font-medium">Nuevo sitio</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SiteCard />
        </div>
      </div>
    </div>
  );
}
