import { NextResponse } from "next/server";
import { crawlCorridasBR, ScrapedRace } from "@/crawlers/corridasBR";
import type { Race } from "@/types/races";

// Função de Normalização: Converte ScrapedRace (dado sujo) para Race (dado limpo/padronizado)
function normalizeRace(scrapedRace: ScrapedRace): Race | null {
    // 1. Geração de ID único (simplesmente encoda a URL base64)
    const id = Buffer.from(scrapedRace.url).toString('base64'); 

    // 2. Normalizar Distâncias
    // Ex: "5k / 10k" -> ["5K", "10K"]
    const distances = (scrapedRace.distance || "")
        .toUpperCase()
        .split('/')
        .map(d => d.trim().replace('KM', 'K').replace('KMS', 'K'))
        .filter(d => d.length > 0);

    // 3. Normalizar Localização (Cidade - UF)
    const cityStateMatch = scrapedRace.city?.match(/([^,]+)\s*-\s*([A-Z]{2})/i);
    const city = cityStateMatch ? cityStateMatch[1].trim() : scrapedRace.city || 'Desconhecida';
    const stateCode = cityStateMatch ? cityStateMatch[2].toUpperCase() : 'BR';
    
    // 4. Normalizar Data (DD/MM/AAAA -> ISO Date)
    let isoDate: string | null = null;
    if (scrapedRace.date) {
        try {
            const [day, month, year] = scrapedRace.date.split('/').map(Number);
            // new Date(year, monthIndex, day) - monthIndex é 0-based
            const dateObj = new Date(year, month - 1, day); 
            // Validação simples para evitar datas inválidas (ex: 30/02)
            if (dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day) {
                 isoDate = dateObj.toISOString();
            } else {
                 throw new Error("Data inválida após parse.");
            }
        } catch (e) {
            console.error(`Erro ao normalizar data: ${scrapedRace.date}`, e);
            isoDate = null;
        }
    }

    if (!scrapedRace.name || !isoDate) return null; // Ignora eventos sem nome ou data válida

    return {
        id,
        title: scrapedRace.name,
        location: `${city} - ${stateCode}`,
        url: scrapedRace.url,
        date: isoDate,
        distances: distances,
        type: 'road', 
        state: stateCode,
    } as Race;
}

// Handler da Rota GET (/api/races)
export async function GET() {
  console.log("Iniciando pipeline de crawl & normalize...");
  
  // 1. Executar Crawler
  const corridasBrData = await crawlCorridasBR();

  // 2. Normalizar e Filtrar dados inválidos
  const allNormalizedRaces = corridasBrData
    .map(normalizeRace)
    .filter((race): race is Race => race !== null);

  console.log(`Pipeline concluída. ${allNormalizedRaces.length} eventos prontos.`);
  
  // 3. Retornar dados
  return NextResponse.json(allNormalizedRaces);
}