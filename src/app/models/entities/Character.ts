import { EntidadeBase } from '../base/EntidadeBase';

export class Character extends EntidadeBase {
  public status: string;    // Estado vital: Alive, Dead, Unknown
  public species: string;   // Espécie: Human, Alien, etc.
  public gender: string;    // Gênero do personagem
  public origin: string;    // Planeta/local de origem
  public location: string;  // Última localização conhecida
  public image: string;     // URL da imagem do personagem
  public episodes: string[]; // Lista de episódios em que aparece

  constructor(
    id: number,
    name: string,
    status: string,
    species: string,
    gender: string,
    origin: string,
    location: string,
    image: string,
    episodes: string[] = [],
    url: string = ''
  ) {
    // Chama o construtor da classe pai (EntidadeBase)
    super(id, name, url);
    
    // Inicializa propriedades específicas do personagem
    this.status = status;
    this.species = species;
    this.gender = gender;
    this.origin = origin;
    this.location = location;
    this.image = image;
    this.episodes = episodes;
  }

  /**
   * Implementa o critério de busca específico para personagens
   * 
   * Sobrescreve o método da classe pai para incluir campos específicos
   * do personagem na busca. Implementa polimorfismo para permitir
   * busca genérica através da interface IPesquisavel.
   
   */
  public atendeCriterio(criterio: string): boolean {
    const termo = criterio.toLowerCase();
    return super.atendeCriterio(criterio) || // Busca nos campos da classe pai (id, name)
           this.species.toLowerCase().includes(termo) ||
           this.status.toLowerCase().includes(termo) ||
           this.gender.toLowerCase().includes(termo) ||
           this.origin.toLowerCase().includes(termo);
  }

  /**
   * @returns string - Descrição formatada do personagem
   */
  public getDescription(): string {
    return `${this.species}: ${this.name} - Status: ${this.status}`;
  }

  /**

   * @returns boolean - true se o personagem estiver vivo
   */
  public estaVivo(): boolean {
    return this.status === 'Alive';
  }

  /**
   * Adiciona um episódio à lista do personagem
   * 
   * Implementa a regra de negócio que evita duplicatas.
   * Atualiza automaticamente o timestamp de modificação.
   * 
   * @param episodio - URL ou identificador do episódio
   */
  public adicionarEpisodio(episodio: string): void {
    if (!this.episodes.includes(episodio)) {
      this.episodes.push(episodio);
      this.atualizarTimestamp(); // Herda da classe pai
    }
  }

  /**
   * Remove um episódio da lista do personagem
   * 
   * Utiliza filter para criar novo array sem o episódio especificado.
   * Atualiza automaticamente o timestamp de modificação.
   * 
   * @param episodio - URL ou identificador do episódio a ser removido
   */
  public removerEpisodio(episodio: string): void {
    this.episodes = this.episodes.filter(e => e !== episodio);
    this.atualizarTimestamp(); // Herda da classe pai
  }

  public toString(): string {
    return `${this.name} (${this.species}) - Status: ${this.status}`;
  }

  /**
   * Serialização do objeto para JSON
   * 
   * Método útil para persistência, APIs e debugging.
   * Inclui todas as propriedades relevantes do personagem.
   * 
   * @returns any - Objeto JavaScript serializável
   */
  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      species: this.species,
      gender: this.gender,
      origin: this.origin,
      location: this.location,
      image: this.image,
      episodes: this.episodes,
      url: this.url,
      criadoEm: this.criadoEm,
      atualizadoEm: this.atualizadoEm
    };
  }
}