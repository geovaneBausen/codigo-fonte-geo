'use client';
import React, { useState, useEffect } from 'react';
import { Episode } from '../../models/entities/Episode';
import { Character } from '../../models/entities/Character';
import { RickMortyController } from '../../controllers/RickMortyController';
import './episode-modal.scss';

/**
 * Props do modal de episódio
 * - episode: dados do episódio a ser exibido
 * - isOpen: controla se o modal está visível
 * - onClose: função para fechar o modal
 */
interface EpisodeModalProps {
    episode: Episode | null;
    isOpen: boolean;
    onClose: () => void;
}

const EpisodeModal: React.FC<EpisodeModalProps> = ({ episode, isOpen, onClose }) => {
    // Estados do componente
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Controla abertura/fechamento do modal e carrega dados
    useEffect(() => {
        if (isOpen && episode) {
            loadCharacters();
            document.body.style.overflow = 'hidden'; // Bloqueia scroll da página
        } else {
            document.body.style.overflow = ''; // Restaura scroll
        }

        return () => {
            document.body.style.overflow = ''; // Cleanup
        };
    }, [isOpen, episode]);

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

    // Carrega personagens que aparecem no episódio
    const loadCharacters = async () => {
        if (!episode?.characters) return;

        setLoading(true);
        setError(null);
        
        try {
            const controller = RickMortyController.getInstance();
            await controller.carregarDadosAPI();
            
            // Busca todos os personagens
            const allCharacters = controller.pesquisarPorCriterio('') as Character[];
            
            // Extrai IDs dos URLs dos personagens do episódio
            const characterIds = episode.characters
                .map(url => {
                    const matches = url.match(/\/(\d+)$/);
                    return matches ? parseInt(matches[1]) : null;
                })
                .filter(id => id !== null);

            // Filtra personagens que aparecem no episódio
            const episodeCharacters = allCharacters.filter(char => 
                characterIds.includes(char.id)
            );

            setCharacters(episodeCharacters);
        } catch (err) {
            setError('Erro ao carregar personagens do episódio');
            console.error('Erro ao carregar personagens:', err);
        } finally {
            setLoading(false);
        }
    };

    // Remove personagens duplicados (caso existam)
    const uniqueCharacters = characters.filter((character, index, self) => 
        index === self.findIndex(c => c.id === character.id)
    );

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

    if (!isOpen || !episode) return null;

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="episode-modal">
                {/* Cabeçalho do modal */}
                <div className="modal-header">
                    <div className="episode-title">
                        <h2>{episode.name || 'Episódio sem nome'}</h2>
                        <span className="episode-code">{episode.episode || 'N/A'}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="modal-content">
                    {/* Informações do episódio */}
                    <div className="episode-info">
                        <div className="info-item">
                            <strong>Data de exibição:</strong>
                            <span>{formatAirDate(episode.air_date)}</span>
                        </div>
                        <div className="info-item">
                            <strong>Total de personagens:</strong>
                            <span>{episode.characters?.length || 0}</span>
                        </div>
                    </div>

                    {/* Seção de personagens */}
                    <div className="characters-section">
                        <h3>Personagens que aparecem neste episódio:</h3>
                        
                        {/* Estado de carregamento */}
                        {loading && (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Carregando personagens...</p>
                            </div>
                        )}

                        {/* Estado de erro */}
                        {error && (
                            <div className="error-state">
                                <p>{error}</p>
                                <button className="retry-btn" onClick={loadCharacters}>
                                    Tentar novamente
                                </button>
                            </div>
                        )}

                        {/* Grid de personagens */}
                        {!loading && !error && uniqueCharacters.length > 0 && (
                            <div className="characters-grid">
                                {uniqueCharacters.map((character: Character) => (
                                    <div key={character.id} className="character-card">
                                        <div className="character-image">
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
                                            <h4>{character.name || 'Nome não disponível'}</h4>
                                            <p className="character-status">
                                                <span className={`status-indicator ${character.status?.toLowerCase()}`}></span>
                                                {character.status || 'Status desconhecido'}
                                            </p>
                                            <p className="character-species">
                                                <strong>Espécie:</strong> {character.species || 'Desconhecida'}
                                            </p>
                                            {character.origin && (
                                                <p className="character-origin">
                                                    <strong>Origem:</strong> {character.origin || 'Desconhecida'}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Estado vazio */}
                        {!loading && !error && characters.length === 0 && (
                            <div className="no-characters">
                                <p>Nenhum personagem encontrado para este episódio.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpisodeModal;