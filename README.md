--------------------------------------------------------
O projeto implementa um padrão de arquitetura em camadas:
    --------------------------------------------------------
    Camada de Interface: Componentes React (EntityCard, UniversalSearch)
    --------------------------------------------------------
    Camada de Controle: RickMortyController gerencia regras de negócio
    --------------------------------------------------------
    Camada de Modelo: Entidades Character, Episode, Location
    --------------------------------------------------------
    Camada de Dados: APIs Rick & Morty + useRickMortyData
--------------------------------------------------------
Padrões de Design Implementados:
Interface Segregation (IPesquisavel)
--------------------------------------------------------
// Todas as entidades implementam busca unificada:

    interface IPesquisavel {
        atendeCriterio(criterio: string): boolean;
        toString(): string;
    }
--------------------------------------------------------

Polimorfismo em Ação

O EntityCard renderiza diferentes tipos de entidade
Cada entidade tem comportamento específico de pesquisa
Controller trata todas como IPesquisavel
--------------------------------------------------------

--------------------------------------------------------
Factory Pattern

useRickMortyData cria instâncias das entidades a partir da API
Transformação automática: API data → Class instances

--------------------------------------------------------
Fluxo de Dados:

API Rick & Morty → useRickMortyData → Controller → Components → UI
--------------------------------------------------------
Carregamento: Hook faz requisições paralelas (Promise.all)
Processamento: Controller organiza entidades em catálogo
Busca: Interface IPesquisavel permite pesquisa unificada
Renderização: EntityCard exibe polimorficamente
--------------------------------------------------------
Funcionalidades Principais:

Busca Universal 
Pesquisa simultânea em personagens, episódios e localizações
Implementação via IPesquisavel.atendeCriterio()

--------------------------------------------------------
Páginas Especializadass
/PGpersonagens: Lista personagens
/PGplanetas: Exibe localizações
/PGepisodios: Mostra episódios
Componentes Reutilizáveis
--------------------------------------------------------
Componentes Reutilizáveis
EntityCard: Renderização polimórfica
SearchBar: Busca unificada
NavBar: Navegação temática
5. Vantagens da Arquitetura (1 min)
✅ Extensibilidade: Adicionar novas entidades é simples (implementar IPesquisavel)
✅ Manutenibilidade: Separação clara de responsabilidades
✅ Reutilização: Componentes genéricos servem múltiplas entidades
✅ Performance: Carregamento assíncrono e hooks otimizados
✅ UX: Interface responsiva com tema Rick & Morty autêntico
--------------------------------------------------------