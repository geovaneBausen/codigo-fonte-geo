'use client';
import { useState, useEffect, useMemo } from 'react';
import { Character } from '../models/entities/Character';
import { Episode } from '../models/entities/Episode';
import { Location } from '../models/entities/Location';

export type EntityData = Character | Episode | Location;

export const useRickMortyData = () => {
    const [entities, setEntities] = useState<EntityData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'character' | 'location' | 'episode'>('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const filteredEntities = useMemo(() => {
        let filtered = entities;

        // Filtro por tipo 
        if (filterType !== 'all') {
            filtered = filtered.filter(entity => {
                switch (filterType) {
                    case 'character': return 'species' in entity;
                    case 'location': return 'dimension' in entity;
                    case 'episode': return 'air_date' in entity;
                    default: return true;
                }
            });
        }

        // Filtro por busca usando IPesquisavel
        if (searchTerm.trim()) {
            filtered = filtered.filter(entity => entity.atendeCriterio(searchTerm));
        }

        return filtered;
    }, [entities, searchTerm, filterType]);

    //carregamento
    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const [charactersRes, locationsRes, episodesRes] = await Promise.all([
                fetch('https://rickandmortyapi.com/api/character'),
                fetch('https://rickandmortyapi.com/api/location'),
                fetch('https://rickandmortyapi.com/api/episode')
            ]);

            const [charactersData, locationsData, episodesData] = await Promise.all([
                charactersRes.json(),
                locationsRes.json(),
                episodesRes.json()
            ]);

            const allEntities: EntityData[] = [
                ...charactersData.results.map((char: any) => new Character(
                    char.id, char.name, char.status, char.species, char.gender,
                    char.origin.name, char.location.name, char.image, 
                    char.episode || [], char.url
                )),
                ...locationsData.results.map((loc: any) => new Location(
                    loc.id, loc.name, loc.type, loc.dimension, 
                    loc.residents || [], loc.url
                )),
                ...episodesData.results.map((ep: any) => new Episode(
                    ep.id, ep.name, ep.episode, ep.air_date, 
                    ep.characters || [], ep.url
                ))
            ];

            setEntities(allEntities);
        } catch (error) {
            setError('Erro ao carregar dados da API');
        } finally {
            setLoading(false);
        }
    };

    const getEntitiesByType = (type: 'character' | 'location' | 'episode') => {
        return filteredEntities.filter(entity => {
            switch (type) {
                case 'character': return 'species' in entity;
                case 'location': return 'dimension' in entity;
                case 'episode': return 'air_date' in entity;
                default: return false;
            }
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    return {
        entities: filteredEntities,
        searchTerm,
        filterType,
        loading,
        error,
        handleSearch: setSearchTerm,
        handleFilterChange: setFilterType,
        getEntitiesByType,
        refetch: loadData
    };
};