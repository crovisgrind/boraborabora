// -------------------------------------------------------------
// Tipos
// -------------------------------------------------------------
export type SourceRisk = "low" | "medium" | "high";
export type CrawlStrategy =
  | "scrape_listing"
  | "crawler_then_scrape"
  | "sitemap_if_available";
export interface RaceSource {
  name: string;
  url: string;
  risk: SourceRisk;
  strategy: CrawlStrategy;
  notes: string;
}
// -------------------------------------------------------------
// Lista oficial de fontes brasileiras para crawling/scraping
// -------------------------------------------------------------
export const raceSources: RaceSource[] = [
  {
    name: "CorridasBR",
    url: "https://www.corridasbr.com.br/",
    risk: "low",
    strategy: "scrape_listing",
    notes:
      "Site simples, HTML estático; ideal para scraping. Coletar nome, data, cidade, distância e link."
  },
  {
    name: "ChipTiming",
    url: "https://www.chiptiming.com.br/eventos",
    risk: "low",
    strategy: "scrape_listing",
    notes:
      "Eventos com ficha técnica pública. Evitar scraping de resultados (LGPD)."
  },
  {
    name: "Ticket Sports",
    url: "https://www.ticketsports.com.br/",
    risk: "medium",
    strategy: "crawler_then_scrape",
    notes:
      "Usa API interna. Evitar endpoints privados. Extrair apenas dados factuais da página final."
  },
];
// -------------------------------------------------------------
// Funções utilitárias
// -------------------------------------------------------------
export function getSourcesByRisk(risk: SourceRisk): RaceSource[] {
  return raceSources.filter((src) => src.risk === risk);
}