'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useRickMortyData } from '../hooks/useRickMortyData';
import EntityCard from '../componentes/EntityCard';
import SearchBar from '../componentes/SearchBar';
import { Location } from '../models/entities/Location';
import './localizacoes.scss';

const LocalizacoesPage = () => {
  const { entities, loading, error, handleFilterChange, handleSearch, searchTerm } = useRickMortyData();
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'dimension'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dimensionFilter, setDimensionFilter] = useState<string>('all');

  // Define o filtro para 'location' na montagem do componente
  useEffect(() => {
    handleFilterChange('location');
  }, [handleFilterChange]);

  // Filtrar apenas localizações
  const locations = useMemo(() => {
    return entities.filter(entity => entity instanceof Location) as Location[];
  }, [entities]);

  // Filtros adicionais
  const filteredLocations = useMemo(() => {
    let filtered = locations;

    // Filtro por tipo
    if (typeFilter !== 'all') {
      filtered = filtered.filter(location => location.type === typeFilter);
    }

    // Filtro por dimensão
    if (dimensionFilter !== 'all') {
      filtered = filtered.filter(location => location.dimension === dimensionFilter);
    }

    // Ordenação
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'type':
          aValue = a.type.toLowerCase();
          bValue = b.type.toLowerCase();
          break;
        case 'dimension':
          aValue = a.dimension.toLowerCase();
          bValue = b.dimension.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [locations, typeFilter, dimensionFilter, sortBy, sortOrder]);

  // Opções únicas para filtros
  const uniqueTypes = useMemo(() => {
    const types = locations.map(location => location.type);
    return [...new Set(types)].sort();
  }, [locations]);

  const uniqueDimensions = useMemo(() => {
    const dimensions = locations.map(location => location.dimension);
    return [...new Set(dimensions)].sort();
  }, [locations]);

  if (loading) {
    return (
      <div className="localizacoes-page loading">
        <div className="loading-spinner">
          <h2>Carregando localizações...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="localizacoes-page error">
        <h2>Erro ao carregar localizações</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="localizacoes-page">
      <header className="page-header">
        <h1>Localizações do Rick and Morty</h1>
        <p>Explore os diferentes planetas, dimensões e locais do universo Rick and Morty</p>
      </header>

      <div className="filters-section">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          placeholder="Buscar localizações..."
        />

        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="type-filter">Tipo:</label>
            <select 
              id="type-filter"
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
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
            >
              <option value="all">Todas as dimensões</option>
              {uniqueDimensions.map(dimension => (
                <option key={dimension} value={dimension}>{dimension}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-by">Ordenar por:</label>
            <select 
              id="sort-by"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'name' | 'type' | 'dimension')}
            >
              <option value="name">Nome</option>
              <option value="type">Tipo</option>
              <option value="dimension">Dimensão</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-order">Ordem:</label>
            <select 
              id="sort-order"
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            >
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-info">
        <p>Mostrando {filteredLocations.length} de {locations.length} localizações</p>
      </div>

      <div className="locations-grid">
        {filteredLocations.map(location => (
          <EntityCard 
            key={location.id} 
            entity={location} 
          />
        ))}
      </div>

      {filteredLocations.length === 0 && searchTerm && (
        <div className="no-results">
          <h3>Nenhuma localização encontrada para "{searchTerm}"</h3>
          <p>Tente buscar por outro termo</p>
        </div>
      )}
    </div>
  );
};

export default LocalizacoesPage;
