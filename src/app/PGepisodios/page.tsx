'use client';
import React, { useEffect, useState } from 'react';
import { useRickMortyData, EntityData } from '../hooks/useRickMortyData';
import { Episode } from '../models/entities/Episode';
import SearchBar from '../componentes/SearchBar';
import EpisodeModal from '../componentes/EpisodeModal';
import './episodios.scss';

const EpisodiosPage = () => {
    const { entities, loading, error, handleFilterChange, handleSearch, searchTerm } = useRickMortyData();
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Define o filtro para 'episode' na montagem do componente
    useEffect(() => {
        handleFilterChange('episode');
    }, [handleFilterChange]);

    // O array 'entities' já contém apenas episódios, então podemos fazer o casting
    const episodes = entities as Episode[];

    // Filtrar episódios válidos para evitar erros
    const validEpisodes = React.useMemo(() => {
        return episodes.filter(episode => 
            episode && 
            episode.id !== undefined && 
            episode.id !== null
        );
    }, [episodes]);

    const formatAirDate = (dateString: string | undefined) => {
        if (!dateString) return 'Data não disponível';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Data inválida';
        
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleEpisodeClick = (episode: Episode) => {
        setSelectedEpisode(episode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEpisode(null);
    };

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
            <div className="controls-section">
                <SearchBar 
                    searchTerm={searchTerm} 
                    onSearchChange={handleSearch} 
                    placeholder="Pesquisar episódios..." 
                />
            </div>

            <div className="results-info">
                <p>Encontrados: <strong>{validEpisodes.length}</strong> episódios</p>
            </div>

            <div className="episodes-grid">
                {validEpisodes.map((episode, index) => (
                    <div key={`episode-${episode.id}-${index}`} className="episode-card">
                        <div className="episode-header">
                            <h3 title={episode.name || 'Episódio sem nome'}>{episode.name || 'Episódio sem nome'}</h3>
                            <span className="episode-code">{episode.episode || 'N/A'}</span>
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
                                    onClick={() => handleEpisodeClick(episode)}
                                >
                                    Ver Personagens
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {validEpisodes.length === 0 && !loading && (
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
            
            {/* Modal de detalhes do episódio */}
            <EpisodeModal 
                episode={selectedEpisode}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default EpisodiosPage;