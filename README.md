# Rick & Morty Universe Explorer 🛸

Uma aplicação web moderna desenvolvida em **TypeScript** e **React** que explora o multiverso infinito de Rick and Morty através de uma arquitetura orientada a objetos bem estruturada.

## 📋 Sobre o Projeto

Esta aplicação foi desenvolvida como trabalho final interdisciplinar dos componentes **Arquitetura de Software**, **Desenvolvimento Front-end II** e **Programação Orientada a Objetos II** do IFES Campus Santa Teresa.

O sistema consome dados da **API pública Rick and Morty**, integrando-os em uma estrutura orientada a objetos composta por classes de **Personagem**, **Episódio** e **Localização**.

## 🏗️ Arquitetura e Padrões

### Princípios SOLID Implementados

- **SRP (Single Responsibility Principle)**: Cada classe possui uma responsabilidade única
- **OCP (Open/Closed Principle)**: Entidades podem ser estendidas sem modificar código existente
- **LSP (Liskov Substitution Principle)**: Subclasses podem substituir superclasses sem afetar o funcionamento
- **ISP (Interface Segregation Principle)**: Interface `IPesquisavel` define contratos específicos
- **DIP (Dependency Inversion Principle)**: Dependência de abstrações, não de implementações concretas

### Padrões GRASP Aplicados

- **Controller**: `RickMortyController` centraliza operações de negócio
- **Expert**: Cada classe gerencia seus próprios dados e comportamentos
- **Baixo Acoplamento**: Sistema modular e independente
- **Alta Coesão**: Classes com funções bem definidas e organizadas
- **Polimorfismo**: Métodos polimórficos para operações genéricas

### Padrões de Projeto (Design Patterns)

- **Singleton**: `RickMortyController` garante instância única
- **Template Method**: `EntidadeBase` define estrutura comum
- **Strategy**: Diferentes estratégias de busca e filtro
- **Observer**: Hooks React para reatividade de estado
- **Composition**: Layout components para estrutura modular

## 🚀 Tecnologias Utilizadas

### Core
- **TypeScript**: Tipagem estática e segurança de código
- **React 19**: Biblioteca para interfaces reativas
- **Next.js 15**: Framework full-stack com App Router

### Styling & UI
- **SCSS**: Pré-processador CSS para estilização avançada
- **CSS Modules**: Escopamento de estilos
- **React Icons**: Biblioteca de ícones

### Development & Build
- **ESLint**: Linting e qualidade de código
- **Axios**: Cliente HTTP para consumo de APIs
- **React Spinners**: Componentes de loading

## 📁 Estrutura do Projeto

```
src/app/
├── componentes/           # Componentes React reutilizáveis
│   ├── CharacterCard/     # Cartão de personagem
│   ├── CharacterModal/    # Modal de detalhes do personagem
│   ├── EntityCard/        # Cartão genérico de entidade
│   ├── EpisodeModal/      # Modal de episódios
│   ├── FilterSelect/      # Seletor de filtros
│   ├── LocationCard/      # Cartão de localização
│   ├── NavBar/           # Barra de navegação
│   ├── SearchBar/        # Barra de busca
│   └── UniversalSearch/  # Busca universal
├── controllers/          # Lógica de negócio
│   └── RickMortyController.ts # Controller principal
├── hooks/               # Custom hooks React
│   └── useRickMortyData.ts    # Hook para gerenciar dados
├── interfaces/          # Contratos e interfaces
│   └── IPesquisavel.ts  # Interface para entidades pesquisáveis
├── models/             # Modelos de dados
│   ├── base/
│   │   └── EntidadeBase.ts    # Classe base para entidades
│   └── entities/
│       ├── Character.ts       # Modelo de personagem
│       ├── Episode.ts         # Modelo de episódio
│       └── Location.ts        # Modelo de localização
└── PG*/                # Páginas da aplicação
    ├── PGepisodios/    # Página de episódios
    ├── PGpersonagens/  # Página de personagens
    ├── PGplanetas/     # Página de localizações
    └── PGsobre/        # Página sobre o projeto
```

## 🔧 Funcionalidades

### Core Features
- **Busca Universal**: Pesquisa em todas as entidades simultaneamente
- **Filtros Avançados**: Filtro por tipo de entidade (personagens, episódios, localizações)
- **Navegação Intuitiva**: Roteamento entre diferentes seções
- **Interface Responsiva**: Adaptação para diferentes dispositivos
- **Loading States**: Estados de carregamento elegantes

### Operações CRUD
- **Create**: Adição de novas entidades ao catálogo local
- **Read**: Visualização detalhada de personagens, episódios e localizações
- **Update**: Atualização de informações das entidades
- **Delete**: Remoção de entidades do catálogo

### Funcionalidades Específicas
- **Visualização de Episódios**: Modal com detalhes dos episódios por personagem
- **Status Visual**: Indicadores visuais para status dos personagens (vivo/morto/desconhecido)
- **Contadores Dinâmicos**: Quantidade de episódios por personagem
- **Informações Detalhadas**: Origem, localização atual, espécie, gênero

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd codigo-fonte
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev        # Executa em modo desenvolvimento
npm run build      # Gera build de produção
npm run start      # Executa build de produção
npm run lint       # Executa linting do código
npm run clean      # Limpa arquivos temporários
npm run fresh      # Reinstala dependências
npm run type-check # Verificação de tipos TypeScript
npm run test:watch # Executa testes em modo watch
```

## 🧪 Testes

O projeto inclui testes de integração para o controller principal:

```bash
npm run test:watch
```

## 📖 Documentação do Código

Todo o código está amplamente documentado com:
- **JSDoc**: Documentação de funções e classes
- **Comentários explicativos**: Explicação de padrões e arquitetura
- **Type annotations**: Tipagem completa em TypeScript
- **Exemplos de uso**: Demonstrações práticas nos comentários

## 🎯 Objetivos Educacionais Alcançados

### Arquitetura de Software
- Aplicação de princípios SOLID e GRASP
- Implementação de padrões de projeto
- Estruturação modular e escalável

### Desenvolvimento Front-end
- Componentização React avançada
- Gerenciamento de estado com hooks
- Responsividade e UX/UI

### Programação Orientada a Objetos
- Herança e polimorfismo
- Encapsulamento e abstração
- Interfaces e contratos bem definidos

## 🌟 Destaques Técnicos

- **Performance**: Uso de `React.memo` e `useCallback` para otimizações
- **Acessibilidade**: Estrutura semântica e alt texts
- **Type Safety**: TypeScript para prevenção de erros
- **Modularidade**: Arquitetura facilmente extensível
- **Clean Code**: Código limpo e bem documentado

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do currículo do IFES Campus Santa Teresa.

---

*Desenvolvido com 💚 para explorar o multiverso infinito de Rick and Morty!*