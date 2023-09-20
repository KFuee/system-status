"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
  subdomain: z.string().nonempty("La URL del sitio es requerida"),
});

export default function SubdomainForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subdomain: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Subdominio</CardTitle>
        <CardDescription>
          Modifica el subdominio creado previamente.
        </CardDescription>
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <Form {...form}>
            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del sitio</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input {...field} />

                      <span className="absolute inset-y-0 right-0 p-3 flex items-center pointer-events-none rounded-r-md border z-10 bg-gray-50 text-gray-500">
                        .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </CardContent>

        <CardFooter>
          <div className="flex justify-end flex-1">
            <Button variant="default">Guardar</Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
