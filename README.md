O projeto foi desenvolvido utilizando principalmente TypeScript, React e Next.js, compondo uma arquitetura moderna e robusta para aplicações web. O TypeScript foi adotado para trazer tipagem estática ao JavaScript, aumentando a confiabilidade do código e facilitando a manutenção, especialmente em projetos grandes e orientados a objetos. A estruturação das entidades, interfaces e controllers foi feita aproveitando ao máximo os recursos de tipagem e orientação a objetos que o TypeScript oferece.

React foi a biblioteca responsável pela construção da interface do usuário, com foco em componentização e reatividade. Todos os elementos de interface, como barra de navegação, filtros, cards de entidades e busca universal, foram criados como componentes reutilizáveis. O padrão de composição foi empregado através do RootLayout, que define a base comum para todas as páginas, garantindo uma experiência consistente e fácil de expandir.

O Next.js foi utilizado como framework para React, proporcionando recursos avançados como o App Router, renderização do lado do servidor (SSR), roteamento automático e otimização de desempenho. Isso permitiu que a aplicação fosse responsiva, rápida e amigável para mecanismos de busca. Além disso, o Next.js facilitou a organização das páginas e a separação clara entre frontend e lógica de negócio.

No backend da aplicação (lado do modelo e lógica), foi aplicada uma arquitetura orientada a objetos. As principais entidades - Personagem, Episódio e Localização - foram modeladas a partir de uma classe base abstrata chamada EntidadeBase, que implementa a interface IPesquisavel. Cada entidade concreta especializa e estende os métodos e propriedades herdados, respeitando princípios como SRP (responsabilidade única) e OCP (aberto/fechado).

Para centralizar as operações de negócio, foi criado o RickMortyController, um Singleton responsável por consumir a API pública Rick and Morty, armazenar os dados localmente, gerenciar operações CRUD e executar buscas polimórficas. O controller interage com as entidades via interfaces e abstrações, garantindo baixo acoplamento e alta coesão. Estratégias de busca e filtros são aplicadas diretamente pelo controller, seguindo o padrão Strategy.

No frontend, a comunicação entre os componentes e o controller é feita por meio de custom hooks, como o useRickMortyData. Esses hooks utilizam o padrão Observer para garantir reatividade: qualquer mudança nos dados é imediatamente refletida na interface. Dessa forma, os componentes permanecem desacoplados da lógica de negócio, focando apenas na apresentação visual.

A estilização da aplicação foi realizada com SCSS e CSS Modules, permitindo a criação de temas e estilos encapsulados para cada componente. Isso garantiu uma interface moderna, responsiva e de fácil manutenção. Além disso, bibliotecas como React Icons e React Spinners foram usadas para enriquecer a experiência visual e fornecer feedback ao usuário durante operações assíncronas, como carregamento de dados.

Por fim, o projeto aplicou princípios sólidos de design de software, como SOLID e GRASP, para garantir um código limpo, modular e extensível. O uso combinado de TypeScript, React, Next.js, padrões de projeto e boas práticas de arquitetura resultou em uma aplicação eficiente, fácil de evoluir e com ótima experiência para o usuário.

## 📁 Estrutura do Projeto

```
src/app/
├── componentes/           # Componentes React reutilizáveis
│   ├── CharacterCard/     # Cartão de personagem
│   ├── EntityCard/        # Cartão genérico de entidade
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
│             └── Alien.ts        
│             └── HUman.ts       
│       ├── Episode.ts         # Modelo de episódio
│       └── Location.ts        # Modelo de localização

└── PG*/                # Páginas da aplicação
    ├── PGepisodios/    # Página de episódios
    ├── PGpersonagens/  # Página de personagens
    ├── PGplanetas/     # Página de localizações
    └── PGsobre/        # Página sobre o projeto
```

### 
- **TypeScript**: Tipagem estática e segurança de código
- **React 19**: Biblioteca para interfaces reativas
- **Next.js 15**: Framework full-stack com App Router

## 🔧 Funcionalidades
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

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm 

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/geovaneBausen/codigo-fonte-geo.git
cd codigo-fonte-geo
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
npm run clean      # Limpa arquivos temporários
npm run fresh      # Reinstala dependências
npm run type-check # Verificação de tipos TypeScript
```
*Desenvolvido com 💚*
