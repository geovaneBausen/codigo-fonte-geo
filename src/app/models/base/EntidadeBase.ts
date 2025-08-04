
import { IPesquisavel } from '../../interfaces/IPesquisavel';

/**
 * Classe abstrata que serve como base para todas as entidades do universo Rick and Morty
 * 
 * Fornece funcionalidades comuns como:
 * - Identificação única (id)
 * - Nome da entidade
 * - URL da API de origem
 * - Timestamps de criação e atualização
 * - Implementação básica de busca
 */
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

  public atendeCriterio(criterio: string): boolean {
    const termo = criterio.toLowerCase();
    return this.name.toLowerCase().includes(termo);
  }

  public toString(): string {
    return `${this.constructor.name} (ID: ${this.id}, Nome: ${this.name})`;
  }

  public abstract getDescription(): string;
}