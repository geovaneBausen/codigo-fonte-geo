import { IPesquisavel } from '../../interfaces/IPesquisavel';

/**
 * Classe base abstrata para todas as entidades do sistema
 * 
 * Implementa a interface IPesquisavel e fornece funcionalidades
 * comuns para todas as entidades (Character, Episode, Location)
 */
export abstract class EntidadeBase implements IPesquisavel {
    public readonly id: number;
    public readonly name: string;
    public readonly url: string;
    public readonly created: string;

    constructor(
        id: number,
        name: string,
        url: string,
        created: string
    ) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.created = created;
    }

    /**
     * Implementação padrão do critério de busca
     * Busca pelo nome da entidade (case-insensitive)
     */
    atendeCriterio(criterio: string): boolean {
        if (!criterio || criterio.trim() === '') {
            return true; // Se não há critério, retorna todos
        }
        
        return this.name
            .toLowerCase()
            .includes(criterio.toLowerCase().trim());
    }

    /**
     * Representação em string da entidade
     */
    toString(): string {
        return `${this.constructor.name}(id: ${this.id}, name: "${this.name}")`;
    }

    /**
     * Método para obter dados básicos da entidade
     */
    getDadosBasicos() {
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            created: this.created
        };
    }
}