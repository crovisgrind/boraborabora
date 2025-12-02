// src/crawlers/corridasBR.ts

import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";
import * as crypto from "crypto";
import type { ScrapedRace } from "../types/races";

// Lista com as siglas dos 27 Estados e DF
const ESTADOS: string[] = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const BASE_URL = "https://corridasbr.com.br/";
const CALENDARIO_PATH = "/calendario.asp"; 

// Seletor que aponta para a tabela que contém a lista de corridas.
// MANTIDO: 'body > table:nth-child(4) > tbody > tr > td:nth-child(1) > table:nth-child(5)'
const RACE_LIST_CONTAINER_SELECTOR = 'body > table:nth-child(4) > tbody > tr > td:nth-child(1) > table:nth-child(5)';

export async function crawlCorridasBR(): Promise<ScrapedRace[]> {
  console.log("[Crawler CorridasBR] Iniciando busca sequencial por estado...");
  let allScrapedRaces: ScrapedRace[] = [];
  const start = Date.now();

  for (const estado of ESTADOS) {
    const URL_ESTADO = `${BASE_URL}${estado}${CALENDARIO_PATH}`;

    try {
      const { data: html } = await axios.get(URL_ESTADO, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        timeout: 15000,
      });

      const $ = cheerio.load(html);
      const racesFromState: ScrapedRace[] = [];
      let raceCount = 0;

      const raceTable = $(RACE_LIST_CONTAINER_SELECTOR);

      raceTable.find('> tbody > tr').each((i, element) => {
        // Ignora as duas primeiras linhas (i < 2) - prováveis cabeçalhos
        if (i < 2) return; 

        const tds = $(element).find('td');
        
        // --------------------------------------------------------------------------
        // 🚨 FOCO NA REVISÃO: Estes índices .eq(n) devem coincidir com as colunas!
        // --------------------------------------------------------------------------
        
        // Coluna 1 (índice 0): Título e Link
        // Tenta pegar o primeiro link <a> dentro da primeira célula
        const titleElement = tds.eq(0).find('a').first(); 
        const title = titleElement.text().trim();
        const relativeUrl = titleElement.attr('href');
        const url = relativeUrl ? `${BASE_URL}${relativeUrl}` : '';

        // Coluna 2 (índice 1): Data
        const dateText = tds.eq(1).text().trim(); 

        // Coluna 3 (índice 2): Localização (cidade/detalhe)
        const cityDetail = tds.eq(2).text().trim(); 
        const location = cityDetail ? `${cityDetail}, ${estado}` : estado;

        // Coluna 4 (índice 3): Distâncias
        const distanceText = tds.eq(3).text().trim();
        const distances = distanceText ? distanceText.split('/').map(d => d.trim()).filter(d => d.length > 0) : ['Não informada'];

        if (title) {
            racesFromState.push({ 
                id: crypto.randomUUID(), 
                title: title,
                type: (title.toLowerCase().includes('trilha') || distanceText.toLowerCase().includes('trail')) ? 'trail' : 'road', 
                location: location, 
                date: dateText,
                distances: distances,
                url: url,
                state: estado, 
            } as ScrapedRace);
            raceCount++;
        }
      });
      
      allScrapedRaces.push(...racesFromState);
      
      console.log(`[Crawler CorridasBR] HTML de ${estado} capturado. Encontradas ${raceCount} corridas. Total acumulado: ${allScrapedRaces.length}`);
      
    } catch (error) {
      const errorMessage = error instanceof AxiosError ? error.message : "Erro desconhecido";
      // Loga um aviso para 429 ou 500, mas não interrompe a busca.
      console.warn( 
        `[Crawler CorridasBR] Falha em ${estado} (${URL_ESTADO}):`,
        errorMessage
      );
    }
    
    // Aumenta o delay para evitar o erro 429
    await new Promise(resolve => setTimeout(resolve, 1200)); // AGORA 1.2 SEGUNDOS
  }

  const end = Date.now();
  const duration = ((end - start) / 1000).toFixed(2);
  
  console.log(
    `[Crawler CorridasBR] Busca completa em ${duration}s. ${allScrapedRaces.length} eventos prontos.`
  );
  return allScrapedRaces;
}