import { Card, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";

export default function SiteCard() {
  return (
    <Card className="flex flex-col">
      <CardTitle className="flex items-center justify-between max-h-52 overflow-hidden rounded-t-lg mb-4">
        <Image
          src="https://images.unsplash.com/photo-1694830470387-2e0f234ecaf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
          alt="Logo"
          width={0}
          height={0}
          sizes="100vh"
          className="w-full h-auto"
        />
      </CardTitle>
      <CardContent className="flex flex-col">
        <div className="flex items-center justify-between space-x-6">
          <a
            href="https://nextjs-dashboard-starter.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:underline truncate"
          >
            https://test.com
          </a>

          <span className="text-sm text-gray-500">Operativo</span>
        </div>
      </CardContent>
    </Card>
  );
}
