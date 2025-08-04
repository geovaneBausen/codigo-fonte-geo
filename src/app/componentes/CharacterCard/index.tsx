'use client';
import { memo } from 'react';
import './index.scss';
import { Character } from '../../models/entities/Character';

export interface Props {
  character: Character;
  onEpisodesClick?: (character: Character) => void;
}

const CharacterCard = memo(function CharacterCard({ character, onEpisodesClick }: Props) {
  // Função para determinar classe do status
  const getStatusClass = () => {
    switch (character.status?.toLowerCase()) {
      case 'alive': return 'status-alive';
      case 'dead': return 'status-dead';
      default: return 'status-unknown';
    }
  };

  return (
    <li className='character-card'>
      <div className="character-image">
        <img src={character.image} alt={character.name} />
      </div>

      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        
        <div className="character-details">
          <div className={`character-status ${getStatusClass()}`}>
            {character.status} - {character.species}
          </div>
          
          <div className="character-location">
            <span className="location-label">Última localização:</span>
            <span className="location-name">{character.location}</span>
          </div>
          
          <div className="character-origin">
            <span className="origin-label">Origem:</span>
            <span className="origin-name">{character.origin}</span>
          </div>

          <div className="character-episodes">
            <span className="episodes-label">Episódios:</span>
            <span className="episodes-count">{character.episodes.length}</span>
          </div>

          {onEpisodesClick && (
            <div className="character-actions">
              <button 
                className="episodes-btn"
                onClick={() => onEpisodesClick(character)}
              >
                Ver Episódios
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
});

export default CharacterCard;