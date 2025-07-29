'use client';
import React from 'react';
import './search-bar.scss';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    placeholder?: string;
}

// Componente reutilizável para busca universal
// Implementa a interface de busca que funciona com qualquer tipo IPesquisavel
export default function SearchBar({ 
    searchTerm, 
    onSearchChange, 
    placeholder = "Buscar personagens, locais ou episódios..." 
}: SearchBarProps) {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder}
                className="search-input"
            />
        </div>
    );
}