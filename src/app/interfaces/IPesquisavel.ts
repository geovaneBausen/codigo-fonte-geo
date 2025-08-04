export interface IPesquisavel {
    /**
     * Verifica se a entidade atende a um critério de busca específico
     * 
     * Método polimórfico que permite diferentes implementações de busca
     * para cada tipo de entidade, mantendo uma interface consistente.
     */
    atendeCriterio(criterio: string): boolean;
    
    toString(): string;
}