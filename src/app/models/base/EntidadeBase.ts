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
  // Propriedades comuns a todas as entidades
  public id: number;        
  public name: string;     
  public url: string;       

  // Timestamps para auditoria e controle de versão
  public criadoEm: Date;    
  public atualizadoEm: Date; 

  constructor(id: number, name: string, url: string) {
    this.id = id;
    this.name = name;
    this.url = url;
    
    // Estabelece timestamps iniciais
    this.criadoEm = new Date();
    this.atualizadoEm = new Date();
  }

  /**
   * Atualiza o timestamp de modificação
   * 
   * Método protegido que pode ser chamado pelas subclasses
   * sempre que uma propriedade for modificada.
   * Implementa auditoria automática de mudanças.
   */
  protected atualizarTimestamp(): void {
    this.atualizadoEm = new Date();
  }

  /**
   * Implementação padrão do critério de busca da interface IPesquisavel
   * 
   * Busca pelo nome da entidade (case-insensitive).
   * Pode ser sobrescrita pelas subclasses para incluir campos específicos.
   * Implementa Strategy pattern: cada subclasse pode ter sua própria estratégia.
   * 
   * @param criterio - Termo de busca a ser procurado
   * @returns boolean - true se a entidade atende ao critério
   */
  public atendeCriterio(criterio: string): boolean {
    const termo = criterio.toLowerCase();
    return this.name.toLowerCase().includes(termo);
  }

  /**
   * Representação textual padrão da entidade
   * 
   * Fornece informações básicas da entidade de forma legível.
   * Utiliza this.constructor.name para obter o nome da classe em runtime.
   * 
   * @returns string - Representação textual da entidade
   */
  public toString(): string {
    return `${this.constructor.name} (ID: ${this.id}, Nome: ${this.name})`;
  }

  /**
   * Método abstrato para descrição específica da entidade
   * 
   * Template Method pattern: força as subclasses a implementarem
   * sua própria versão de descrição, adequada ao tipo de entidade.
   * 
   * @returns string - Descrição específica da entidade
   */
  public abstract getDescription(): string;
}