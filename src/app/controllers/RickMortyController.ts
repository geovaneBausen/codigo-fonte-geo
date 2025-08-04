import { Character } from '../models/entities/Character';
import { Episode } from '../models/entities/Episode';
import { Location } from '../models/entities/Location';
import { IPesquisavel } from '../interfaces/IPesquisavel';

/**
 * Controller que gerencia o catálogo de entidades 
 * Usa o padrão Singleton para garantir uma única instância de acesso aos dados.
 */
export class RickMortyController {
    private catalogo: IPesquisavel[] = []; // entidades pesquisaveis (personagens, locais, episódios)
    private static instance: RickMortyController;

    // Construtor privado para implementar o padrão Singleton.
    private constructor() { }

    /* 
    Ao tornar o construtor private, você impede que outras partes do seu código criem instâncias da classe RickMortyController diretamente usando new RickMortyController(). Isso força todos os consumidores a usarem o método estático fornecido para obter a instância.*/


    /**
     * Retorna a única instância da classe RickMortyController.
     * @returns A instância da classe.
     */
    public static getInstance(): RickMortyController {
        if (!RickMortyController.instance) {
            RickMortyController.instance = new RickMortyController();
        }
        return RickMortyController.instance;
    }
    /**
  * Limpa o catálogo, removendo todas as entidades.
  */
    public limparCatalogo(): void {
        this.catalogo = [];
    }

    /**
     * Carrega todos os dados da API do Rick and Morty e popula o catálogo.
     * Esta função é segura para ser chamada múltiplas vezes,
     * pois só carrega os dados se o catálogo estiver vazio.
     * @throws Erro se a requisição da API falhar.
     */
    public async carregarDadosAPI(): Promise<void> {
        if (this.catalogo.length > 0) {
            return;
        }
        try {
            await this.carregarPersonagens();
            await this.carregarEpisodios();
            await this.carregarLocalizacoes();
            console.log('Resumo final:');
            console.log('Personagens:', this.catalogo.filter(e => e instanceof Character).length);
            console.log('Episodios:', this.catalogo.filter(e => e instanceof Episode).length);
            console.log('Localizacoes:', this.catalogo.filter(e => e instanceof Location).length);
        } catch (error) {
            console.error("Erro ao carregar dados da API:", error);
            throw new Error('Falha ao carregar dados da API do Rick and Morty.');
        }
    }

    /**
     * Catálogo completo de entidades.
     * @returns Um array contendo todas as entidades.
     */
    public obterTodasEntidades(): IPesquisavel[] {
        return this.catalogo;
    }

    /**
     * Pesquisa no catálogo por um critério específico.
     * @param criterio O termo de busca.
     * @returns Um array de entidades que atendem ao critério.
     */
    public pesquisarPorCriterio(criterio: string): IPesquisavel[] {
        if (!criterio) {
            return this.obterTodasEntidades();
        }
        return this.catalogo.filter(item => item.atendeCriterio(criterio));
    }

    /**
     * Busca por personagens no catálogo.
     * @param criterio (Opcional) O termo de busca. Se não fornecido, retorna todos os personagens.
     * @returns Um array de objetos Character que correspondem ao critério.
     */
    public buscarPersonagens(criterio: string = ''): Character[] {
        return this.catalogo
            .filter(item => item instanceof Character)
            .filter(item => criterio === '' || item.atendeCriterio(criterio)) as Character[];
    }

    /**
     * 
     * Busca por locais no catálogo.
     * @param criterio (Opcional) O termo de busca. Se não fornecido, retorna todos os locais.
     * @returns Um array de objetos Location que correspondem ao critério.
     */
    public buscarLocais(criterio: string = ''): Location[] {
        return this.catalogo
            .filter(item => item instanceof Location)
            .filter(item => criterio === '' || item.atendeCriterio(criterio)) as Location[];
    }

    /**
     * Busca por episódios no catálogo.
     * @param criterio (Opcional) O termo de busca. Se não fornecido, retorna todos os episódios.
     * @returns Um array de objetos Episode que correspondem ao critério.
     */
    public buscarEpisodios(criterio: string = ''): Episode[] {
        return this.catalogo
            .filter(item => item instanceof Episode)
            .filter(item => criterio === '' || item.atendeCriterio(criterio)) as Episode[];
    }

    /**
     * Adiciona uma única entidade ao catálogo.
     * Evita a duplicação verificando se a entidade já existe.
     * @param entidade A entidade a ser adicionada.
     */
    public adicionarEntidade(entidade: IPesquisavel): void {
        const exists = this.catalogo.some(item =>
            (item as any).id === (entidade as any).id &&
            item.constructor.name === entidade.constructor.name
        );
        if (!exists) {
            this.catalogo.push(entidade);
        }
    }

    /**
     * Remove uma entidade do catálogo com base no seu ID.
     * @param entidade A entidade a ser removida.
     */
    public removerEntidade(entidade: IPesquisavel): void {
        const index = this.catalogo.findIndex(item => (item as any).id === (entidade as any).id);
        if (index > -1) {
            this.catalogo.splice(index, 1);
        }
    }


    /**
     * Busca uma entidade específica por ID.
     * @param id O ID da entidade a ser buscada.
     * @returns A entidade encontrada ou undefined se não existir.
     */
    public buscarEntidadePorId(id: number): IPesquisavel | undefined {
        return this.catalogo.find(item => (item as any).id === id);
    }
    private async carregarEpisodios(): Promise<void> {
        let url = 'https://rickandmortyapi.com/api/episode';
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            data.results.forEach((ep: any) => {
                const episode = new Episode(
                    ep.id,
                    ep.name,
                    ep.url,
                    ep.created,
                    ep.air_date,
                    ep.episode,
                    ep.characters
                );
                this.adicionarEntidade(episode); // Adiciona o episódio ao catálogo
            });
            url = data.info.next; // próxima página ou null
        }
    }
    private async carregarLocalizacoes(): Promise<void> {
        let url = 'https://rickandmortyapi.com/api/location';
        while (url) {
            const response = await fetch(url);
            const data = await response.json();

            data.results.forEach((loc: any) => {
                const location = new Location(
                    loc.id,
                    loc.name,
                    loc.url,
                    loc.created,
                    loc.type,
                    loc.dimension,
                    loc.residents
                );
                this.adicionarEntidade(location);
            });
            url = data.info.next;// próxima página ou null
        }
    }
    // Métodos privados para o carregamento dos dados da API
    private async carregarPersonagens(): Promise<void> {
        let url = 'https://rickandmortyapi.com/api/character';
        while (url) {
            const response = await fetch(url);
            const data = await response.json();

            data.results.forEach((char: any) => {
                const character = new Character(
                    char.id,
                    char.name,
                    char.url,
                    char.created,
                    char.status,
                    char.species,
                    char.type,
                    char.gender,
                    char.origin,
                    char.location,
                    char.image,
                    char.episode
                );
                this.adicionarEntidade(character);
            });
            url = data.info.next;
        }
    }
}