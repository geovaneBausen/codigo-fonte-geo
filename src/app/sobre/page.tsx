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
            <h1>Sobre a Arquitetura do Projeto</h1>
            
            <p>
              O projeto foi desenvolvido utilizando principalmente TypeScript, React e Next.js, compondo uma arquitetura moderna e robusta para aplicações web. O TypeScript foi adotado para trazer tipagem estática ao JavaScript, aumentando a confiabilidade do código e facilitando a manutenção, especialmente em projetos grandes e orientados a objetos. A estruturação das entidades, interfaces e controllers foi feita aproveitando ao máximo os recursos de tipagem e orientação a objetos que o TypeScript oferece.
            </p>

            <p>
              React foi a biblioteca responsável pela construção da interface do usuário, com foco em componentização e reatividade. Todos os elementos de interface, como barra de navegação, filtros, cards de entidades e busca universal, foram criados como componentes reutilizáveis. O padrão de composição foi empregado através do RootLayout, que define a base comum para todas as páginas, garantindo uma experiência consistente e fácil de expandir.
            </p>

            <p>
              O Next.js foi utilizado como framework para React, proporcionando recursos avançados como o App Router, renderização do lado do servidor (SSR), roteamento automático e otimização de desempenho. Isso permitiu que a aplicação fosse responsiva, rápida e amigável para mecanismos de busca. Além disso, o Next.js facilitou a organização das páginas e a separação clara entre frontend e lógica de negócio.
            </p>

            <p>
              No backend da aplicação (lado do modelo e lógica), foi aplicada uma arquitetura orientada a objetos. As principais entidades - Personagem, Episódio e Localização - foram modeladas a partir de uma classe base abstrata chamada EntidadeBase, que implementa a interface IPesquisavel. Cada entidade concreta especializa e estende os métodos e propriedades herdados, respeitando princípios como SRP (responsabilidade única) e OCP (aberto/fechado).
            </p>

            <p>
              Para centralizar as operações de negócio, foi criado o RickMortyController, um Singleton responsável por consumir a API pública Rick and Morty, armazenar os dados localmente, gerenciar operações CRUD e executar buscas polimórficas. O controller interage com as entidades via interfaces e abstrações, garantindo baixo acoplamento e alta coesão. Estratégias de busca e filtros são aplicadas diretamente pelo controller, seguindo o padrão Strategy.
            </p>

            <p>
              No frontend, a comunicação entre os componentes e o controller é feita por meio de custom hooks, como o <code>useRickMortyData</code>. Esses hooks utilizam o padrão Observer para garantir reatividade: qualquer mudança nos dados é imediatamente refletida na interface. Dessa forma, os componentes permanecem desacoplados da lógica de negócio, focando apenas na apresentação visual.
            </p>

            <p>
              A estilização da aplicação foi realizada com SCSS e CSS Modules, permitindo a criação de temas e estilos encapsulados para cada componente. Isso garantiu uma interface moderna, responsiva e de fácil manutenção. Além disso, bibliotecas como React Icons e React Spinners foram usadas para enriquecer a experiência visual e fornecer feedback ao usuário durante operações assíncronas, como carregamento de dados.
            </p>

            <p>
              Por fim, o projeto aplicou princípios sólidos de design de software, como SOLID e GRASP, para garantir um código limpo, modular e extensível. O uso combinado de TypeScript, React, Next.js, padrões de projeto e boas práticas de arquitetura resultou em uma aplicação eficiente, fácil de evoluir e com ótima experiência para o usuário.
            </p>
            
            <div className="footer-note"> 
              <em>
                "Wubba lubba dub dub!" - Rick Sanchez<br/>
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
