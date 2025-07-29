import { IPesquisavel } from '../../interfaces/IPesquisavel';

export abstract class EntidadeBase implements IPesquisavel {
  public id: number;
  public name: string;
  public url: string;

  public criadoEm: Date;
  public atualizadoEm: Date;

  constructor(id: number, name: string, url: string) {
    this.id = id;
    this.name = name;
    this.url = url;
    
    this.criadoEm = new Date();
    this.atualizadoEm = new Date();
  }

  protected atualizarTimestamp(): void {
    this.atualizadoEm = new Date();
  }

  /**
   * Implementação padrão do IPesquisavel
   */
  public atendeCriterio(criterio: string): boolean {
    const termo = criterio.toLowerCase();
    return this.name.toLowerCase().includes(termo) ||
           this.id.toString().includes(termo);
  }

  public toString(): string {
    return `${this.constructor.name} (ID: ${this.id}, Nome: ${this.name})`;
  }

  public abstract getDescription(): string;
}