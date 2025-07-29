import { EntidadeBase } from '../base/EntidadeBase';

export class Location extends EntidadeBase {
  public type: string;
  public dimension: string;
  public residents: string[];

  constructor(
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[] = [],
    url: string = ''
  ) {
    super(id, name, url);
    this.type = type;
    this.dimension = dimension;
    this.residents = residents;
  }

  // Sobrescreve a implementação da classe pai para incluir campos específicos
  public atendeCriterio(criterio: string): boolean {
    const termo = criterio.toLowerCase();
    return super.atendeCriterio(criterio) ||
           this.type.toLowerCase().includes(termo) ||
           this.dimension.toLowerCase().includes(termo);
  }

  public getDescription(): string {
    return `Local: ${this.name} (${this.type}) - Dimensão: ${this.dimension}`;
  }

  public adicionarResidente(residente: string): void {
    if (!this.residents.includes(residente)) {
      this.residents.push(residente);
      this.atualizarTimestamp();
    }
  }

  public removerResidente(residente: string): void {
    this.residents = this.residents.filter(r => r !== residente);
    this.atualizarTimestamp();
  }

  public ehPlaneta(): boolean {
    return this.type.toLowerCase().includes('planet');
  }

  public obterNumeroResidentes(): number {
    return this.residents.length;
  }

  public atualizarInformacoes(
    name?: string,
    type?: string,
    dimension?: string
  ): void {
    if (name) this.name = name;
    if (type) this.type = type;
    if (dimension) this.dimension = dimension;
    
    this.atualizarTimestamp();
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      dimension: this.dimension,
      residents: this.residents,
      url: this.url,
      criadoEm: this.criadoEm,
      atualizadoEm: this.atualizadoEm
    };
  }

  public toString(): string {
    return `${this.name} (${this.type}) - ${this.dimension}`;
  }
}