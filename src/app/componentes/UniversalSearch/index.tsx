'use client';
import { useState, useEffect } from 'react';
import { useRickMortySystem } from '../../hooks/useRickMortySystem';
import SearchBar from '../SearchBar';
import { Character } from '../../models/entities/Character';
import { Episode } from '../../models/entities/Episode';
import { Location } from '../../models/entities/Location';
import './index.scss';

type SearchableEntity = Character | Episode | Location;

export default function UniversalSearch() {
  const { 
    carregarDadosDaApi, 
    characters,
    episodes,
    locations,
    isLoading,
    error 
  } = useRickMortySystem();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchableEntity[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await carregarDadosDaApi();
      } catch (error) {
        // Error will be handled by the hook
      }
    };
    loadData();
  }, [carregarDadosDaApi]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Busca em todas as entidades usando IPesquisavel
    const allEntities = [...characters, ...episodes, ...locations];
    const results = allEntities.filter(entity => entity.atendeCriterio(query));
    
    setSearchResults(results);
  };

  const renderSearchItem = (item: SearchableEntity, index: number) => {
    if (item instanceof Character) {
      return (
        <div key={`character-${item.id}-${index}`} className="search-item character-item">
          <h3>{item.name}</h3>
          <p><strong>Tipo:</strong> Personagem</p>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Espécie:</strong> {item.species}</p>
        </div>
      );
    } else if (item instanceof Episode) {
      return (
        <div key={`episode-${item.id}-${index}`} className="search-item episode-item">
          <h3>{item.name}</h3>
          <p><strong>Tipo:</strong> Episódio</p>
          <p><strong>Episódio:</strong> {item.episode}</p>
          <p><strong>Data:</strong> {item.air_date}</p>
        </div>
      );
    } else if (item instanceof Location) {
      return (
        <div key={`location-${item.id}-${index}`} className="search-item location-item">
          <h3>{item.name}</h3>
          <p><strong>Tipo:</strong> Localização</p>
          <p><strong>Categoria:</strong> {item.type}</p>
          <p><strong>Dimensão:</strong> {item.dimension}</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="universal-search">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="universal-search">
        <div className="error-container">
          <h2>Erro ao carregar dados</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="universal-search">
      <div className="search-header">
        <SearchBar 
          searchTerm={searchQuery}
          onSearchChange={handleSearch}
          placeholder="Buscar personagens, episódios, localizações..."
        />
      </div>

      {searchQuery && searchResults.length > 0 ? (
        <div className="search-results">
          <div className="results-header">
            <h2>Resultados para: "{searchQuery}"</h2>
            <p>{searchResults.length} resultado(s) encontrado(s)</p>
          </div>
          
          <div className="results-list">
            {searchResults.map((item, index) => renderSearchItem(item, index))}
          </div>
        </div>
      ) : searchQuery ? (
        <div className="no-results">
          <h3>Nenhum resultado encontrado</h3>
          <p>Tente pesquisar por outro termo.</p>
        </div>
      ) : (
        <div className="search-placeholder">
          <div className="welcome-message">
            <h2>Busca Universal</h2>
            <p>Pesquise por personagens, episódios e localizações</p>
            <p><small>Todas as entidades implementam a interface IPesquisavel</small></p>
          </div>
        </div>
      )}
    </div>
  );
}
