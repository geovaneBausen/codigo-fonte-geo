'use client';
import { useState, useEffect } from 'react';
import { useRickMortyData } from '../../hooks/useRickMortyData';
import SearchBar from '../SearchBar';
import { Character } from '../../models/entities/Character';
import { Episode } from '../../models/entities/Episode';
import { Location } from '../../models/entities/Location';
import './index.scss';

// Union type para todas as entidades pesquisáveis do sistema
type SearchableEntity = Character | Episode | Location;

/**
 * Componente de busca universal que permite pesquisar em todas as entidades
 */
export default function UniversalSearch() {
  // Hook customizado que gerencia todo o estado da aplicação
  const { 
    entities,        // Array de todas as entidades carregadas
    loading,         // Estado de carregamento da API
    error,           // Estado de erro
    handleSearch     // Função para busca no hook
  } = useRickMortyData();
  
  // Estados locais do componente para controle da interface
  const [searchQuery, setSearchQuery] = useState('');           // Termo de busca atual
  const [searchResults, setSearchResults] = useState<SearchableEntity[]>([]); // Resultados filtrados

  /**
   * Efeito para sincronizar os dados do hook com o estado local
   * 
   * Quando as entidades são carregadas pelo hook, atualiza os resultados locais.
   * Implementa o padrão Observer: reage às mudanças no estado do hook.
   */
  useEffect(() => {
    setSearchResults(entities);
  }, [entities]);

  /**
   * Manipula mudanças na busca
   * 
   * Implementa a lógica de filtro usando a interface IPesquisavel.
   * Utiliza o método polimórfico atendeCriterio() de cada entidade.
   * 
   * Padrões aplicados:
   * - Strategy: Cada entidade implementa sua própria estratégia de busca
   * - Polymorphism: Mesmo método (atendeCriterio) com comportamentos diferentes
   * 
   * @param query - Termo de busca inserido pelo usuário
   */
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    
    // Se não há termo de busca, mostra todas as entidades
    if (!query.trim()) {
      setSearchResults(entities);
      return;
    }

    // Aplica filtro usando a interface IPesquisavel
    // Cada entidade decide como atende ao critério de busca
    const results = entities.filter(entity => entity.atendeCriterio(query));
    setSearchResults(results);
  };

  /**
   * Renderiza item de resultado baseado no tipo da entidade
   * 
   * Implementa o padrão Strategy para renderização específica por tipo.
   * Utiliza instanceof para verificação de tipo em runtime (Type Guards).
   * 
   * @param item - Entidade a ser renderizada
   * @param index - Índice para chave única do React
   * @returns JSX.Element do item renderizado ou null
   */
  const renderSearchItem = (item: SearchableEntity, index: number) => {
    // Propriedades base reutilizáveis para todos os tipos
    const baseProps = {
      key: `${item.constructor.name.toLowerCase()}-${item.id}-${index}`,
      className: `search-item ${item.constructor.name.toLowerCase()}-item`
    };

    // Strategy Pattern: Renderização específica por tipo de entidade
    if (item instanceof Character) {
      return (
        <div {...baseProps}>
          <h3>{item.name}</h3>
          <p><strong>Personagem</strong> • {item.status} • {item.species}</p>
        </div>
      );
    }
    
    if (item instanceof Episode) {
      return (
        <div {...baseProps}>
          <h3>{item.name}</h3>
          <p><strong>Episódio</strong> • {item.episode} • {item.air_date}</p>
        </div>
      );
    }
    
    if (item instanceof Location) {
      return (
        <div {...baseProps}>
          <h3>{item.name}</h3>
          <p><strong>Localização</strong> • {item.type} • {item.dimension}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="universal-search loading">
        <div className="loading-spinner"></div>
        <p>Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="universal-search error">
        <h2>Erro ao carregar dados</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Renderização principal da interface
  return (
    <div className="universal-search">
      {/* Componente filho controlado (Controlled Component Pattern) */}
      <SearchBar 
        searchTerm={searchQuery}
        onSearchChange={handleSearchChange}
        placeholder="Buscar personagens, episódios, localizações..."
      />

      {/* Renderização condicional baseada no estado da busca */}
      {searchQuery ? (
        // Se há termo de busca, mostra resultados ou mensagem de "não encontrado"
        searchResults.length > 0 ? (
          <div className="search-results">
            <h2>Resultados para: "{searchQuery}" ({searchResults.length})</h2>
            <div className="results-list">
              {/* Renderiza cada resultado usando a função strategy */}
              {searchResults.map(renderSearchItem)}
            </div>
          </div>
        ) : (
          // Estado de busca sem resultados
          <div className="no-results">
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente pesquisar por outro termo.</p>
          </div>
        )
      ) : (
        // Estado inicial sem busca ativa
        <div className="search-placeholder">
          <h2>Busca Universal</h2>
          <p>Pesquise por personagens, episódios e localizações</p>
          <p><small>Sistema implementa interface IPesquisavel para busca polimórfica</small></p>
        </div>
      )}
    </div>
  );
}