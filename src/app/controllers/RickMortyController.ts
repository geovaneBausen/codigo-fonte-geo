import { Character } from '../models/entities/Character';
import { Episode } from '../models/entities/Episode';
import { Location } from '../models/entities/Location';
import { IPesquisavel } from '../interfaces/IPesquisavel';

export class RickMortyController {
  private catalogo: IPesquisavel[] = [];

  constructor() {
    // Initialize empty catalog
  }
  async buscarEAdicionarEntidades(): Promise<void> {
    await this.carregarDadosAPI();
  }

  buscarPersonagens(criterio: string = ''): Character[] {
    return this.catalogo
      .filter(item => item instanceof Character)
      .filter(item => criterio === '' || item.atendeCriterio(criterio)) as Character[];
  }

  buscarLocais(criterio: string = ''): Location[] {
    return this.catalogo
      .filter(item => item instanceof Location)
      .filter(item => criterio === '' || item.atendeCriterio(criterio)) as Location[];
  }


  buscarEpisodios(criterio: string = ''): Episode[] {
    return this.catalogo
      .filter(item => item instanceof Episode)
      .filter(item => criterio === '' || item.atendeCriterio(criterio)) as Episode[];
  }

  buscarEntidadePorId(id: number): IPesquisavel | undefined {
    return this.catalogo.find(item => (item as any).id === id);
  }

  adicionarEntidade(entidade: IPesquisavel): void {
    const exists = this.catalogo.some(item => (item as any).id === (entidade as any).id);
    if (!exists) {
      this.catalogo.push(entidade);
    }
  }

  removerEntidade(entidade: IPesquisavel): void {
    const index = this.catalogo.findIndex(item => (item as any).id === (entidade as any).id);
    if (index > -1) {
      this.catalogo.splice(index, 1);
    }
  }

  listarEntidades(array?: IPesquisavel[]): void {
    const entities = array || this.catalogo;
    console.log(`Total entities: ${entities.length}`);
    entities.forEach(entity => console.log(entity.toString()));
  }

  pesquisarPorCriterio(criterio: string): IPesquisavel[] {
    return this.catalogo.filter(item => item.atendeCriterio(criterio));
  }

  adicionarEpisodioPersonagem(personagemId: number, episodioUrl: string): void {
    const character = this.buscarEntidadePorId(personagemId) as Character;
    if (character && character instanceof Character) {
      character.adicionarEpisodio(episodioUrl);
    }
  }

  buscarTodos(criterio: string): (Character | Episode | Location)[] {
    return this.pesquisarPorCriterio(criterio) as (Character | Episode | Location)[];
  }

  buscarPorEspecie(species: string): Character[] {
    return this.buscarPersonagens().filter(char => 
      char.species.toLowerCase().includes(species.toLowerCase())
    );
  }

  buscarPersonagensVivos(): Character[] {
    return this.buscarPersonagens().filter(char => char.estaVivo());
  }

  buscarEpisodiosPorTemporada(season: number): Episode[] {
    return this.buscarEpisodios().filter(episode => 
      episode.episode.includes(`S${season.toString().padStart(2, '0')}`)
    );
  }

  buscarLocalizacoesPorTipo(type: string): Location[] {
    return this.buscarLocais().filter(location => 
      location.type.toLowerCase().includes(type.toLowerCase())
    );
  }

  limparTodos(): void {
    this.catalogo = [];
  }

  obterEstatisticasRickMorty() {
    const characters = this.buscarPersonagens();
    const episodes = this.buscarEpisodios();
    const locations = this.buscarLocais();

    return {
      totalPersonagens: characters.length,
      totalEpisodios: episodes.length,
      totalLocalizacoes: locations.length,
      personagensVivos: characters.filter(char => char.estaVivo()).length,
      personagensMortos: characters.filter(char => char.status.toLowerCase() === 'dead').length,
      personagensDesconhecidos: characters.filter(char => char.status.toLowerCase() === 'unknown').length,
      totalEntidades: this.catalogo.length
    };
  }

  async carregarDadosAPI(): Promise<void> {
    try {
      await Promise.all([
        this.carregarPersonagens(),
        this.carregarEpisodios(),
        this.carregarLocalizacoes()
      ]);
    } catch (error) {
      throw error;
    }
  }

  private async carregarPersonagens(): Promise<void> {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    
    data.results.slice(0, 20).forEach((char: any) => {
      const character = new Character(
        char.id,
        char.name,
        char.status,
        char.species,
        char.gender,
        char.origin.name,
        char.location.name,
        char.image,
        char.episode,
        char.url
      );
      this.adicionarEntidade(character);
    });
  }

  private async carregarEpisodios(): Promise<void> {
    const response = await fetch('https://rickandmortyapi.com/api/episode');
    const data = await response.json();
    
    data.results.slice(0, 10).forEach((ep: any) => {
      const episode = new Episode(
        ep.id,
        ep.name,
        ep.episode,
        ep.air_date,
        ep.characters,
        ep.url
      );
      this.adicionarEntidade(episode);
    });
  }

  private async carregarLocalizacoes(): Promise<void> {
    const response = await fetch('https://rickandmortyapi.com/api/location');
    const data = await response.json();
    
    data.results.slice(0, 10).forEach((loc: any) => {
      const location = new Location(
        loc.id,
        loc.name,
        loc.type,
        loc.dimension,
        loc.residents,
        loc.url
      );
      this.adicionarEntidade(location);
    });
  }
}
