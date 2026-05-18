export function normalizeCompany(value) {
  const txt = String(value || "").toLowerCase();
  if (txt.includes("tata")) return "Tata";
  if (txt.includes("ather")) return "Ather";
  if (txt.includes("jio")) return "Jio";
  if (txt.includes("statiq")) return "Statiq";
  if (txt.includes("iocl")) return "Iocl";
  return "Other";
}

export function normalizePower(value) {
  const txt = String(value || "").trim().toLowerCase();
  if (!txt || txt === "unknown") return "Unknown";

  if (txt.endsWith("kw")) {
    const n = txt.replace("kw", "").trim();
    return n ? n + "kW" : "Unknown";
  }

  const n = Number(txt);
  if (!Number.isNaN(n)) return String(n) + "kW";
  return "Unknown";
}
