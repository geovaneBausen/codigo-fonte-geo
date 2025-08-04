'use client';
import React from 'react';
import './search-bar.scss';

/**
 * Props do componente SearchBar
 * @interface SearchBarProps
 */
interface SearchBarProps {
    /** Termo atual da pesquisa */
    searchTerm: string;
    /** Função callback chamada quando o termo de pesquisa muda */
    onSearchChange: (term: string) => void;
    /** Texto placeholder opcional para o input */
    placeholder?: string;
}

/**
 * Componente reutilizável para busca universal
 * 
 * Este componente implementa uma barra de pesquisa genérica que pode ser
 * utilizada em diferentes contextos da aplicação. É controlado externamente
 * através das props, seguindo o padrão de componente controlado do React.
 * 
 * @param {SearchBarProps} props - As propriedades do componente
 * @returns {JSX.Element} Elemento JSX da barra de pesquisa
 * 
 * @example
 * ```tsx
 * const [termo, setTermo] = useState('');
 * 
 * <SearchBar 
 *   searchTerm={termo}
 *   onSearchChange={setTermo}
 *   placeholder="Buscar produtos..."
 * />
 * ```
 */
export default function SearchBar({ 
    searchTerm, 
    onSearchChange, 
    placeholder = "Buscar personagens, locais ou episódios..." 
}: SearchBarProps) {
    return (
        <div className="search-bar">
            {/* Input controlado que reflete o estado do termo de pesquisa */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder}
                className="search-input"
                // Acessibilidade: permite navegação por teclado
                aria-label="Campo de pesquisa"
            />
        </div>
    );
}