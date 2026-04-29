import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PawPrint, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Register = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState<"persona" | "ong">("persona");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "¡Cuenta creada! 🐾", description: "Registro simulado correctamente." });
      setLoading(false);
      navigate("/");
    }, 900);
  };

  return (
    <section className="container max-w-md py-16 md:py-24 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="inline-grid place-items-center w-14 h-14 rounded-2xl gradient-hero text-primary-foreground shadow-glow mb-4">
          <PawPrint className="w-6 h-6" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Únete a Paw+</h1>
        <p className="mt-2 text-muted-foreground">Crea tu cuenta y empieza a apoyar.</p>
      </div>

      <form onSubmit={submit} className="bg-card border border-border shadow-card rounded-3xl p-8 space-y-5">
        <div>
          <Label className="mb-2 block">Tipo de usuario</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: "persona" as const, Icon: User, l: "Persona natural" },
              { v: "ong" as const, Icon: Building2, l: "ONG" },
            ].map(({ v, Icon, l }) => (
              <button
                key={v}
                type="button"
                onClick={() => setTipo(v)}
                className={cn(
                  "p-4 rounded-2xl border text-sm font-semibold flex flex-col items-center gap-2 transition-smooth",
                  tipo === v
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Icon className="w-5 h-5" />
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombre">{tipo === "ong" ? "Nombre de la ONG" : "Nombre completo"}</Label>
          <Input id="nombre" required placeholder={tipo === "ong" ? "Patitas Felices" : "María García"} className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required placeholder="tu@email.com" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" required placeholder="Mínimo 8 caracteres" className="h-12 rounded-xl" />
        </div>

        <Button type="submit" disabled={loading} variant="hero" size="lg" className="w-full">
          {loading ? "Creando cuenta..." : "Registrarme"}
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-semibold hover:underline">Inicia sesión</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
