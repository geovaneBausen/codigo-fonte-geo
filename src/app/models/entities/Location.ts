import { EntidadeBase } from '../base/EntidadeBase';
import { IPesquisavel } from '../../interfaces/IPesquisavel';

export class Location extends EntidadeBase implements IPesquisavel {
  public name: string;
  public type: string;
  public dimension: string;
  public residents: string[];
  public url?: string;

  constructor(
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[] = [],
    url?: string
  ) {
    super(id);
    this.name = name;
    this.type = type;
    this.dimension = dimension;
    this.residents = residents;
    this.url = url;
  }

  /**
   * Implementação da interface IPesquisavel
   * Pesquisa por critério no nome da localização
   */
  pesquisarPorCriterio(criterio: string): boolean {
    const criterioPadrao = criterio.toLowerCase();
    return this.name.toLowerCase().includes(criterioPadrao) ||
           this.type.toLowerCase().includes(criterioPadrao) ||
           this.dimension.toLowerCase().includes(criterioPadrao);
  }

  /**
   * Implementation of IPesquisavel interface
   */
  atendeCriterio(criterio: string): boolean {
    return this.pesquisarPorCriterio(criterio);
  }

  /**
   * Adiciona um residente à localização
   */
  adicionarResidente(residente: string): void {
    if (!this.residents.includes(residente)) {
      this.residents.push(residente);
    }
  }

  /**
   * Remove um residente da localização
   */
  removerResidente(residente: string): void {
    this.residents = this.residents.filter(r => r !== residente);
  }

  /**
   * Retorna uma descrição da localização
   */
  getDescription(): string {
    return `Local: ${this.name} (${this.type}) - Dimensão: ${this.dimension}`;
  }

  /**
   * Retorna o texto principal usado na pesquisa (nome)
   */
  obterTextoPrincipal(): string {
    return this.name;
  }

  /**
   * Verifica se é um planeta
   */
  ehPlaneta(): boolean {
    return this.type.toLowerCase().includes('planet');
  }

  /**
   * Retorna o número de residentes
   */
  obterNumeroResidentes(): number {
    return this.residents.length;
  }

  /**
   * Atualiza informações da localização
   */
  atualizarInformacoes(
    name?: string,
    type?: string,
    dimension?: string
  ): void {
    if (name) this.name = name;
    if (type) this.type = type;
    if (dimension) this.dimension = dimension;
    
    this.atualizarTimestamp();
  }

  /**
   * Converte para objeto simples para uso em APIs
   */
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      dimension: this.dimension,
      residents: this.residents,
      url: this.url
    };
  }

  /**
   * Implementação personalizada do toString() para IPesquisavel
   * Sobrescreve o método da classe base para fornecer informação mais útil
   */
  toString(): string {
    return `${this.name} (${this.type}) - ${this.dimension}`;
  }
}
