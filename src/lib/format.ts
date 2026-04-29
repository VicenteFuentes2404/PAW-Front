export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);

export const percent = (recaudado: number, meta: number) =>
  Math.min(100, Math.round((recaudado / meta) * 100));
