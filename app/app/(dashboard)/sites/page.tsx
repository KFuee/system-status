import { Button } from "@/components/ui/button";

export default function AllSites() {
  return (
    <div className="flex max-w-screen-xl flex-col">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Todos los sitios</h1>

          <Button variant="default" className="flex items-center space-x-2">
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM11 7V11H7V13H11V17H13V13H17V11H13V7H11Z"
              />
            </svg>
            <span className="text-sm font-medium">Nuevo sitio</span>
          </Button>
        </div>

        <span>Sitios aquí...</span>
      </div>
    </div>
  );
}
