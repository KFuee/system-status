"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().nonempty("El nombre del sitio es requerido"),
  subdomain: z.string().url("La URL del sitio es requerida"),
  description: z.string().nonempty("La descripción del sitio es requerida"),
});

export default function CreateSiteDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subdomain: "",
      description: "",
    },
  });

  const [show, setShow] = useState(false);

  function onOpenChange(open: boolean) {
    setShow(open);

    if (open) return;

    form.reset();
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      const { name, subdomain } = value;

      const subdomainValue = name
        ? name
            .toLowerCase()
            .trim()
            .replace(/[\W_]+/g, "-")
        : "";

      if (subdomainValue === subdomain) return;
      form.setValue("subdomain", subdomainValue);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Dialog open={show} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center space-x-2"
          onSelect={() => setShow(true)}
        >
          <PlusCircle className="h-4 w-4" />

          <span className="text-sm font-medium">Nuevo sitio</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear sitio</DialogTitle>
          <DialogDescription>
            Crea un nuevo sitio para empezar a monitorear su disponibilidad.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del sitio</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subdomain"
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShow(false)}>
                Cancelar
              </Button>
              <Button type="submit">Crear</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
