'use client';
import React from 'react';
import { Character } from '../../models/entities/Character';
import { Episode } from '../../models/entities/Episode';
import { Location } from '../../models/entities/Location';
import './entity-card.scss';

export type EntityData = Character | Episode | Location;

interface EntityCardProps {
    entity: EntityData;
}

// Tipo para a configuração de renderização
type RenderConfig = {
    className: string;
    image?: string;
    fields: Array<{ label: string; value: string }>;
};

const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
    const getEntityType = (entity: EntityData): 'character' | 'location' | 'episode' => {
        if ('species' in entity && 'image' in entity) return 'character';
        if ('dimension' in entity && 'residents' in entity) return 'location';
        if ('episode' in entity && 'air_date' in entity) return 'episode';
        throw new Error('Tipo de entidade desconhecido');
    };

    // Configuração de renderização baseada em tipo
    const renderConfigs: Record<string, (entity: any) => RenderConfig> = {
        character: (entity: Character): RenderConfig => ({
            className: 'character-card',
            image: entity.image,
            fields: [
                { label: 'Espécie', value: entity.species },
                { label: 'Status', value: entity.status },
                { label: 'Gênero', value: entity.gender },
                { label: 'Origem', value: entity.origin }
            ]
        }),
        location: (entity: Location): RenderConfig => ({
            className: 'location-card',
            fields: [
                { label: 'Tipo', value: entity.type },
                { label: 'Dimensão', value: entity.dimension },
                { label: 'Residentes', value: entity.residents.length.toString() }
            ]
        }),
        episode: (entity: Episode): RenderConfig => ({
            className: 'episode-card',
            fields: [
                { label: 'Episódio', value: entity.episode },
                { label: 'Data', value: entity.air_date },
                { label: 'Personagens', value: entity.characters.length.toString() }
            ]
        })
    };

    const entityType = getEntityType(entity);
    const config = renderConfigs[entityType](entity);

    return (
        <div className={`entity-card ${config.className}`}>
            {config.image && (
                <img src={config.image} alt={entity.name} className="character-image" />
            )}
            <div className="card-content">
                <h3>{entity.name}</h3>
                {config.fields.map((field, index) => (
                    <p key={index}>
                        <strong>{field.label}:</strong> {field.value}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default EntityCard;