/**
 * Layout Principal da Aplicação Rick & Morty Universe Explorer
 * 
 * Este componente implementa o layout base da aplicação utilizando Next.js 13+ App Router.
 * 
 * Arquitetura implementada:
 * - Layout Pattern: Define estrutura comum para todas as páginas
 * - Composition Pattern: Utiliza children para compor diferentes páginas
 * - Responsive Design: Base para layouts responsivos em diferentes dispositivos
 * 
 * Funcionalidades:
 * - Configuração global de fontes (Geist Sans e Geist Mono)
 * - Navbar fixa para navegação entre seções
 * - Metadados SEO otimizados
 * - Estrutura semântica HTML5
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import NavBar from './componentes/NavBar'

// Configuração da fonte principal (Geist Sans)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configuração da fonte monoespaçada (Geist Mono) para código
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados da aplicação para SEO e redes sociais
export const metadata: Metadata = {
  title: "Rick & Morty Universe Explorer",
  description: "Explore o multiverso infinito de Rick and Morty! Descubra personagens, episódios e localizações interdimensionais.",
};

/**
 * Componente RootLayout - Layout raiz da aplicação
 * 
 * Define a estrutura HTML base que será compartilhada por todas as páginas.
 * Implementa o padrão Layout Component do Next.js para reutilização
 * de elementos comuns da interface.
 * 
 * @param children - Conteúdo específico de cada página que será renderizado
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Barra de navegação fixa presente em todas as páginas */}
        <NavBar />
        
        {/* Container principal onde o conteúdo específico de cada página será renderizado */}
        <main>
          {children} {/* Slot para conteúdo das páginas filhas */}
        </main>
      </body>
    </html>
  );
}