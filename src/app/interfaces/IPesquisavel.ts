export interface IPesquisavel {
    atendeCriterio(criterio: string): boolean;
    toString(): string;
}