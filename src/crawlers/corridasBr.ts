// src/crawlers/corridasBR.ts

import * as cheerio from 'cheerio';
import { type Race } from '@/types/races'; 
import { URL } from 'url';

const BRAZILIAN_STATES_UF: string[] = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];
const BASE_URL = "https://corridasbr.com.br";
const CALENDARIO_PATH = "/calendario.asp";
const RACE_LIST_CONTAINER_SELECTOR = 
    'body > table:nth-child(4) > tbody > tr > td:nth-child(1) > table:nth-child(5)';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function parseDistances(distancesRaw: string): string[] {
    return distancesRaw.split(/[,/]/)
        .map(d => d.trim().toUpperCase().replace(/KM$/, 'K').replace('K ', 'K'))
        .filter(d => d.length > 0)
        .map(d => d === 'MEIA MARATONA' ? '21.1K' : d) 
        .map(d => d.includes('MARATONA') && d.length > 8 ? '42.2K' : d) 
        .map(d => d.includes('K') && parseFloat(d) > 42.2 ? 'ULTRA' : d) 
        .filter((d, i, arr) => arr.indexOf(d) === i); 
}


async function processState(uf: string): Promise<Race[]> {
    // ⚠️ Importante: Verifica se o UF é válido antes de prosseguir
    if (!BRAZILIAN_STATES_UF.includes(uf)) {
        console.warn(`[WARN] UF inválido (${uf}) ignorado.`);
        return [];
    }
    
    const targetUrl = `${BASE_URL}/${uf}${CALENDARIO_PATH}`;
    const racesForState: Race[] = [];

    try {
        const response = await fetch(targetUrl, {
             headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            }
        });

        if (!response.ok) {
            console.warn(`[WARN] Falha ao carregar ${uf}: ${response.statusText}. Pulando.`);
            return racesForState; 
        }

        const buffer = await response.arrayBuffer();
        const html = new TextDecoder('iso-8859-1').decode(buffer);
        const $ = cheerio.load(html);

        const raceTable = $(RACE_LIST_CONTAINER_SELECTOR);

        if (raceTable.length === 0) {
            return racesForState;
        }

        raceTable.find('tbody > tr').each((i, element) => {
            
            // Ignora linhas de cabeçalho
            if (i < 2) return; 

            const tds = $(element).find('td');
            
            if (tds.length < 4) return;
            
            const dateRaw = tds.eq(0).text().trim();           
            const cityDetail = tds.eq(1).text().trim();        
            const $titleColumn = tds.eq(2);
            const $link = $titleColumn.find('a').first(); 
            const title = $link.text().trim();
            const distancesText = tds.eq(3).text().trim();      

            // 🔑 CORREÇÃO DA URL: Remove o nome da corrida que quebra o link
            const fullRelativePath = $link.attr('href')?.trim();
            let urlRelative: string | undefined = fullRelativePath;

            if (fullRelativePath) {
                // Encontra a posição do primeiro '&' e corta o resto.
                const ampersandIndex = fullRelativePath.indexOf('&');
                if (ampersandIndex !== -1) {
                    urlRelative = fullRelativePath.substring(0, ampersandIndex);
                }
            }


            if (title && urlRelative && dateRaw) {
                
                const location = cityDetail ? `${cityDetail}, ${uf}` : uf;
                const type: 'road' | 'trail' = title.toLowerCase().includes('trilha') || location.toLowerCase().includes('trilha') ? 'trail' : 'road';
                const distances = parseDistances(distancesText);

                const newRace: Race = {
                    id: `${uf}-${title}-${dateRaw}`.replace(/\s/g, '_'), 
                    title: title,
                    location: location,
                    date: dateRaw, 
                    distances: distances,
                    type: type,
                    url: new URL(urlRelative, BASE_URL).href, 
                    // 🔑 CORREÇÃO DO FILTRO: Garantimos que o estado seja sempre o UF válido da iteração
                    state: uf,
                };
                
                // 💡 DEBUG: Log para inspecionar o estado das primeiras corridas
                if (racesForState.length < 2) {
                     console.log(`[DEBUG RACE ${uf}] Race State: '${newRace.state}', Title: '${newRace.title}'`);
                }

                racesForState.push(newRace);
            }
        });

    } catch (error) {
        console.error(`Erro inesperado durante o crawling para ${uf}:`, error);
    }
    
    return racesForState;
}

// -----------------------------------------------------------------
// CRAWLER PRINCIPAL SEQUENCIAL COM DELAY E EXPORT DEFAULT
// -----------------------------------------------------------------
export default async function crawlCorridasBR(): Promise<Race[]> {
    const allRaces: Race[] = [];
    const DELAY_MS = 5000; 

    console.log("Iniciando crawl sequencial (com DELAY ALTO) para múltiplos estados...");
    const start = Date.now();

    for (const uf of BRAZILIAN_STATES_UF) {
        
        const races = await processState(uf);
        allRaces.push(...races);
        
        console.log(`[INFO] ${uf} concluído. Total até agora: ${allRaces.length} corridas.`);

        await delay(DELAY_MS); 
    }

    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.log(
        `[Crawler CorridasBR] Busca completa em ${duration}s. ${allRaces.length} eventos prontos.`
    );

    return allRaces;
}