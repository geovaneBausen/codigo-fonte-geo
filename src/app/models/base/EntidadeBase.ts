/**
 * Classe Abstrata EntidadeBase - Classe base para todas as entidades do sistema
 * 
 * Implementa os princípios SOLID e GRASP:
 * - SRP: Responsável por propriedades e comportamentos comuns a todas as entidades
 * - OCP: Aberta para extensão (subclasses) mas fechada para modificação
 * - LSP: Subclasses podem substituir a classe base sem quebrar funcionalidade
 * - ISP: Implementa IPesquisavel com métodos específicos para busca
 * - DIP: Depende da abstração IPesquisavel
 * - Expert: Encapsula conhecimento sobre timestamps e operações básicas
 * - Template Method: Define estrutura comum, delegando detalhes para subclasses
 * 
 * Padrões implementados:
 * - Template Method: getDescription() é abstrato, forçando implementação específica
 * - Strategy: atendeCriterio() pode ser sobrescrito para diferentes estratégias de busca
 */
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
  // Propriedades comuns a todas as entidades
  public id: number;        // Identificador único da entidade
  public name: string;      // Nome da entidade
  public url: string;       // URL da API Rick and Morty

  // Timestamps para auditoria e controle de versão
  public criadoEm: Date;    // Data/hora de criação da instância
  public atualizadoEm: Date; // Data/hora da última atualização

  /**
   * Construtor da classe base
   * 
   * Inicializa propriedades comuns e estabelece timestamps de criação.
   * Template Method pattern: define estrutura comum para todas as entidades.
   * 
   * @param id - Identificador único da entidade
   * @param name - Nome da entidade
   * @param url - URL da API de origem
   */
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