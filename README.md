# Quadro Kanban (React + TypeScript)

Aplicação frontend de um Quadro Kanban desenvolvida em React para demonstrar organização de código, decisões arquiteturais e boas práticas (componentização, estado, tipagem, etc.).

---

## Requisitos

- **Node.js**: recomendado **>= 20.11**
  - Se você estiver preso em Node **20.11**, mantenha o projeto em **Vite 6** (Vite 7 exige Node mais novo).
- **Yarn** (ou npm/pnpm, mas os comandos abaixo usam Yarn)

---

## Como rodar localmente

```bash
# 1) Instalar dependências
yarn

# 2) Rodar em modo desenvolvimento
yarn dev

# build de produção
yarn build

# executar testes
yarn test
```

## Estrutura de pastas
```bash
src/
  api/          # Camada de integração com backend (WIP)
  css/          # Estilos
  components/   # componentes reutilizáveis
  domain/       # regras de negócio
  hooks/        # hooks reutilizáveis
  stores/       # estado global
  types/        # tipos compartilhados
  utils/        # funções utilitárias
```

## Decisões técnicas

### React + TypeScript
Escolhi TS para reduzir erros comuns em operações de estado (ex.: mover cards entre colunas) e manter o código mais legível à qualquer alteração.

### Organização por camadas
- UI (components): focada em renderização e eventos do usuário
- Domain: regras de negócio
- Data (api/mock): atualmente existe como mock, mas a estrutura já permite evoluir para uma API real com mudanças mínimas

### Drag n Drop
Por restrição de tempo, priorizei entrega funcional e clara.
Inicialmente a ideia era usar Tailwind, porém optei por CSS puro para reduzir setup/configuração e acelerar a implementação visual.

### Trade-offs
Alguns tradeoffs foram feitos, principalmente porque o prazo de entrega é curto, então precisava de algo mais "product oriented". Um dos pontos que foi mais afetado foi a questão do css. A ideia era usar o Tailwind, porém um css puro ia me fazer entregar valor mais rápido.

### Próximos Passos
- persistência (localStorage) ou integração real via api/
- extrair estilos repetidos em componentes (Button)
- Adicionar feature de criar um board com colunas customizadas
- i18n (internacionalização)


## Features implementadas

- Visualização do board com colunas e cards (layout estilo Kanban)
- Drag and Drop de cards
  - mover cards entre colunas
  - reordenar cards dentro da mesma coluna
- Estado do board em memória (atualização imediata na UI)
- Componentes reutilizáveis (ex.: Button, Card, Column, etc.)
- Tipagem forte do domínio (Board/Column/Card) com TypeScript
