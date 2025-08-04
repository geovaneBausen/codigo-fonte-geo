/**
 * Custom Hook useRickMortyData - Gerenciamento de estado para dados da API Rick and Morty
 * 
 * Este hook implementa os princípios SOLID e GRASP:
 * - SRP: Responsável apenas por gerenciar o estado e operações de dados da API
 * - DIP: Depende da abstração RickMortyController, não de implementações específicas
 * - Expert: Encapsula todo o conhecimento sobre como gerenciar os dados da aplicação
 * - Baixo Acoplamento: Componentes que usam este hook não precisam conhecer detalhes da API
 * - Alta Coesão: Todas as funcionalidades são relacionadas ao gerenciamento de dados
 * 
 * Padrões implementados:
 * - Singleton: Utiliza getInstance() do controller para garantir instância única
 * - Observer: Através do useEffect, reage a mudanças de estado
 * - Strategy: Diferentes estratégias de filtro por tipo de entidade
 */
// useRickMortyData.ts
import { useState, useEffect, useMemo } from 'react';
import { Character } from '../models/entities/Character';
import { Episode } from '../models/entities/Episode';
import { Location } from '../models/entities/Location';
import { RickMortyController } from '../controllers/RickMortyController';

// Type union para representar qualquer entidade do sistema
export type EntityData = Character | Episode | Location;

/**
 * Hook personalizado para gerenciamento de dados da API Rick and Morty
 * 
 * @returns Objeto contendo estado e funções para manipulação dos dados
 */
export const useRickMortyData = () => {
    // Estados para gerenciar os dados e UI
    const [entities, setEntities] = useState<EntityData[]>([]); // Lista de entidades carregadas
    const [searchTerm, setSearchTerm] = useState(''); // Termo de busca atual
    const [filterType, setFilterType] = useState<'all' | 'character' | 'location' | 'episode'>('all'); // Filtro por tipo
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado de erro

    // Memoiza a instância do controller (Singleton pattern)
    const controller = useMemo(() => RickMortyController.getInstance(), []);

    /**
     * Função principal para buscar e filtrar dados
     * 
     * Implementa a lógica de negócio de busca e filtragem,
     * utilizando o controller como intermediário para a API.
     * 
     * @param term - Termo de busca (padrão: searchTerm atual)
     * @param type - Tipo de filtro (padrão: filterType atual)
     */
    const fetchAndFilterData = async (
        term: string = searchTerm,
        type: 'all' | 'character' | 'location' | 'episode' = filterType
    ) => {
        try {
            setLoading(true);
            setError(null);

            // Carrega os dados uma única vez através do controller
            await controller.carregarDadosAPI();

            // Utiliza o método polimórfico de pesquisa do controller
            let allEntities = controller.pesquisarPorCriterio(term) as EntityData[];

            // Aplica o filtro por tipo usando instanceof (verificação de tipo em runtime)
            if (type !== 'all') {
                allEntities = allEntities.filter(entity => {
                    switch (type) {
                        case 'character': return entity instanceof Character;
                        case 'location': return entity instanceof Location;
                        case 'episode': return entity instanceof Episode;
                        default: return true;
                    }
                });
            }
            setEntities(allEntities);
        } catch (err) {
            setError('Erro ao carregar ou filtrar dados.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Efeito para carregar os dados na primeira renderização
    // Implementa o padrão Observer: reage à montagem do componente
    useEffect(() => {
        fetchAndFilterData();
    }, []);

    // Efeito para atualizar dados quando filtros mudam
    // Implementa reatividade automática aos estados de busca e filtro
    useEffect(() => {
        fetchAndFilterData(searchTerm, filterType);
    }, [searchTerm, filterType]);

    // Handlers para a UI - implementam o padrão Command
    /**
     * Handler para mudanças no termo de busca
     * @param term - Novo termo de busca
     */
    const handleSearch = (term: string) => setSearchTerm(term);
    
    /**
     * Handler para mudanças no filtro de tipo
     * @param type - Novo tipo de filtro
     */
    const handleFilterChange = (type: 'all' | 'character' | 'location' | 'episode') => setFilterType(type);

    /**
     * Função utilitária para filtrar entidades por tipo específico
     * 
     * Implementa o padrão Strategy para diferentes tipos de filtro.
     * Utiliza instanceof para verificação de tipo em runtime.
     * 
     * @param type - Tipo de entidade a filtrar
     * @returns Array de entidades do tipo especificado
     */
    const getEntitiesByType = (type: 'character' | 'location' | 'episode') => {
        return entities.filter(entity => {
            switch (type) {
                case 'character': return entity instanceof Character;
                case 'location': return entity instanceof Location;
                case 'episode': return entity instanceof Episode;
                default: return false;
            }
        });
    };

    /**
     * Retorna o estado e funções do hook para uso nos componentes
     * 
     * Interface pública do hook que expõe apenas o necessário,
     * implementando o princípio de encapsulamento.
     */
    return {
        entities,              // Array de entidades carregadas e filtradas
        searchTerm,           // Termo de busca atual
        filterType,           // Tipo de filtro atual
        loading,              // Estado de carregamento
        error,                // Estado de erro
        handleSearch,         // Função para atualizar termo de busca
        handleFilterChange,   // Função para atualizar filtro de tipo
        refetch: () => fetchAndFilterData('', 'all'), // Função para recarregar todos os dados
        getEntitiesByType     // Função utilitária para filtrar por tipo
    };
};