# Pokédex Explorer

Reconstrução do projeto original (do qual restou apenas o build do GitHub Pages) em **Vite + React + TypeScript**.

## Executar

Requer Node.js 22.12+ ou 24+.

```bash
npm ci
npm run dev
```

```bash
npm test
npm run build
npm run preview
```

## Recursos

- Catálogo nacional consultado na [PokéAPI](https://pokeapi.co/docs/v2/), com carregamento progressivo de 24 cartões.
- Busca por nome ou número (`pikachu`, `25`, `#0025`).
- Filtros combináveis de tipo e geração; ordenação por nome e número.
- Favoritos persistidos no navegador, sem necessidade de conta.
- Detalhes com altura, peso, habilidade, estatísticas, descrição e imagem shiny quando disponível. Descrições em inglês quando a API não oferece português.
- Pokémon aleatório, estados de carregamento, recuperação de erros e imagens alternativas quando indisponíveis.
- Requisições deduplicadas e respostas em cache durante a sessão.
- Interface responsiva, navegação por teclado, modal nativo e suporte a movimento reduzido.

## Hospedagem

Configure seu provedor com:

- Comando de instalação: `npm ci`
- Comando de build: `npm run build`
- Diretório de publicação: `dist`

Não é necessário backend nem chave de API. A configuração `base: './'` permite servir o aplicativo em domínio próprio ou subdiretório. Para testar o build localmente, execute `npm run preview`.

## Estrutura

- `src/api.ts`: tipos, cliente HTTP, cache e utilitários.
- `src/App.tsx`: catálogo, filtros, cartões e modal de detalhes.
- `src/styles.css`: sistema visual e layouts responsivos.

O aplicativo usa `src/` e `public/`. Os arquivos compilados são gerados em `dist/` pelo Vite e não precisam ser versionados.

Projeto de fã e de estudo. Pokémon e seus personagens pertencem a Nintendo, Creatures e GAME FREAK. Dados e artes fornecidos pelo ecossistema PokéAPI.
