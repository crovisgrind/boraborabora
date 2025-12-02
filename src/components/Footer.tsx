"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-(--surface-1) border-t border-(--surface-2) mt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-(--text-primary) mb-2">
              BoraBoraBora {/* Renomeado de RaceClarity */}
            </h3>
            <p className="text-sm text-(--text-secondary)">
              Encontre sua próxima corrida no Brasil. Busque por distância, localização e data. {/* Tradução */}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-(--text-primary) mb-4 uppercase tracking-wide">
              Links Rápidos {/* Tradução */}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-(--text-secondary) hover:text-(--accent) transition-colors"
                >
                  Início {/* Tradução */}
                </Link>
              </li>
              {/* Adicione outros links se necessário */}
            </ul>
          </div>

          {/* Social Links/Contact (Mantenha ou Remova) */}
          <div className="md:col-span-2 flex justify-end">
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/seuperfil" // Ajuste
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--text-secondary) hover:text-(--accent) transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/seurepositorio" // Ajuste
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--text-secondary) hover:text-(--accent) transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@boraborabora.com" // Ajuste
                className="text-(--text-secondary) hover:text-(--accent) transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-(--surface-2) my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-(--text-secondary) mb-4 md:mb-0">
            &copy; {currentYear} BoraBoraBora. Todos os direitos reservados. {/* Tradução */}
          </p>

          <p className="text-xs text-(--text-secondary)">
            Dados de corrida fornecidos por nosso sistema de {" "} {/* Tradução */}
            <a
              href="#"
              className="text-(--accent) hover:underline"
            >
              Crawlers
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}