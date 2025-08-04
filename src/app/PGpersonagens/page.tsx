'use client';
import React, { useEffect, useState } from 'react';
import { useRickMortyData } from '../hooks/useRickMortyData';
import { Character } from '../models/entities/Character';
import CharacterCard from '../componentes/CharacterCard';
import CharacterModal from '../componentes/CharacterModal';
import './personagens.scss';

const PersonagensPage = () => {
  const { entities, loading, error, handleFilterChange } = useRickMortyData();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    handleFilterChange('character');
  }, [handleFilterChange]);

  // Filtra os personagens diretamente do entities
  const characters = entities as Character[];

  // Remover personagens duplicados pelo id
  const uniqueCharacters = characters.filter(
    (char, idx, arr) => arr.findIndex(c => c.id === char.id) === idx
  );

  console.log('Dados dos personagens:', uniqueCharacters);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

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
      <ul className="characters-grid">
        {uniqueCharacters.length > 0 ? (
          uniqueCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onEpisodesClick={handleCharacterClick}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>Nenhum personagem encontrado</h3>
            <p>Tente ajustar sua busca ou limpar os filtros</p>
          </div>
        )}
      </ul>
      
      {/* Modal de episódios do personagem */}
      <CharacterModal 
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
export default PersonagensPage;