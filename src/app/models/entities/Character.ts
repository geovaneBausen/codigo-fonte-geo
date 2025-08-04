import { EntidadeBase } from '../base/EntidadeBase';

export class Character extends EntidadeBase {
    public readonly status: string;
    public readonly species: string;
    public readonly type: string;
    public readonly gender: string;
    public readonly origin: {
        name: string;
        url: string;
    };
    public readonly location: {
        name: string;
        url: string;
    };
    public readonly image: string;
    public readonly episode: string[];

    constructor(
        id: number,
        name: string,
        url: string,
        created: string,
        status: string,
        species: string,
        type: string,
        gender: string,
        origin: { name: string; url: string },
        location: { name: string; url: string },
        image: string,
        episode: string[]
    ) {
        super(id, name, url);

        // Inicializa propriedades específicas do personagem
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.image = image;
        this.episode = episode;
    }

    /**
     * Implementação específica do critério de busca para personagens
     * Busca por nome, status, espécie ou gênero
     */
    atendeCriterio(criterio: string): boolean {
        if (!criterio || criterio.trim() === '') {
            return true;
        }

        const termo = criterio.toLowerCase().trim();
        
        return (
            this.name.toLowerCase().includes(termo) ||
            this.status.toLowerCase().includes(termo) ||
            this.species.toLowerCase().includes(termo) ||
            this.gender.toLowerCase().includes(termo) ||
            this.type.toLowerCase().includes(termo) ||
            this.origin.name.toLowerCase().includes(termo) ||
            this.location.name.toLowerCase().includes(termo)
        );
    }

    public getDescription(): string {
        return `${this.species}: ${this.name} - Status: ${this.status}`;
    }

    toString(): string {
        return `Character: ${this.name} (${this.status}, ${this.species})`;
    }

    isAlive(): boolean {
        return this.status.toLowerCase() === 'alive';
    }
    
    isHuman(): boolean {
        return this.species.toLowerCase() === 'human';
    }
}