import { EntidadeBase } from '../base/EntidadeBase';

export class Episode extends EntidadeBase {
    public readonly air_date: string;
    public readonly episode: string;
    public readonly characters: string[];

    constructor(
        id: number,
        name: string,
        url: string,
        created: string, 
        air_date: string,
        episode: string,
        characters: string[]
    ) {
        super(id, name, url, created); 
        
        this.air_date = air_date;
        this.episode = episode;
        this.characters = characters;
    }

    atendeCriterio(criterio: string): boolean {
        if (!criterio || criterio.trim() === '') {
            return true;
        }

        const termo = criterio.toLowerCase().trim();
        
        return (
            this.name.toLowerCase().includes(termo) ||
            this.episode.toLowerCase().includes(termo) ||
            this.air_date.toLowerCase().includes(termo)
        );
    }

    toString(): string {
        return `Episode: ${this.name} (${this.episode})`;
    }
}