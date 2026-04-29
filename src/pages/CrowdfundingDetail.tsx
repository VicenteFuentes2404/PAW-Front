import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Heart, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { Skeleton } from "@/components/Skeleton";
import { useFetch } from "@/hooks/useFetch";
import { fetchCampaign, fetchFundacion } from "@/services/mockData";
import { formatCurrency, percent } from "@/lib/format";
import { toast } from "@/hooks/use-toast";

const CrowdfundingDetail = () => {
  const { id = "" } = useParams();
  const { data: c, loading } = useFetch(() => fetchCampaign(id), [id]);
  const { data: f } = useFetch(() => (c ? fetchFundacion(c.fundacionId) : Promise.resolve(undefined)), [c?.fundacionId]);
  const [amount, setAmount] = useState(50000);

  if (loading) {
    return (
      <div className="container py-10 space-y-6">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-10 w-1/2" />
      </div>
    );
  }

  if (!c) return <p className="container py-20 text-center">Campaña no encontrada.</p>;

  const pct = percent(c.recaudado, c.meta);

  const donate = () => {
    toast({
      title: "¡Gracias por tu donación! 🐾",
      description: `Tu aporte de ${formatCurrency(amount)} fue simulado correctamente.`,
    });
  };

  return (
    <>
      <div className="relative h-80 md:h-[480px] overflow-hidden">
        <img src={c.imagen} alt={c.titulo} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute top-6 left-6">
          <Button asChild variant="outline" size="sm" className="bg-card/80 backdrop-blur">
            <Link to="/crowdfundings"><ArrowLeft className="w-4 h-4" /> Volver</Link>
          </Button>
        </div>
      </div>

      <section className="container -mt-24 relative grid lg:grid-cols-3 gap-8 pb-16">
        <div className="lg:col-span-2 bg-card rounded-3xl border border-border shadow-card p-6 md:p-10 animate-fade-in-up">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
            {c.categoria}
          </span>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">{c.titulo}</h1>

          {f && (
            <Link to={`/fundacion/${f.id}`} className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth">
              <span className="w-8 h-8 rounded-full bg-secondary grid place-items-center text-lg">{f.logo}</span>
              Por <span className="font-semibold text-foreground">{f.nombre}</span>
            </Link>
          )}

          <p className="mt-6 text-muted-foreground leading-relaxed whitespace-pre-line">{c.descripcion}</p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { Icon: Users, n: c.donantes, l: "Donantes" },
              { Icon: Clock, n: `${c.diasRestantes}`, l: "Días restantes" },
              { Icon: Heart, n: `${pct}%`, l: "Completado" },
            ].map(({ Icon, n, l }) => (
              <div key={l} className="bg-secondary/50 rounded-2xl p-4 text-center">
                <Icon className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="font-display text-2xl font-bold">{n}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Donation card */}
        <aside className="lg:sticky lg:top-28 self-start bg-card rounded-3xl border border-border shadow-card p-6 md:p-8 animate-scale-in">
          <p className="text-3xl md:text-4xl font-display font-bold text-primary">{formatCurrency(c.recaudado)}</p>
          <p className="text-sm text-muted-foreground">recaudados de <span className="font-semibold text-foreground">{formatCurrency(c.meta)}</span></p>

          <div className="my-5">
            <ProgressBar value={pct} />
            <p className="mt-2 text-sm font-semibold text-primary">{pct}% completado</p>
          </div>

          <p className="text-sm font-semibold mb-2">Elige un monto</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[20000, 50000, 100000].map((v) => (
              <button
                key={v}
                onClick={() => setAmount(v)}
                className={`py-2 rounded-full text-sm font-semibold border transition-smooth ${
                  amount === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary"
                }`}
              >
                {formatCurrency(v)}
              </button>
            ))}
          </div>
          <input
            type="number"
            min={1000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-12 rounded-full px-5 bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />

          <Button onClick={donate} variant="hero" size="lg" className="w-full mt-4">
            <Heart className="w-4 h-4 fill-current" /> Donar {formatCurrency(amount)}
          </Button>
          <Button variant="ghost" size="sm" className="w-full mt-2">
            <Share2 className="w-4 h-4" /> Compartir
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-4">
            100% de tu donación llega a la fundación.
          </p>
        </aside>
      </section>
    </>
  );
};

export default CrowdfundingDetail;
