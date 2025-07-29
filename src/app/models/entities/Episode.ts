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

  public getDescription(): string {
    return `Episódio: ${this.episode} - ${this.name} (${this.air_date})`;
  }

  public adicionarPersonagem(personagem: string): void {
    if (!this.characters.includes(personagem)) {
      this.characters.push(personagem);
      this.atualizarTimestamp();
    }
  }

  public removerPersonagem(personagem: string): void {
    this.characters = this.characters.filter(c => c !== personagem);
    this.atualizarTimestamp();
  }

  public obterNumeroPersonagens(): number {
    return this.characters.length;
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      episode: this.episode,
      air_date: this.air_date,
      characters: this.characters,
      url: this.url,
      criadoEm: this.criadoEm,
      atualizadoEm: this.atualizadoEm
    };
  }

  public toString(): string {
    return `${this.name} (${this.episode}) - ${this.air_date}`;
  }
}