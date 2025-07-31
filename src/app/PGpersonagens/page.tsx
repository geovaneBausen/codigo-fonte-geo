'use client';
import React from 'react';
import { useRickMortyData } from '../hooks/useRickMortyData';
import CharacterCard from '../componentes/CharacterCard';
import { Character } from '../models/entities/Character';
import './personagens.scss';

const PersonagensPage = () => {
  const { entities, loading, error, getEntitiesByType } = useRickMortyData();
  
  const characters = getEntitiesByType('character') as Character[];

  console.log('Dados dos personagens:', characters);

  if (loading) {
    return (
      <div className="personagens-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando personagens...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="personagens-page">
        <div className="error-container">
          <h2>Erro ao carregar dados</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="personagens-page">
      <div className="characters-grid">
        {characters.length > 0 ? (
          characters.map((character) => (
            <CharacterCard 
              key={character.id} 
              character={character}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>Nenhum personagem encontrado</h3>
            <p>Tente ajustar sua busca ou limpar os filtros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonagensPage;
