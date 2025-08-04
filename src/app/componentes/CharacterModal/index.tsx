'use client';
import React, { useState, useEffect } from 'react';
import { Character } from '../../models/entities/Character';
import { Episode } from '../../models/entities/Episode';
import { RickMortyController } from '../../controllers/RickMortyController';
import './character-modal.scss';

//Controla se o modal está visível
interface CharacterModalProps {
    character: Character | null;
    isOpen: boolean;
    onClose: () => void;
    //true =  visível
    //false =  oculto
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, isOpen, onClose }) => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Carrega episódios e controla scroll do body quando modal abre/fecha
    useEffect(() => {
        if (isOpen && character) {
            loadEpisodes();
            document.body.style.overflow = 'hidden'; // Bloqueia scroll da página
        } else {
            document.body.style.overflow = ''; // Restaura scroll
        }

        return () => {
            document.body.style.overflow = ''; // Cleanup
        };
    }, [isOpen, character]);

    // Fecha modal com tecla Escape
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    // Carrega e filtra episódios do personagem
    const loadEpisodes = async () => {
        if (!character?.episodes) return;

        setLoading(true);
        setError(null);
        
        try {
            const controller = RickMortyController.getInstance();
            await controller.carregarDadosAPI();
            
            // Busca todos os episódios
            const allEpisodes = controller.buscarEpisodios('');
            
            // Extrai IDs dos URLs dos episódios do personagem
            const episodeIds = character.episodes
                .map(url => {
                    const match = url.match(/\/(\d+)$/);
                    return match ? parseInt(match[1]) : null;
                })
                .filter(id => id !== null);

            // Filtra episódios que contêm o personagem
            const characterEpisodes = allEpisodes.filter(episode => 
                episodeIds.includes(episode.id)
            );

            // Ordena por temporada e episódio (S01E01, S01E02, etc.)
            characterEpisodes.sort((a, b) => {
                const getEpisodeNumber = (episode: string | undefined) => {
                    if (!episode) return 0;
                    const match = episode.match(/S(\d+)E(\d+)/);
                    return match ? parseInt(match[1]) * 1000 + parseInt(match[2]) : 0;
                };
                
                return getEpisodeNumber(a.episode) - getEpisodeNumber(b.episode);
            });

            setEpisodes(characterEpisodes);
        } catch (err) {
            setError('Erro ao carregar episódios do personagem');
            console.error('Erro ao carregar episódios:', err);
        } finally {
            setLoading(false);
        }
    };

    // Formata data para padrão brasileiro
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

    // Fecha modal ao clicar fora dele
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !character) return null;

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="character-modal">
                {/* Cabeçalho com informações do personagem */}
                <div className="modal-header">
                    <div className="character-title">
                        <div className="character-avatar">
                            {character.image ? (
                                <img 
                                    src={character.image} 
                                    alt={character.name}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="no-image">?</div>
                            )}
                        </div>
                        <div className="character-info">
                            <h2>{character.name || 'Personagem sem nome'}</h2>
                            <p className="character-species">{character.species || 'Espécie desconhecida'}</p>
                            <p className="character-status">
                                <span className={`status-indicator ${character.status?.toLowerCase()}`}></span>
                                {character.status || 'Status desconhecido'}
                            </p>
                        </div>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="modal-content">
                    {/* Detalhes do personagem */}
                    <div className="character-details">
                        <div className="detail-item">
                            <strong>Origem:</strong>
                            <span>{character.origin || 'Desconhecida'}</span>
                        </div>
                        <div className="detail-item">
                            <strong>Localização:</strong>
                            <span>{character.location || 'Desconhecida'}</span>
                        </div>
                        <div className="detail-item">
                            <strong>Total de episódios:</strong>
                            <span>{character.episodes?.length || 0}</span>
                        </div>
                    </div>

                    {/* Seção de episódios */}
                    <div className="episodes-section">
                        <h3>Episódios em que {character.name} aparece:</h3>
                        
                        {/* Estado de carregamento */}
                        {loading && (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Carregando episódios...</p>
                            </div>
                        )}

                        {/* Estado de erro */}
                        {error && (
                            <div className="error-state">
                                <p>{error}</p>
                                <button className="retry-btn" onClick={loadEpisodes}>
                                    Tentar novamente
                                </button>
                            </div>
                        )}

                        {/* Lista de episódios */}
                        {!loading && !error && episodes.length > 0 && (
                            <div className="episodes-grid">
                                {episodes.map((episode: Episode) => (
                                    <div key={episode.id} className="episode-card">
                                        <div className="episode-header">
                                            <h4>{episode.name || 'Episódio sem nome'}</h4>
                                            <span className="episode-code">{episode.episode || 'N/A'}</span>
                                        </div>
                                        <div className="episode-info">
                                            <p className="air-date">
                                                <strong>Data:</strong> {formatAirDate(episode.air_date)}
                                            </p>
                                            <p className="characters-count">
                                                <strong>Total de personagens:</strong> {episode.characters?.length || 0}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Estado vazio */}
                        {!loading && !error && episodes.length === 0 && (
                            <div className="no-episodes">
                                <p>Nenhum episódio encontrado para este personagem.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterModal;