import { useState, useTransition } from "react";
import LoadingDots from "../icons/loading-dots";
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
import { deleteSite } from "@/lib/actions";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function DeleteSiteDialog({ id }: { id: string }) {
  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  function onSubmit() {
    startTransition(async () => {
      const res: any = await deleteSite(new FormData(), id, "delete");

      if (res.error) {
        setShow(false);
        toast({
          variant: "destructive",
          description: res.error,
        });

        return;
      }

      router.refresh();
      setShow(false);
      toast({
        variant: "default",
        description: "El sitio se ha eliminado correctamente",
      });
    });
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center space-x-2"
          onSelect={() => setShow(true)}
        >
          <span className="text-sm font-medium">Eliminar</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar sitio</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar este sitio? Esta acción no se
            puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={() => onSubmit()}
          >
            {isPending ? <LoadingDots color="#fff" /> : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
