"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";

export default function ServicesStatus() {
  const [services, setServices] = useState<{ name: string; active: boolean }[]>(
    [
      { name: "API", active: true },
      { name: "Web", active: false },
    ]
  );

  function modifyActiveStatus(serviceName: string) {
    setServices(
      services.map((service) => {
        if (service.name === serviceName) {
          return {
            ...service,
            active: !service.active,
          };
        }

        return service;
      })
    );
  }

  return (
    <div className="flex flex-col rounded-lg border bg-card text-card-foreground divide-y">
      {services.map((service) => (
        <div
          key={service.name}
          className="flex flex-row justify-between items-center px-4 py-2"
        >
          <span className="font-semibold">{service.name}</span>
          <Badge
            variant={service.active ? "outline" : "destructive"}
            onClick={() => modifyActiveStatus(service.name)}
            className="cursor-pointer"
          >
            {service.active ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      ))}
    </div>
  );
}
