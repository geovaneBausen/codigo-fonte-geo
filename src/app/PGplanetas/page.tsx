'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useRickMortyData } from '../hooks/useRickMortyData';
import LocationCard from '../componentes/LocationCard';
import SearchBar from '../componentes/SearchBar';
import { Location } from '../models/entities/Location';
import './planetas.scss';

const PlanetasPage = () => {
  const { entities, loading, error, handleFilterChange, handleSearch, searchTerm } = useRickMortyData();
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'dimension'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dimensionFilter, setDimensionFilter] = useState<string>('all');

  // Define o filtro para 'location' na montagem do componente
  useEffect(() => {
    handleFilterChange('location');
  }, [handleFilterChange]);

  // O array 'entities' já contém apenas localizações, então podemos fazer o casting
  const locations = useMemo(() => {
    // Filtrar apenas entidades que parecem ser localizações
    const locationEntities = entities.filter(entity => {
      // Verificar se é uma instância de Location ou tem propriedades de Location
      if (entity instanceof Location) return true;
      
      // Verificar se tem propriedades específicas de Location
      const entityAny = entity as any;
      return entityAny && 
             (entityAny.type !== undefined ||
              entityAny.dimension !== undefined ||
              entityAny.residents !== undefined);
    });
    return locationEntities as Location[];
  }, [entities]);

  // Filtrar localizações válidas para evitar erros
  const validLocations = useMemo(() => {
    return locations.filter(location => 
      location && 
      location.id !== undefined && 
      location.id !== null &&
      location.name !== undefined &&
      location.name !== null &&
      // Garantir que é realmente uma instância de Location
      (location.constructor.name === 'Location' || 
       location.type !== undefined || 
       location.dimension !== undefined)
    );
  }, [locations]);

  // Obter listas únicas para os filtros
  const uniqueTypes = useMemo(() => {
    const types = validLocations
      .map(loc => loc.type)
      .filter(type => type && typeof type === 'string' && type.trim() !== '');
    return Array.from(new Set(types)).sort();
  }, [validLocations]);

  const uniqueDimensions = useMemo(() => {
    const dimensions = validLocations
      .map(loc => loc.dimension)
      .filter(dimension => dimension && typeof dimension === 'string' && dimension.trim() !== '');
    return Array.from(new Set(dimensions)).sort();
  }, [validLocations]);

  // Aplicar filtros adicionais
  const filteredLocations = useMemo(() => {
    return validLocations.filter(location => {
      const typeMatch = typeFilter === 'all' || 
        (location.type && location.type === typeFilter);
      const dimensionMatch = dimensionFilter === 'all' || 
        (location.dimension && location.dimension === dimensionFilter);
      return typeMatch && dimensionMatch;
    });
  }, [validLocations, typeFilter, dimensionFilter]);

  // Função para ordenar localizações
  const sortedLocations = useMemo(() => {
    return [...filteredLocations].sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (sortBy) {
        case 'type':
          aValue = (a.type || '').toLowerCase();
          bValue = (b.type || '').toLowerCase();
          break;
        case 'dimension':
          aValue = (a.dimension || '').toLowerCase();
          bValue = (b.dimension || '').toLowerCase();
          break;
        default:
          aValue = (a.name || '').toLowerCase();
          bValue = (b.name || '').toLowerCase();
          break;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredLocations, sortBy, sortOrder]);

  const handleSortChange = (newSortBy: 'name' | 'type' | 'dimension') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  // Função para gerar chave única
  const generateUniqueKey = (location: Location, index: number) => {
    const id = location.id || 'unknown';
    const name = location.name ? location.name.substring(0, 10).replace(/\s+/g, '') : 'noname';
    return `location-${id}-${name}-${index}`;
  };

  // Remover localizações duplicadas pelo id e garantir unicidade
  const uniqueLocations = useMemo(() => {
    const seen = new Set();
    return sortedLocations.filter(location => {
      const uniqueKey = `${location.id}-${location.name}`;
      if (seen.has(uniqueKey)) {
        return false;
      }
      seen.add(uniqueKey);
      return true;
    });
  }, [sortedLocations]);

  console.log('Dados dos locais:', uniqueLocations);
  console.log('Tipos de entidades recebidas:', entities.map(e => ({ 
    id: e.id, 
    name: e.name, 
    constructor: e.constructor.name,
    isLocation: e instanceof Location 
  })));

  if (loading) {
    return (
      <div className="planetas-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando localizações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="planetas-page">
        <div className="error-container">
          <h2>Erro ao carregar dados</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="planetas-page">
      <div className="controls-section">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={handleSearch} 
          placeholder="Pesquisar localizações..." 
        />
        
        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="type-filter">Tipo:</label>
            <select 
              id="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-dropdown"
            >
              <option value="all">Todos os tipos</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="dimension-filter">Dimensão:</label>
            <select 
              id="dimension-filter"
              value={dimensionFilter}
              onChange={(e) => setDimensionFilter(e.target.value)}
              className="filter-dropdown"
            >
              <option value="all">Todas as dimensões</option>
              {uniqueDimensions.map(dimension => (
                <option key={dimension} value={dimension}>{dimension}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="sort-controls">
          <label>Ordenar por:</label>
          <div className="sort-buttons">
            <button 
              className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
              onClick={() => handleSortChange('name')}
            >
              Nome {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              className={`sort-btn ${sortBy === 'type' ? 'active' : ''}`}
              onClick={() => handleSortChange('type')}
            >
              Tipo {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              className={`sort-btn ${sortBy === 'dimension' ? 'active' : ''}`}
              onClick={() => handleSortChange('dimension')}
            >
              Dimensão {sortBy === 'dimension' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      <div className="results-info">
        <p>Encontradas: <strong>{uniqueLocations.length}</strong> localizações</p>
      </div>

      <div className="locations-grid">
        {uniqueLocations.length > 0 ? (
          uniqueLocations.map((location, index) => (
            <LocationCard 
              key={generateUniqueKey(location, index)} 
              location={location}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>Nenhuma localização encontrada</h3>
            <p>
              {searchTerm 
                ? `Nenhuma localização encontrada para "${searchTerm}"` 
                : 'Tente ajustar sua busca ou limpar os filtros'
              }
            </p>
            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={() => handleSearch('')}
              >
                Limpar pesquisa
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetasPage;  