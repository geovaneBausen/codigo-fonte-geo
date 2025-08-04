<<<<<<< HEAD
=======

>>>>>>> 77c38defc47ae3d72d398df97cf9380a4298f5ec
import { IPesquisavel } from '../../interfaces/IPesquisavel';

/**
 * Classe abstrata que serve como base para todas as entidades do Catalogo 
 * 
 * Fornece funcionalidades comuns como:
 * - Identificação única (id)
 * - Nome da entidade
 * - URL da API de origem
 * - Timestamps de criação e atualização
 * - Implementação básica de busca
 */
export abstract class EntidadeBase implements IPesquisavel {
<<<<<<< HEAD
  // Propriedades comuns a todas as entidades
  public id: number;        
  public name: string;     
  public url: string;       

  // Timestamps para auditoria e controle de versão
  public criadoEm: Date;    
=======
  public id: number;  
  public name: string;      
  public url: string;       

  public criadoEm: Date; 
>>>>>>> 77c38defc47ae3d72d398df97cf9380a4298f5ec
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