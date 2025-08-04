'use client';
import { memo } from 'react';
import { Location } from '../../models/entities/Location';
import './location-card.scss';

export interface LocationCardProps {
  location: Location;
}

/**
 * Componente de card para exibir informações de uma localização
 * Memorizado para evitar re-renderizações desnecessárias
 */
const LocationCard = memo(function LocationCard({ location }: LocationCardProps) {
  
  /**
   * Determina a classe CSS baseada no tipo da localização
   * para aplicar estilos visuais específicos
   */
  const getLocationTypeClass = () => {
    const type = location.type?.toLowerCase() || '';
    
    if (type.includes('planet')) return 'type-planet';
    if (type.includes('dimension')) return 'type-dimension';
    if (type.includes('space')) return 'type-space';
    return 'type-other';
  };

  return (
    <div className="location-card">
      {/* Cabeçalho com nome e tipo da localização */}
      <div className="location-header">
        <h3 className="location-name">
          {location.name || 'Localização sem nome'}
        </h3>
        <div className={`location-type ${getLocationTypeClass()}`}>
          {location.type || 'Tipo desconhecido'}
        </div>
      </div>

      {/* Informações detalhadas da localização */}
      <div className="location-info">
        <div className="location-dimension">
          <span className="label">Dimensão:</span>
          <span className="value">
            {location.dimension || 'Dimensão desconhecida'}
          </span>
        </div>

        <div className="location-residents">
          <span className="label">Residentes:</span>
          <span className="value">
            {location.residents?.length || 0} habitantes
          </span>
        </div>
      </div>
    </div>
  );
});

export default LocationCard;
