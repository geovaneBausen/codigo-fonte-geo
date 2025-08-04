'use client';
import React from 'react';
import './index.scss';

interface FilterSelectProps {
    filterType: 'all' | 'character' | 'location' | 'episode';
    onFilterChange: (type: 'all' | 'character' | 'location' | 'episode') => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ filterType, onFilterChange }) => {
    return (
        <div className="filter-select">
            <label htmlFor="filter-type" className="filter-label">
                Filtrar por:
            </label>
            <select 
                id="filter-type"
                value={filterType} 
                onChange={(e) => onFilterChange(e.target.value as 'all' | 'character' | 'location' | 'episode')}
                className="filter-dropdown"
            >
                <option value="all">Todos</option>
                <option value="character">Personagens</option>
                <option value="location">Localizações</option>
                <option value="episode">Episódios</option>
            </select>
        </div>
    );
};

export default FilterSelect;



/**Componente Pai → Passa filterType e onFilterChange
FilterSelect → Recebe props e renderiza o select
index.scss → Aplica estilos visuais
Usuário → Interage com o dropdown
onChange → Captura mudança
onFilterChange → Callback para o pai
Componente Pai → Atualiza estado e re-renderiza */