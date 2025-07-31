'use client';
import React from 'react';
import { useRickMortyData } from '../hooks/useRickMortyData';
import LocationCard from '../componentes/LocationCard';
import { Location } from '../models/entities/Location';
import './planetas.scss';

const PlanetasPage = () => {
  const { entities, loading, error, getEntitiesByType } = useRickMortyData();
  
  const locations = getEntitiesByType('location') as Location[];

  console.log('Dados dos locais:', locations);

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
      <div className="locations-grid">
        {locations.length > 0 ? (
          locations.map((location) => (
            <LocationCard 
              key={location.id} 
              location={location}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>Nenhuma localização encontrada</h3>
            <p>Tente ajustar sua busca ou limpar os filtros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetasPage;
