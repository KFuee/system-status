"use client";

import { Tracker, Color } from "@tremor/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useCallback, useEffect, useState } from "react";
import { generateRandomNumber } from "@/lib/utils";

export interface Tracker {
  color: Color;
  tooltip: string;
}

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

export default function UptimeChart({ title }: { title: string }) {
  const [data, setData] = useState<Tracker[]>(initialData);
  const [uptime, setUptime] = useState<number>(generateRandomNumber(90, 100));

  const randomizeData = useCallback(() => {
    let currentIndex = data.length;
    let randomIndex: number;

    // Mientras queden elementos a mezclar...
    while (currentIndex !== 0) {
      // Elegimos un elemento sin mezclar...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Y lo intercambiamos con el elemento actual.
      [data[currentIndex], data[randomIndex]] = [
        data[randomIndex],
        data[currentIndex],
      ];
    }

    setData(data);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(generateRandomNumber(90, 100));
      randomizeData();
    }, 5000);

    return () => clearInterval(interval);
  }, [randomizeData]);

  return (
    <Card className="rounded-none sm:rounded-lg w-full sm:max-w-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>Última actualización &bull; 1 minuto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between w-full">
          <span className="text-sm">Uptime</span>
          <span className="text-sm" suppressHydrationWarning>
            {uptime}%
          </span>
        </div>
        <Tracker data={data} className="mt-2" />
      </CardContent>
    </Card>
  );
}
