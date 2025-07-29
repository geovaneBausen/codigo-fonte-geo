'use client';
import React from 'react';
import { useRickMortyData } from './hooks/useRickMortyData';
import SearchBar from './componentes/SearchBar';
import FilterSelect from './componentes/FilterSelect';
import EntityCard from './componentes/EntityCard';
import './page.scss';

// Main page demonstrating the complete system
// Flow: API → Hook → State → Components → UI
export default function Home() {
    const {
        entities,
        searchTerm,
        filterType,
        loading,
        error,
        handleSearch,
        handleFilterChange,
        getEntitiesByType
    } = useRickMortyData();

    if (loading) {
        return (
            <div className="home loading-state">
                <div className="loading-spinner">
                    <h2>Carregando dados do universo Rick and Morty...</h2>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home error-state">
                <h2>Erro ao carregar dados</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="home">
            {/* Busca universal polimórfica */}
            <div className="search-section">
                <SearchBar 
                    searchTerm={searchTerm}
                    onSearchChange={handleSearch}
                    placeholder="Buscar personagens, locais ou episódios..."
                />
                <FilterSelect 
                    filterType={filterType}
                    onFilterChange={handleFilterChange}
                />
            </div>
            
            {/* Listagem de entidades com componentes polimórficos */}
            <main className="entities-section">
                {entities.length === 0 && searchTerm ? (
                    <div className="no-results">
                        <h3>Nenhum resultado encontrado para "{searchTerm}"</h3>
                        <p>Tente buscar por outro termo</p>
                    </div>
                ) : (
                    /* Grid de entidades - Renderização polimórfica */
                    <div className="entities-grid">
                        {entities.map(entity => (
                            <EntityCard 
                                key={`${entity.constructor.name}-${entity.id}`} 
                                entity={entity} 
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
