/**
 * Interface IPesquisavel - Contrato para entidades que podem ser pesquisadas
 * 
 * Implementa o princípio ISP (Interface Segregation Principle):
 * - Define apenas métodos relacionados à funcionalidade de pesquisa
 * - Não força implementações desnecessárias nas classes
 * 
 * Implementa o princípio DIP (Dependency Inversion Principle):
 * - Permite que o controller dependa de abstração, não de implementações concretas
 * - Facilita polimorfismo para diferentes tipos de entidades (Character, Episode, Location)
 * 
 */
export interface IPesquisavel {
    /**
     * Verifica se a entidade atende a um critério de busca específico
     * 
     * Método polimórfico que permite diferentes implementações de busca
     * para cada tipo de entidade, mantendo uma interface consistente.
     * 
     * @param criterio - Termo ou critério de busca a ser avaliado
     * @returns boolean - true se a entidade corresponde ao critério
     */
    atendeCriterio(criterio: string): boolean;
    
    /**
     * Retorna uma representação textual da entidade
     * 
     * Método padrão que garante que toda entidade pesquisável
     * possa ser convertida para string de forma consistente.
     * 
     * @returns string - Representação textual da entidade
     */
    toString(): string;
}