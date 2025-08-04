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

  // Função para obter ícone do status
  const getStatusIcon = () => {
    switch (character.status?.toLowerCase()) {
      case 'alive': return '🟢';
      case 'dead': return '🔴';
      default: return '⚪';
    }
  };

  // Função para obter ícone do gênero
  const getGenderIcon = () => {
    switch (character.gender?.toLowerCase()) {
      case 'male': return '♂️';
      case 'female': return '♀️';
      case 'genderless': return '⚫';
      default: return '❓';
    }
  };

  return (
    <li className='character-card'>
      <div className="character-image">
        <img 
          src={character.image} 
          alt={`Imagem do personagem ${character.name}`}
          loading="lazy"
        />
        <div className={`status-badge ${getStatusClass()}`}>
          {getStatusIcon()} {character.status}
        </div>
      </div>

      <div className="character-info">
        <header className="character-header">
          <h3 className="character-name">{character.name}</h3>
          <div className="character-id">#{character.id}</div>
        </header>
        
        <div className="character-details">
          <div className="detail-row">
            <span className="detail-label">👾 Espécie:</span>
            <span className="detail-value">{character.species}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">{getGenderIcon()} Gênero:</span>
            <span className="detail-value">{character.gender}</span>
          </div>

          {character.type && character.type.trim() !== '' && (
            <div className="detail-row">
              <span className="detail-label">🏷️ Tipo:</span>
              <span className="detail-value">{character.type}</span>
            </div>
          )}
          
          <div className="detail-row">
            <span className="detail-label">📍 Localização:</span>
            <span className="detail-value location-name">
              {character.location?.name || 'Desconhecida'}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">🌍 Origem:</span>
            <span className="detail-value origin-name">
              {character.origin?.name || 'Desconhecida'}
            </span>
          </div>

          <div className="detail-row episodes-row">
            <span className="detail-label">📺 Episódios:</span>
            <span className="detail-value episodes-count">
              {character.episode?.length || 0} aparição{(character.episode?.length || 0) !== 1 ? 'ões' : ''}
            </span>
          </div>
        </div>

        {onEpisodesClick && (character.episode?.length || 0) > 0 && (
          <footer className="character-actions">
            <button 
              className="episodes-btn"
              onClick={() => onEpisodesClick(character)}
              aria-label={`Ver episódios de ${character.name}`}
            >
              🎬 Ver Episódios ({character.episode?.length || 0})
            </button>
          </footer>
        )}
      </div>
    </li>
  );
});

export default CharacterCard;