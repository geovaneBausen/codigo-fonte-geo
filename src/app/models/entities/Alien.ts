import { Character } from './Character';

export class Alien extends Character {
    public readonly planet: string;

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
        episode: string[],
        planet: string // Novo atributo específico de Alien
    ) {
        super(id, name, url, created, status, species, type, gender, origin, location, image, episode);
        this.planet = planet;
    }

    public getDescription(): string {
        return `${this.species}: ${this.name} - Planeta: ${this.planet} - Status: ${this.status}`;
    }
}