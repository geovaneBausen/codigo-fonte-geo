'use client';
import React from 'react';
import { Character } from '../../models/entities/Character';
import { Episode } from '../../models/entities/Episode';
import { Location } from '../../models/entities/Location';
import './entity-card.scss';

// Union type para todas as entidades suportadas
export type EntityData = Character | Episode | Location;

interface EntityCardProps {
    entity: EntityData;
}

/**
 * Componente genérico para renderizar diferentes tipos de entidades
  renderização polimórfica
 */
const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
    
    // Detecta o tipo da entidade usando duck typing
    const getEntityType = (entity: EntityData) => {
        if ('species' in entity && 'image' in entity) return 'character';
        if ('dimension' in entity && 'residents' in entity) return 'location';
        return 'episode'; // fallback para episode
    };

    // Renderiza campos específicos baseado no tipo da entidade
    const renderFields = () => {
        const type = getEntityType(entity);
        
        switch (type) {
            case 'character': {
                const char = entity as Character;
                return (
                    <>
                        <p><strong>Espécie:</strong> {char.species}</p>
                        <p><strong>Status:</strong> {char.status}</p>
                        <p><strong>Gênero:</strong> {char.gender}</p>
                        <p><strong>Origem:</strong> {char.origin}</p>
                    </>
                );
            }
            case 'location': {
                const loc = entity as Location;
                return (
                    <>
                        <p><strong>Tipo:</strong> {loc.type}</p>
                        <p><strong>Dimensão:</strong> {loc.dimension}</p>
                        <p><strong>Residentes:</strong> {loc.residents.length}</p>
                    </>
                );
            }
            case 'episode': {
                const ep = entity as Episode;
                return (
                    <>
                        <p><strong>Episódio:</strong> {ep.episode}</p>
                        <p><strong>Data:</strong> {ep.air_date}</p>
                        <p><strong>Personagens:</strong> {ep.characters.length}</p>
                    </>
                );
            }
        }
    };

    const entityType = getEntityType(entity);
    const isCharacter = entityType === 'character';

    return (
        <div className={`entity-card ${entityType}-card`}>
            {/* Imagem apenas para personagens */}
            {isCharacter && (
                <img 
                    src={(entity as Character).image} 
                    alt={entity.name} 
                    className="character-image" 
                />
            )}
            
            <div className="card-content">
                <h3>{entity.name}</h3>
                {renderFields()}
            </div>
        </div>
    );
};

export default EntityCard;