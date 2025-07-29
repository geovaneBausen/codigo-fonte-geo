'use client';
import { memo } from 'react';
import { Location } from '../../models/entities/Location';
import './location-card.scss';

export interface LocationCardProps {
  location: Location;
}

const LocationCard = memo(function LocationCard({ location }: LocationCardProps) {
  const getLocationTypeClass = () => {
    const type = location.type.toLowerCase();
    if (type.includes('planet')) return 'type-planet';
    if (type.includes('dimension')) return 'type-dimension';
    if (type.includes('space')) return 'type-space';
    return 'type-other';
  };

  return (
    <div className="location-card">
      <div className="location-header">
        <h3 className="location-name">{location.name}</h3>
        <div className={`location-type ${getLocationTypeClass()}`}>
          {location.type}
        </div>
      </div>

      <div className="location-info">
        <div className="location-dimension">
          <span className="label">Dimensão:</span>
          <span className="value">{location.dimension}</span>
        </div>

        <div className="location-residents">
          <span className="label">Residentes:</span>
          <span className="value">{location.residents.length} habitantes</span>
        </div>
      </div>

      <div className="location-footer">
        <div className="location-id">
          ID: {location.id}
        </div>
      </div>
    </div>
  );
});

export default LocationCard;
