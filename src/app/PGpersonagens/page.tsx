'use client';
import React, { useEffect, useState } from 'react';
import { useRickMortyData } from '../hooks/useRickMortyData';
import { Character } from '../models/entities/Character';
import CharacterCard from '../componentes/CharacterCard';
import CharacterModal from '../componentes/CharacterModal';
import SearchBar from '../componentes/SearchBar';
import './personagens.scss';

const PersonagensPage = () => {
  const { entities, loading, error, handleFilterChange, handleSearch, searchTerm } = useRickMortyData();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    handleFilterChange('character');
  }, [handleFilterChange]);

  // Filtra apenas personagens válidos e remove duplicados
  const uniqueCharacters = React.useMemo(() => {
    const characters = entities.filter(entity => entity instanceof Character) as Character[];
    return characters.filter(
      (char, idx, arr) => char.id && arr.findIndex(c => c.id === char.id) === idx
    );
  }, [entities]);

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
      {/* Cabeçalho da página */}
      <div className="page-header">
      
       
      </div>

      {/* Barra de pesquisa */}
      <div className="search-section">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={handleSearch} 
          placeholder="Pesquisar personagens..." 
        />
      </div>



      {/* Grid de personagens */}
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
            <p>
              {searchTerm 
                ? `Nenhum personagem encontrado para "${searchTerm}"` 
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
      </ul>
      
      {/* Modal de episódios do personagem */}
      <CharacterModal 
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PersonagensPage;