import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Bienvenido de vuelta 🐾", description: "Inicio de sesión simulado." });
      setLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <section className="container max-w-md py-16 md:py-24 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="inline-grid place-items-center w-14 h-14 rounded-2xl gradient-hero text-primary-foreground shadow-glow mb-4">
          <PawPrint className="w-6 h-6" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Bienvenido de vuelta</h1>
        <p className="mt-2 text-muted-foreground">Inicia sesión para seguir cambiando vidas.</p>
      </div>

      <form onSubmit={submit} className="bg-card border border-border shadow-card rounded-3xl p-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required placeholder="tu@email.com" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" required placeholder="••••••••" className="h-12 rounded-xl" />
        </div>
        <Button type="submit" disabled={loading} variant="hero" size="lg" className="w-full">
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          ¿No tienes cuenta? <Link to="/register" className="text-primary font-semibold hover:underline">Regístrate</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
