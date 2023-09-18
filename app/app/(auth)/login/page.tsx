import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginButton from "./login-button";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Card className="rounded-none sm:rounded-lg w-full sm:max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">System status</CardTitle>
        <CardDescription>
          Inicia sesión en tu cuenta para ver el estado de tus servicios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <Suspense
            fallback={
              <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
            }
          >
            <LoginButton />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
