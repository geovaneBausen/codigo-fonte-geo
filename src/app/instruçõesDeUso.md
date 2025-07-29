# Sobre o Projeto

Esta aplicação web foi desenvolvida como trabalho final interdisciplinar dos componentes Arquitetura de Software, Desenvolvimento Front-end II e Programação Orientada a Objetos II do IFES Campus Santa Teresa. O sistema consome dados da API pública Rick and Morty, integrando-os em uma estrutura orientada a objetos composta por classes de Personagem, Episódio e Localização. Utilizando TypeScript e React, o projeto explora conceitos de modelagem, como herança, associação entre entidades e polimorfismo, além de aplicar princípios SOLID e GRASP para garantir extensibilidade e organização do código.

**Princípios SOLID e GRASP aplicados:**

- **SRP:** Cada classe possui uma responsabilidade única, como o controlador centralizando a lógica de negócio e as entidades representando dados.
- **OCP:** As entidades e interfaces podem ser estendidas sem modificar o código existente, facilitando futuras expansões.
- **LSP:** As subclasses podem ser usadas no lugar das superclasses sem afetar o funcionamento do sistema.
- **ISP:** A interface IPesquisavel define contratos claros para busca, sem obrigar entidades a implementar métodos desnecessários.
- **DIP:** O controlador depende de abstrações (interfaces), não de implementações concretas.
- **Controller:** O RickMortyController centraliza as operações de negócio e manipulação das entidades.
- **Polimorfismo:** Métodos polimórficos permitem buscas e operações genéricas sobre diferentes tipos de entidades.
- **Expert:** Cada classe é responsável por gerenciar seus próprios dados e comportamentos.
- **Baixo Acoplamento:** O sistema é modular, facilitando manutenção e evolução.
- **Alta Coesão:** As classes e componentes possuem funções bem definidas e organizadas.

O controlador central implementa métodos polimórficos para busca, filtragem e gerenciamento das entidades, além de funcionalidades completas de CRUD. A interface IPesquisavel permite que qualquer entidade seja pesquisada por critérios dinâmicos, facilitando futuras extensões sem necessidade de modificar o código existente. O consumo da API é feito de forma assíncrona, armazenando os dados em memória e permitindo operações rápidas e seguras.

O front-end é componentizado, com navegação entre páginas distintas utilizando React Router e parâmetros de rota. A aplicação é responsiva, adaptando-se a diferentes dispositivos, e utiliza boas práticas de estilização para garantir uma experiência agradável ao usuário.

**Tecnologias utilizadas:**
- **TypeScript:** Linguagem que adiciona tipagem estática ao JavaScript, trazendo mais segurança e organização ao desenvolvimento.
- **React:** Biblioteca para construção de interfaces de usuário reativas e componentizadas.
- **Next.js:** Framework para React que facilita o desenvolvimento de aplicações web modernas, oferecendo renderização do lado do servidor (SSR), geração de páginas estáticas (SSG), roteamento automático e otimização de desempenho.

-Clonar repositorio e instalar dependencias

```bash
npm install
npm run dev
```