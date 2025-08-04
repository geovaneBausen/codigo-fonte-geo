'use client';
import React from 'react';
import './sobre.scss';

const SobrePage = () => {
  return (
    <div className="sobre-page">
      <div className="notepad-container">
        <div className="notepad-header">
          <div className="notepad-tabs">
            <div className="tab active">sobre.txt</div>
          </div>
          <div className="notepad-controls">
            <button className="control-btn minimize">−</button>
            <button className="control-btn maximize">□</button>
            <button className="control-btn close">×</button>
          </div>
        </div>
        
        <div className="notepad-content">
          <div className="line-numbers">
            {Array.from({ length: 50 }, (_, i) => (
              <span key={i + 1} className="line-number">{i + 1}</span>
            ))}
          </div>
          
          <div className="text-content">
            <h1>Sobre o Projeto Rick and Morty Discovery</h1>
            
            <p>
              Este projeto foi desenvolvido como uma aplicação web interativa para explorar 
              o universo de Rick and Morty através da API oficial da série.
            </p>
            
            <h2>Funcionalidades Principais:</h2>
            <ul>
              <li>🏠 <strong>Home (Discovery):</strong> Visualização geral de personagens, localizações e episódios</li>
              <li>🌍 <strong>Localizações:</strong> Exploração detalhada de planetas e dimensões</li>
              <li>🔍 <strong>Busca Universal:</strong> Sistema de pesquisa que funciona em todas as entidades</li>
              <li>🎯 <strong>Filtros Avançados:</strong> Filtragem por tipo, dimensão e outras propriedades</li>
              <li>📱 <strong>Design Responsivo:</strong> Interface adaptável para todos os dispositivos</li>
            </ul>
            
            <h2>Tecnologias Utilizadas:</h2>
            <ul>
              <li>⚛️ <strong>Next.js 15:</strong> Framework React com Server-Side Rendering</li>
              <li>🎨 <strong>SCSS:</strong> Pré-processador CSS para estilos avançados</li>
              <li>📝 <strong>TypeScript:</strong> Tipagem estática para maior segurança</li>
              <li>🌐 <strong>Rick and Morty API:</strong> Fonte de dados oficial da série</li>
              <li>🏗️ <strong>Arquitetura SOLID:</strong> Princípios de design orientado a objetos</li>
            </ul>
            
            <h2>Padrões de Design Implementados:</h2>
            <ul>
              <li>🔧 <strong>Singleton:</strong> Controlador único para gerenciamento de dados</li>
              <li>🎭 <strong>Strategy:</strong> Diferentes estratégias de filtro e busca</li>
              <li>👁️ <strong>Observer:</strong> Reatividade aos estados da aplicação</li>
              <li>🎪 <strong>Polimorfismo:</strong> Renderização dinâmica de diferentes entidades</li>
            </ul>
            
            <h2>Características do Projeto:</h2>
            <p>
              A aplicação foi projetada com foco na experiência do usuário, oferecendo 
              uma interface intuitiva e moderna. O sistema de cards permite uma visualização 
              clara e organizada das informações, enquanto os filtros proporcionam uma 
              navegação eficiente.
            </p>
            
            <h2>Desenvolvido por:</h2>
            <p>
              <strong>Geovane Bausen</strong><br/>
              Estudante de TSI<br/>
        <br>https://github.com/geovaneBausen/codigo-fonte-geo/tree/main</br>
            </p>
            
            <h2>Agradecimentos:</h2>
            <p>
              Agradecimentos especiais aos criadores de Rick and Morty e aos mantenedores 
              da Rick and Morty API por disponibilizarem os dados de forma gratuita e 
              acessível para a comunidade de desenvolvedores. E aos meus orientadores das disciplinas de Arquitetura de Software: professor Bruno Clemente, Desenvolvimento Front-end II: professor Milton e Programação Orientada professor Arquimedes.
            </p>
            
            <div className="footer-note"> 
              <em>
                "Wubba lubba dub dub!" - Rick Sanchez<br/>
                Este projeto foi criado com paixão e dedicação.
              </em>
            </div>
          </div>
        </div>
        
        <div className="notepad-footer">
          <span className="status-info">Ln 1, Col 1</span>
          <span className="encoding">UTF-8</span>
          <span className="file-type">Texto simples</span>
        </div>
      </div>
    </div>
  );
};

export default SobrePage;
