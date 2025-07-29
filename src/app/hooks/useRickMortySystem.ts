import { useState, useEffect, useCallback } from 'react';
import { RickMortyController } from '../controllers/RickMortyController';
import { Character } from '../models/entities/Character';
import { Episode } from '../models/entities/Episode';
import { Location } from '../models/entities/Location';

/**
 * Custom hook for Rick and Morty system management
 * Provides interface between React components and controller
 */
export function useRickMortySystem() {
  // Estados para gerenciar o estado da aplicação
  const [controller] = useState(() => new RickMortyController());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  /**
   * Carregar dados da API Rick and Morty
   * Implementa o padrão de carregamento assíncrono com tratamento de erros
   */
  const carregarDadosDaApi = useCallback(async (): Promise<void> => {
    if (dataLoaded || isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await controller.buscarEAdicionarEntidades();
      
      const allCharacters = controller.buscarPersonagens();
      const allEpisodes = controller.buscarEpisodios();
      const allLocations = controller.buscarLocais();
      
      setCharacters(allCharacters);
      setEpisodes(allEpisodes);
      setLocations(allLocations);
      setDataLoaded(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [controller, dataLoaded, isLoading]);

  /**
   * Pesquisar todas as entidades por critério
   * Implementa o padrão Pesquisável definido no diagrama
   * @param criterio - Texto para pesquisar
   * @returns Array de entidades encontradas (Character, Episode, Location)
   */
  const pesquisarTodos = (criterio: string): (Character | Episode | Location)[] => {
    return controller.pesquisarPorCriterio(criterio) as (Character | Episode | Location)[];
  };

  /**
   * Pesquisar apenas personagens usando o padrão IPesquisavel
   * @param criterio - Texto para pesquisar
   * @returns Array de personagens encontrados
   */
  const pesquisarPersonagens = (criterio: string): Character[] => {
    return controller.buscarPersonagens(criterio);
  };

  /**
   * Listar todos os personagens carregados
   * @returns Array com todos os personagens
   */
  const listarTodosPersonagens = (): Character[] => {
    return characters;
  };

  /**
   * Buscar personagens por espécie específica
   * Implementa regra de negócio específica do domínio Rick and Morty
   * @param species - Nome da espécie
   * @returns Array de personagens da espécie
   */
  const buscarPorEspecie = (species: string): Character[] => {
    return controller.buscarPorEspecie(species);
  };

  /**
   * Buscar personagens que estão vivos
   * Utiliza o método estaVivo() da entidade Character
   * @returns Array de personagens vivos
   */
  const buscarPersonagensVivos = (): Character[] => {
    return controller.buscarPersonagensVivos();
  };

  /**
   * Buscar episódios por temporada específica
   * @param season - Número da temporada
   * @returns Array de episódios da temporada
   */
  const buscarEpisodiosPorTemporada = (season: number): Episode[] => {
    return controller.buscarEpisodiosPorTemporada(season);
  };

  /**
   * Buscar localizações por tipo específico
   * @param type - Tipo da localização
   * @returns Array de localizações do tipo
   */
  const buscarLocalizacoesPorTipo = (type: string): Location[] => {
    return controller.buscarLocalizacoesPorTipo(type);
  };

  /**
   * Buscar personagem específico por ID
   * @param id - ID único do personagem
   * @returns Personagem encontrado ou undefined
   */
  const buscarPersonagemPorId = (id: number): Character | undefined => {
    return characters.find(char => char.id === id);
  };

  /**
   * Obter estatísticas do sistema Rick and Morty
   * Fornece métricas úteis sobre os dados carregados
   * @returns Objeto com estatísticas do sistema
   */
  const obterEstatisticas = () => {
    return controller.obterEstatisticasRickMorty();
  };

  /**
   * Limpar todos os dados carregados
   * Reseta o estado da aplicação
   */
  const limparTodos = (): void => {
    controller.limparTodos();
    setCharacters([]);
    setEpisodes([]);
    setLocations([]);
    setDataLoaded(false);
  };

  // Retorna todas as funções e estados disponíveis seguindo o padrão do diagrama
  return {
    // Estados principais da aplicação
    isLoading,
    error,
    characters,
    episodes,
    locations,
    dataLoaded,
    
    // Função principal para carregamento de dados da API
    carregarDadosDaApi,
    
    // Funcionalidades de pesquisa (implementam IPesquisavel)
    pesquisarTodos,
    pesquisarPersonagens,
    listarTodosPersonagens,
    
    // Funcionalidades de busca específicas por critérios
    buscarPorEspecie,
    buscarPersonagensVivos,
    buscarPersonagemPorId,
    buscarEpisodiosPorTemporada,
    buscarLocalizacoesPorTipo,
    
    // Utilitários do sistema
    obterEstatisticas,
    limparTodos,
    
    // Acesso direto ao controller para casos específicos
    controller
  };
}
