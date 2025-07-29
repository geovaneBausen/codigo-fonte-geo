'use client';
import React from 'react';
import { useRickMortyData } from '../hooks/useRickMortyData';
import { Episode } from '../models/entities/Episode';
import './episodios.scss';

const EpisodiosPage = () => {
  const { entities, loading, error, getEntitiesByType } = useRickMortyData();
  
  const episodes = getEntitiesByType('episode') as Episode[];

  if (loading) {
    return (
      <div className="episodios-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando episódios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="episodios-page">
        <div className="error-container">
          <h2>Erro ao carregar dados</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="episodios-page">
      <div className="episodes-grid">
        {episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            <div className="episode-header">
              <h3>{episode.name}</h3>
              <span className="episode-code">{episode.episode}</span>
            </div>
            <div className="episode-info">
              <p className="air-date">
                <strong>Data de exibição:</strong> {episode.air_date}
              </p>
              <p className="characters-count">
                <strong>Personagens:</strong> {episode.characters.length} aparições
              </p>
            </div>
          </div>
        ))}
      </div>

      {episodes.length === 0 && !loading && (
        <div className="no-results">
          <p>Nenhum episódio encontrado</p>
        </div>
      )}
    </div>
  );
};


export default EpisodiosPage;
