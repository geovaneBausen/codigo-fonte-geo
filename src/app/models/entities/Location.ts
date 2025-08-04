import { EntidadeBase } from '../base/EntidadeBase';

export class Location extends EntidadeBase {
    public readonly type: string;
    public readonly dimension: string;
    public readonly residents: string[];

    constructor(
        id: number,
        name: string,
        url: string,
        created: string, 
        type: string,
        dimension: string,
        residents: string[]
    ) {
        super(id, name, url); 
        this.type = type;
        this.dimension = dimension;
        this.residents = residents;
    }

    atendeCriterio(criterio: string): boolean {
        if (!criterio || criterio.trim() === '') {
            return true;
        }

        const termo = criterio.toLowerCase().trim();
        
        return (
            this.name.toLowerCase().includes(termo) ||
            this.type.toLowerCase().includes(termo) ||
            this.dimension.toLowerCase().includes(termo)
        );
    }

    public getDescription(): string {
        return `Local: ${this.name} (${this.type}) - Dimensão: ${this.dimension}`;
    }

    toString(): string {
        return `Location: ${this.name} (${this.type}, ${this.dimension})`;
    }
}