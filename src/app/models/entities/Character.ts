import { EntidadeBase } from '../base/EntidadeBase';

export class Character extends EntidadeBase {
  public status: string;
  public species: string;
  public gender: string;
  public origin: string;
  public location: string;
  public image: string;
  public episodes: string[];

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
    super(id, name, url);
    
    this.status = status;
    this.species = species;
    this.gender = gender;
    this.origin = origin;
    this.location = location;
    this.image = image;
    this.episodes = episodes;
  }

  public atendeCriterio(criterio: string): boolean {
    const termo = criterio.toLowerCase();
    return super.atendeCriterio(criterio) ||
           this.species.toLowerCase().includes(termo) ||
           this.status.toLowerCase().includes(termo) ||
           this.gender.toLowerCase().includes(termo) ||
           this.origin.toLowerCase().includes(termo);
  }

  public getDescription(): string {
    return `${this.species}: ${this.name} - Status: ${this.status}`;
  }

  public estaVivo(): boolean {
    return this.status === 'Alive';
  }

  public adicionarEpisodio(episodio: string): void {
    if (!this.episodes.includes(episodio)) {
      this.episodes.push(episodio);
      this.atualizarTimestamp();
    }
  }

  public removerEpisodio(episodio: string): void {
    this.episodes = this.episodes.filter(e => e !== episodio);
    this.atualizarTimestamp();
  }

  public toString(): string {
    return `${this.name} (${this.species}) - Status: ${this.status}`;
  }

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