'use client';
import React, { useEffect, useState } from 'react';
import { useRickMortyData } from '../hooks/useRickMortyData';
import { Episode } from '../models/entities/Episode';
import SearchBar from '../componentes/SearchBar';
import EpisodeModal from '../componentes/EpisodeModal';
import './episodios.scss';

const EpisodiosPage = () => {
    const { entities, loading, error, handleFilterChange, handleSearch, searchTerm } = useRickMortyData();
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Configuração inicial para carregar apenas episódios
    useEffect(() => {
        handleFilterChange('episode');
    }, [handleFilterChange]);

    // Type assertion segura - o hook já filtra por tipo
    const episodes = (entities as Episode[]).filter(Boolean);

    const formatAirDate = (dateString?: string): string => {
        if (!dateString) return 'Data não disponível';
        
        try {
            return new Date(dateString).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return 'Data inválida';
        }
    };

    const openEpisodeModal = (episode: Episode) => {
        setSelectedEpisode(episode);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEpisode(null);
    };

    // Estados de carregamento e erro
    if (loading) {
        return (
            <div className="episodios-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando episódios...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="episodios-page">
                <div className="error-container">
                    <h2>Erro ao carregar dados</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="episodios-page">
            {/* Controles de busca */}
            <div className="controls-section">
                <SearchBar 
                    searchTerm={searchTerm} 
                    onSearchChange={handleSearch} 
                    placeholder="Pesquisar episódios..." 
                />
            </div>

            {/* Contador de resultados */}
            <div className="results-info">
                <p>Encontrados: <strong>{episodes.length}</strong> episódios</p>
            </div>

            {/* Grid de episódios */}
            <div className="episodes-grid">
                {episodes.map((episode) => (
                    <div key={episode.id} className="episode-card">
                        <div className="episode-header">
                            <h3>{episode.name}</h3>
                            <span className="episode-code">{episode.episode}</span>
                        </div>
                        
                        <div className="episode-info">
                            <p className="air-date">
                                <strong>Data de exibição:</strong> {formatAirDate(episode.air_date)}
                            </p>
                            <p className="characters-count">
                                <strong>Personagens:</strong> {episode.characters?.length || 0} aparições
                            </p>
                            
                            <div className="episode-actions">
                                <button 
                                    className="details-btn"
                                    onClick={() => openEpisodeModal(episode)}
                                >
                                    Ver Personagens
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Estado vazio */}
            {episodes.length === 0 && (
                <div className="no-results">
                    <p>
                        {searchTerm 
                            ? `Nenhum episódio encontrado para "${searchTerm}"` 
                            : 'Nenhum episódio encontrado'
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
            
            {/* Modal de detalhes */}
            <EpisodeModal 
                episode={selectedEpisode}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default EpisodiosPage;
