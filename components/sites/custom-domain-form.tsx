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
import { Site } from "@prisma/client";
import { useTransition } from "react";
import { updateSite } from "@/lib/actions";
import { useToast } from "../ui/use-toast";
import LoadingDots from "../icons/loading-dots";

export const formSchema = z.object({
  customDomain: z.string(),
});

export default function CustomDomainForm({ site }: { site: Site }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customDomain: site.customDomain ?? "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("customDomain", data.customDomain);
      const res = await updateSite(formData, site.id, "customDomain");
      console.log("res", res);

      toast({
        variant: res.error ? "destructive" : "default",
        description:
          res.error ?? "Dominio personalizado actualizado correctamente",
      });
    });
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Dominio personalizado</CardTitle>
        <CardDescription>
          Asocia un dominio personalizado a tu sitio.
        </CardDescription>
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <Form {...form}>
            <FormField
              control={form.control}
              name="customDomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del sitio</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </CardContent>

        <CardFooter>
          <div className="flex justify-end flex-1">
            <Button disabled={isPending} variant="default">
              {isPending ? <LoadingDots color="#fff" /> : "Guardar"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
