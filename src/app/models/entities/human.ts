import { Character } from './Character';

export class Human extends Character {
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
        super(id, name, url, created, status, species, type, gender, origin, location, image, episode);
    }

    public getDescription(): string {
        return `${this.species}: ${this.name} - Status: ${this.status}`;
    }
}