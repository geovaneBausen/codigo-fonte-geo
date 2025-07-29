import { EntidadeBase } from '../base/EntidadeBase';

export class Episode extends EntidadeBase {
  public episode: string;
  public air_date: string;
  public characters: string[];

  constructor(
    id: number,
    name: string,
    episode: string,
    air_date: string,
    characters: string[] = [],
    url: string = ''
  ) {
    super(id, name, url);
    
    this.episode = episode;
    this.air_date = air_date;
    this.characters = characters;
  }

  public atendeCriterio(criterio: string): boolean {
    const termo = criterio.toLowerCase();
    return super.atendeCriterio(criterio) ||
           this.episode.toLowerCase().includes(termo) ||
           this.air_date.toLowerCase().includes(termo);
  }

  /**
   * Implementação do método abstrato da EntidadeBase
   */
  public getDescription(): string {
    return `Episódio: ${this.episode} - ${this.name} (${this.air_date})`;
  }

  /**
   * Implementação personalizada do toString()
   */
  public toString(): string {
    return `${this.name} (${this.episode}) - ${this.air_date}`;
  }
}