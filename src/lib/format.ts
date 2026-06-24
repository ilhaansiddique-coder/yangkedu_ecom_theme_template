/** Format a number as a $ price. Keeps up to 2 decimals, drops trailing zeros. */
export function money(amount: number): string {
  const s = amount % 1 === 0 ? amount.toString() : amount.toFixed(2);
  return `$${s}`;
}

/** "128.3k sold" style sold count. */
export function soldLabel(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k sold`;
  return `${n} sold`;
}

/** "Jun 24, 2026 · 3:42 PM" style timestamp for orders. */
export function formatDate(ms: number): string {
  return new Date(ms).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
