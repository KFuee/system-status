"use client";

import { useState } from "react";
import { useDomainStatus } from "@/lib/hooks/useDomainStatus";
import { getSubdomain } from "@/lib/domains";
import { AlertCircle, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";

export default function DomainConfiguration({ domain }: { domain: string }) {
  const [recordType, setRecordType] = useState<"A" | "CNAME">("A");

  const { status, domainJson } = useDomainStatus({ domain });

  if (!status || status === "Valid Configuration" || !domainJson) return null;

  const subdomain = getSubdomain(domainJson.name, domainJson.apexName);

  const txtVerification =
    (status === "Pending Verification" &&
      domainJson.verification.find((x: any) => x.type === "TXT")) ||
    null;

  return (
    <div className="border-t pt-4">
      <div className="mb-4 flex items-center space-x-2">
        {status === "Pending Verification" ? (
          <AlertCircle
            fill="#FBBF24"
            stroke="currentColor"
            className="text-white dark:text-black"
          />
        ) : (
          <XCircle
            fill="#DC2626"
            stroke="currentColor"
            className="text-white dark:text-black"
          />
        )}
        <p className="text-lg font-semibold dark:text-white">{status}</p>
      </div>
      {txtVerification ? (
        <>
          <p className="text-sm dark:text-white">
            Por favor configure el siguiente registro TXT en{" "}
            <Badge variant="outline">{domainJson.apexName}</Badge> para probar
            la propiedad de <Badge variant="outline">{domainJson.name}</Badge>:
          </p>
          <div className="my-5 flex items-start justify-start space-x-10 rounded-md bg-stone-50 p-2 dark:bg-stone-800 dark:text-white">
            <div>
              <p className="text-sm font-bold">Tipo</p>
              <p className="mt-2 font-mono text-sm">{txtVerification.type}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Nombre</p>
              <p className="mt-2 font-mono text-sm">
                {txtVerification.domain.slice(
                  0,
                  txtVerification.domain.length - domainJson.apexName.length - 1
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold">Valor</p>
              <p className="mt-2 font-mono text-sm">
                <span className="text-ellipsis">{txtVerification.value}</span>
              </p>
            </div>
          </div>
          <p className="text-sm dark:text-stone-400">
            Atención: si está utilizando este dominio para otro sitio, la
            creación de este registro TXT transferirá la propiedad del dominio a
            este sitio y dejará de estar operativo. Por favor, tenga cuidado al
            configurar este registro.
          </p>
        </>
      ) : status === "Unknown Error" ? (
        <p className="mb-5 text-sm dark:text-white">
          {domainJson.error.message}
        </p>
      ) : (
        <>
          <div className="flex justify-start space-x-4">
            <button
              type="button"
              onClick={() => setRecordType("A")}
              className={`${
                recordType == "A"
                  ? "border-black text-black dark:border-white dark:text-white"
                  : "border-white text-stone-400 dark:border-black dark:text-stone-600"
              } ease border-b-2 pb-1 text-sm transition-all duration-150`}
            >
              Registro A{!subdomain && " (recomendado)"}
            </button>
            <button
              type="button"
              onClick={() => setRecordType("CNAME")}
              className={`${
                recordType == "CNAME"
                  ? "border-black text-black dark:border-white dark:text-white"
                  : "border-white text-stone-400 dark:border-black dark:text-stone-600"
              } ease border-b-2 pb-1 text-sm transition-all duration-150`}
            >
              Registro CNAME{subdomain && " (recomendado)"}
            </button>
          </div>
          <div className="text-left">
            <p className="my-5 text-sm dark:text-white">
              Para configurar tu{" "}
              {recordType === "A" ? "apex domain" : "subdomain"}{" "}
              <Badge variant="outline">
                {recordType === "A" ? domainJson.apexName : domainJson.name}
              </Badge>
              , establece el siguiente registro {recordType} en tu proveedor de
              DNS para continuar:
            </p>
            <div className="flex items-center justify-start space-x-10 rounded-md p-2 border">
              <div>
                <p className="text-sm font-bold">Tipo</p>
                <p className="mt-2 font-mono text-sm">{recordType}</p>
              </div>
              <div>
                <p className="text-sm font-bold">Nombre</p>
                <p className="mt-2 font-mono text-sm">
                  {recordType === "A" ? "@" : subdomain ?? "www"}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">Valor</p>
                <p className="mt-2 font-mono text-sm">
                  {recordType === "A"
                    ? `76.76.21.21`
                    : `cname.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">TTL</p>
                <p className="mt-2 font-mono text-sm">86400</p>
              </div>
            </div>
            <p className="mt-5 text-sm dark:text-white">
              Nota: para TTL, si <Badge variant="outline">86400</Badge> no está
              disponible, establece el valor más alto posible. Además, la
              propagación del dominio puede tardar hasta 24 horas.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
