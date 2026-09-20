# PLAN.md — Portfólio Profissional Full Stack

> **Objetivo principal:** publicar rapidamente um portfólio profissional, visualmente forte, simples de manter e tecnicamente consistente, que transforme visitas vindas de LinkedIn, GitHub e candidaturas em **interesse → contato → entrevista**.
>
> O portfólio não deve tentar provar conhecimento por quantidade de infraestrutura. Ele deve provar competência por **clareza, código bem organizado, bons casos reais, decisões técnicas justificadas e acabamento visual**.

---

# 0. Regra principal do projeto

## O portfólio é o produto. A arquitetura é suporte.

A prioridade é mostrar, nesta ordem:

1. quem é Matheus Felix;
2. que atua como Desenvolvedor Full Stack;
3. quais problemas já resolveu;
4. quais projetos reais comprovam sua experiência;
5. quais tecnologias domina;
6. como entrar em contato.

**Não atrasar o lançamento para construir CMS, backend separado, banco de dados, autenticação ou infraestrutura que não seja necessária para o portfólio público.**

O repositório também fará parte da apresentação profissional. Portanto, ele deve ser:

- simples de entender;
- fácil de executar;
- tipado;
- organizado;
- documentado;
- responsivo;
- acessível;
- sem complexidade artificial.

---

# 1. Objetivo profissional

O objetivo deste projeto é aumentar a qualidade da apresentação profissional de Matheus Felix para processos seletivos de desenvolvimento de software.

O visitante deve entender em poucos segundos:

- **Matheus Felix**
- **Desenvolvedor Full Stack**
- experiência profissional em desenvolvimento desde 2022;
- atuação com frontend, backend, dados e deploy;
- experiência com sistemas utilizados em contexto profissional real;
- stack principal;
- projetos em destaque;
- links profissionais;
- forma de contato.

## Narrativa esperada

```text
LinkedIn / GitHub / candidatura
            ↓
        Portfólio
            ↓
   Quem é Matheus?
            ↓
     O que ele faz?
            ↓
 Já construiu algo real?
            ↓
         GET DOC
            ↓
 Qual foi sua participação?
            ↓
 Como resolve problemas?
            ↓
     Deixa na Conta
            ↓
 Experiência + Stack
            ↓
 Currículo + GitHub
            ↓
         Contato
```

---

# 2. Fonte de verdade

Usar somente informações sustentadas pelo currículo, pelo material fornecido e por informações posteriormente confirmadas por Matheus.

## Informações confirmadas no material atual

### Posicionamento

**Desenvolvedor Full Stack**

### Experiência

- Desenvolvimento profissional desde 2022.
- Experiência com frontend, backend, banco de dados e deploy.

### Tecnologias citadas

#### Frontend

- React
- Next.js
- TypeScript
- JavaScript
- HTML
- CSS
- SCSS
- SPA
- componentização

#### Backend

- Node.js
- Java
- Spring Boot
- REST
- JWT
- MVC

#### Dados

- PostgreSQL
- MySQL
- SQL

#### Engenharia

- Docker
- Git
- Git Flow

### Formação

- Análise e Desenvolvimento de Sistemas.
- Previsão de conclusão: início de 2029.

### Experiência profissional citada

- Desenvolvedor Web — Apatec — jul/2022 a out/2023
- Agente de Processos e Negócios — NeoBPO — jul/2024 a jul/2025
- Desenvolvedor Frontend — islands — set/2025 a jun/2026

### Projeto: GET DOC

Informações sustentadas:

- sistema de registro e tabulação de atendimentos;
- utilizado em contexto profissional real;
- 90 atendentes;
- mais de 3.000 atendimentos registrados diariamente;
- participação em frontend, backend, dados e deploy;
- código proprietário;
- código não disponível publicamente por política da empresa.

### Projeto: Deixa na Conta

Informações atualizadas pelas anotações fornecidas por Matheus:

- aplicação de gestão financeira e de clientes, cobranças e pagamentos;
- atuação em autenticação, configurações de conta, assinaturas, visualização de clientes e compartilhamento de cobranças;
- distinguir funcionalidades do produto, contribuições individuais e entregas colaborativas;
- Next.js, React, TypeScript, PostgreSQL, Auth0 e libphonenumber-js;
- caso técnico: evolução do fluxo de configurações da conta;
- código-fonte privado, sem links para PRs ou issues privadas;
- deploy, infraestrutura, imagens autorizadas e detalhes adicionais da DataTable ainda precisam de confirmação.

As anotações substituem o relato anterior de otimização de UPDATEs no MySQL.
Não há evidência suficiente para esse caso de performance ou para atribuir atuação da modelagem ao deploy.

## Regra absoluta de conteúdo

**Nunca inventar:**

- senioridade;
- anos de experiência além dos fatos;
- métricas;
- usuários;
- clientes;
- tecnologias;
- certificados;
- performance;
- ganho percentual;
- uptime;
- latência;
- projetos;
- cargo;
- atribuições;
- resultados;
- links;
- repositórios;
- demonstrações.

Quando faltar informação, escrever:

```text
TODO: confirmar informação com Matheus.
```

---

# 3. Estratégia de escopo

Este projeto será dividido em duas camadas.

## Camada A — MVP para publicação

Obrigatória.

Inclui:

- Home;
- páginas de projetos;
- currículo;
- contato;
- modo light/dark/system;
- responsividade;
- SEO;
- acessibilidade;
- README;
- CI;
- deploy.

## Camada B — melhorias futuras

Não bloquear o lançamento.

Pode incluir posteriormente:

- formulário de contato com Server Action;
- analytics;
- mais projetos;
- testes E2E;
- conteúdo dinâmico;
- CMS;
- banco de dados;
- autenticação;
- API própria.

**O MVP não precisa de CMS, banco de dados ou backend separado.**

---

# 4. Arquitetura técnica escolhida

## Stack principal

```text
Next.js
React
TypeScript
App Router
Server Components
Client Components somente quando necessários
CSS / SCSS
Git
GitHub Actions
Vercel ou plataforma equivalente
```

## Decisão arquitetural

Usar **uma única aplicação Next.js**, sem monorepo e sem API Node separada no MVP.

Estrutura conceitual:

```text
Browser
   ↓
Next.js App Router
   ├── Server Components
   ├── Client Components
   ├── conteúdo tipado local
   └── metadata / SEO
```

### Por quê?

Porque este portfólio não precisa de uma arquitetura distribuída para cumprir seu objetivo.

Essa abordagem demonstra:

- domínio de Next.js;
- domínio de React;
- domínio de TypeScript;
- compreensão da separação client/server;
- componentização;
- boas práticas;
- SEO;
- performance;
- organização de projeto.

Sem adicionar complexidade que não gera valor para o visitante.

---

# 5. Regra de Server e Client Components

## Server Components

Usar como padrão.

Páginas, layouts, conteúdo, projetos, experiência, stack e currículo devem permanecer no servidor sempre que não precisarem de estado ou APIs do navegador.

Exemplos:

```text
app/page.tsx
app/projetos/[slug]/page.tsx
app/curriculo/page.tsx
app/contato/page.tsx
components/project-card.tsx
components/experience-timeline.tsx
```

Não adicionar `"use client"` nesses arquivos sem necessidade.

## Client Components

Usar apenas nas partes interativas.

Exemplos adequados:

```text
ThemeToggle
MobileMenu
ImageGallery
CopyEmailButton
ProjectFilter   // somente se existir necessidade real
```

Esses componentes podem usar:

```ts
"use client";
```

## `use server`

Não usar apenas para “mostrar” que conhece.

Adicionar somente quando existir uma ação legítima no servidor.

Exemplo futuro:

```text
Formulário de contato
        ↓
Server Action
        ↓
validação
        ↓
serviço de envio configurado
```

Se o formulário não existir no MVP, não criar uma Server Action artificial.

---

# 6. Estrutura do projeto

Estrutura recomendada:

```text
portfolio/
├── public/
│   ├── images/
│   │   ├── projects/
│   │   └── profile/
│   ├── documents/
│   │   └── cv.pdf
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.scss
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   │
│   │   ├── projetos/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── curriculo/
│   │   │   └── page.tsx
│   │   │
│   │   └── contato/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── mobile-menu.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── hero.tsx
│   │   │   ├── featured-projects.tsx
│   │   │   ├── about.tsx
│   │   │   ├── experience.tsx
│   │   │   ├── stack.tsx
│   │   │   └── final-cta.tsx
│   │   │
│   │   ├── project/
│   │   │   ├── project-card.tsx
│   │   │   ├── project-meta.tsx
│   │   │   ├── project-gallery.tsx
│   │   │   └── architecture-block.tsx
│   │   │
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       ├── container.tsx
│   │       ├── section.tsx
│   │       ├── heading.tsx
│   │       ├── tech-list.tsx
│   │       ├── theme-toggle.tsx
│   │       └── copy-email-button.tsx
│   │
│   ├── content/
│   │   ├── profile.ts
│   │   ├── experience.ts
│   │   ├── stack.ts
│   │   └── projects.ts
│   │
│   ├── types/
│   │   └── portfolio.ts
│   │
│   └── lib/
│       ├── projects.ts
│       └── metadata.ts
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .env.example
├── eslint.config.*
├── next.config.*
├── package.json
├── tsconfig.json
└── README.md
```

## Regra de organização

Não criar pasta ou abstração antes de existir necessidade real.

O objetivo é que outro desenvolvedor consiga entender o projeto rapidamente.

---

# 7. Conteúdo tipado

Os projetos devem ser armazenados em TypeScript, sem banco de dados no MVP.

Exemplo conceitual:

```ts
type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  role: string;
  status: string;
  featured: boolean;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  proprietary?: boolean;
  images?: ProjectImage[];
};
```

## Benefícios

- tipagem;
- simplicidade;
- conteúdo versionado no Git;
- fácil manutenção;
- sem banco desnecessário;
- sem painel administrativo;
- build previsível.

---

# 8. Rotas públicas

```text
/                    Home
/projetos/[slug]     Case study
/curriculo           Currículo em HTML
/contato             Contato
```

Não criar páginas sem função clara.

---

# 9. Home

A Home deve ser curta, visualmente forte e orientada a leitura rápida.

## Ordem

1. Header
2. Hero
3. Projetos selecionados
4. Sobre
5. Experiência
6. Stack
7. CTA final
8. Footer

---

# 10. Header

Conteúdo:

```text
Matheus Felix
Projetos
Experiência
Currículo
Contato
Theme toggle
```

Regras:

- simples;
- sticky somente se ficar visualmente melhor;
- menu mobile acessível;
- sem mega menu;
- sem excesso de links.

---

# 11. Hero

## Objetivo

Em até poucos segundos, responder:

```text
Quem é?
O que faz?
Que tipo de trabalho entrega?
Onde vejo provas?
```

## Conteúdo

```text
Matheus Felix

Desenvolvedor Full Stack

Construo aplicações web do frontend ao backend,
transformando necessidades reais em sistemas
funcionais, organizados e sustentáveis.
```

CTA principal:

```text
Ver projetos
```

CTA secundário:

```text
Ver currículo
```

Links discretos:

- GitHub
- LinkedIn
- Email

Campos ainda pendentes:

```text
TODO: GitHub
TODO: LinkedIn
TODO: email
TODO: localização, se desejar exibir
TODO: disponibilidade profissional
```

## Visual

O hero deve ter bastante espaço negativo.

Evitar:

- terminal;
- animação de texto digitando;
- chuva de partículas;
- cards flutuantes;
- dezenas de badges;
- ilustração genérica de programador;
- frases como “transformando café em código”.

---

# 12. Projetos selecionados

Mostrar primeiro os projetos que melhor demonstram experiência real.

## Projeto 1 — GET DOC

Prioridade máxima.

Card deve conter:

- nome;
- descrição curta;
- contexto profissional;
- stack divulgável;
- indicação de projeto proprietário;
- CTA para case study.

Texto base:

> Sistema de registro e tabulação de atendimentos utilizado em contexto profissional real, com 90 atendentes e mais de 3.000 atendimentos registrados diariamente.

Mensagem de confidencialidade:

> Projeto proprietário. O código não está disponível publicamente por política da empresa.

Não inventar link de GitHub.

## Projeto 2 — Deixa na Conta

Card deve conter:

- nome;
- descrição curta;
- stack confirmada;
- participação;
- CTA para case study;
- GitHub e demo somente se existirem.

Texto base:

> Aplicação de gestão financeira e de clientes, com controle de cobranças e pagamentos.

Destaque:

> Evolução de autenticação, configurações de conta e compartilhamento de cobranças, com participação em entregas colaborativas.

Não informar ganho percentual sem dado real.

---

# 13. Sobre

Máximo de 2 ou 3 parágrafos.

Conteúdo deve comunicar:

- trajetória;
- atuação frontend e backend;
- experiência com sistemas reais;
- preocupação com manutenção;
- qualidade;
- performance;
- colaboração;
- evolução profissional.

Evitar autobiografia longa.

Evitar repetir literalmente o currículo.

---

# 14. Experiência

Usar timeline visual simples.

## Itens confirmados

```text
jul/2022 — out/2023
Desenvolvedor Web
Apatec

jul/2024 — jul/2025
Agente de Processos e Negócios
NeoBPO

set/2025 — jun/2026
Desenvolvedor Frontend
islands
```

Não adicionar cargo atual que não esteja confirmado.

Cada experiência pode ter no máximo 2–4 bullets com fatos sustentados pelo currículo.

---

# 15. Stack

Evitar “skill bars”, estrelas ou porcentagens.

## Frontend

```text
React
Next.js
TypeScript
JavaScript
HTML
CSS
SCSS
```

## Backend

```text
Node.js
Java
Spring Boot
REST
```

## Dados

```text
PostgreSQL
MySQL
SQL
```

## Engenharia

```text
Docker
Git
Git Flow
JWT
MVC
```

## Apresentação visual

Preferir texto bem tipografado ou pequenos chips.

Não transformar a seção em uma “parede de logos”.

---

# 16. Case Study — GET DOC

Esta é a principal evidência profissional do portfólio.

## Estrutura

### 1. Hero

Mostrar:

- GET DOC;
- definição funcional;
- contexto profissional;
- status;
- aviso de confidencialidade;
- tecnologias confirmadas e divulgáveis.

### 2. Contexto

Explicar o problema operacional que a solução atende.

Sem expor informações confidenciais.

### 3. Escala confirmada

```text
90
atendentes

3.000+
atendimentos registrados diariamente
```

### 4. Minha atuação

Texto base:

> Participei do desenvolvimento da solução de ponta a ponta, atuando desde a modelagem dos dados até o desenvolvimento do frontend, backend e processo de deploy.

### 5. Solução

Explicar:

- fluxo principal;
- como o sistema é utilizado;
- decisões relevantes;
- responsabilidades assumidas.

Somente com informações confirmadas.

### 6. Arquitetura

Mostrar apenas a arquitetura real.

Exemplo visual permitido quando corresponder ao sistema real:

```text
Frontend
   ↓
API
   ↓
Backend
   ↓
Banco de dados
```

### 7. Stack

```text
TODO: confirmar tecnologias divulgáveis específicas do GET DOC.
```

### 8. Imagens

Se screenshots reais puderem ser divulgados:

- desktop;
- mobile;
- telas importantes.

Se não puderem:

- mock visual;
- diagrama abstrato;
- wireframe recriado;
- dados totalmente fictícios e claramente demonstrativos.

Nunca expor dados reais ou confidenciais.

### 9. Código

Exibir:

> Código proprietário — não disponível publicamente por política da empresa.

---

# 17. Case Study — Deixa na Conta

## Estrutura

1. Hero
2. Contexto
3. Problema
4. Solução
5. Minha atuação
6. Arquitetura
7. Stack
8. Caso técnico
9. Imagens
10. Links

## Caso técnico — evolução do fluxo de configurações da conta

Criar seção técnica específica.

### Problema

O fluxo de configurações acumulava responsabilidades do formulário, regras de negócio, atualização dos dados e comunicação com o servidor.

### Investigação

Foram identificados tratamentos manuais e responsabilidades que poderiam ser melhor distribuídas, além da necessidade de tratar valores ausentes, telefone, autenticação, atualização da interface e operações assíncronas.

### Correção

Reorganização entre interface, casos de uso, actions e dados; uso dos dados da conta como valores iniciais; redução de resets manuais; tratamento assíncrono, feedback visual e refinamento de models/schemas.

### Resultado

Fluxo mais organizado, responsabilidades mais definidas e menos manipulação manual do estado do formulário. O caminho dos dados entre interface, regras de negócio e persistência ficou mais claro.

Não atribuir ganhos de velocidade ou métricas de performance. Usar PostgreSQL e não assumir padrões formais de arquitetura sem confirmação. Manter referências de PRs/commits somente nas anotações internas.

---

# 18. Currículo

Rota:

```text
/curriculo
```

O currículo deve funcionar em HTML mesmo sem baixar PDF.

## Seções

- resumo;
- stack;
- experiência;
- formação;
- projetos;
- certificações, se existirem;
- idiomas, se existirem;
- links.

CTA:

```text
Baixar currículo em PDF
```

Arquivo:

```text
/public/documents/cv.pdf
```

Se o PDF ainda não existir:

```text
TODO: adicionar CV final.
```

---

# 19. Contato

Rota:

```text
/contato
```

Conteúdo:

```text
Vamos conversar?

TODO: email
TODO: LinkedIn
TODO: GitHub
TODO: localização, se desejar
TODO: disponibilidade
```

## MVP

Não precisa de formulário.

Um link de email + LinkedIn é suficiente.

## Evolução opcional

Se posteriormente for criado formulário:

- implementar com Server Action;
- validar no servidor;
- estado de envio claro;
- proteção contra spam;
- não armazenar mensagem sem necessidade.

---

# 20. Direção visual

## Conceito

**Minimalismo editorial + engenharia de software.**

Sensação desejada:

```text
Portfólio profissional
+
produto digital premium
+
interface de desenvolvedor madura
```

Não parecer:

- template genérico;
- landing page de criptomoeda;
- dashboard SaaS fictício;
- “site de programador” carregado de efeitos.

## Light

Base:

- off-white;
- areia;
- cinza muito claro;
- grafite.

Accent:

- escolher **uma** cor principal.

Sugestões já presentes no plano original:

- azul petróleo;
- verde musgo;
- laranja queimado.

## Dark

Não usar preto absoluto como fundo principal.

Base sugerida:

```text
#111111
#161616
#1C1C1C
```

Texto:

- branco quebrado;
- cinza claro;
- contraste acessível.

## Tipografia

Interface:

```text
Geist
```

Alternativas:

```text
Inter
system-ui
```

Monospace somente para elementos técnicos pontuais.

Não usar monospace no site inteiro.

---

# 21. Design System

Criar apenas o necessário.

## Tokens

- cores;
- foreground/background;
- accent;
- border;
- muted;
- spacing;
- radius;
- shadows;
- content width;
- breakpoints;
- typography.

## Componentes base

```text
Button
Container
Section
Heading
Badge
TechList
ProjectCard
ProjectMeta
Timeline
CTA
Header
Footer
ThemeToggle
ImageGallery
```

Regra:

> Se um componente é usado uma única vez e não possui complexidade própria, não abstrair prematuramente.

---

# 22. Responsividade

Design deve nascer responsivo.

Validar pelo menos:

- mobile pequeno;
- mobile grande;
- tablet;
- notebook;
- desktop.

Prioridades:

- Hero;
- navegação;
- cards de projetos;
- timeline;
- stack;
- cases;
- imagens;
- currículo;
- CTA.

Evitar depender de hover para informação essencial.

---

# 23. Acessibilidade

Obrigatório:

- HTML semântico;
- headings em ordem;
- navegação por teclado;
- foco visível;
- contraste;
- `alt` adequado;
- labels;
- botões com nomes acessíveis;
- links identificáveis;
- `aria-*` somente quando necessário;
- `prefers-reduced-motion`;
- área de toque adequada no mobile.

---

# 24. Performance

Objetivo: primeira impressão rápida.

## Regras

- Server Components por padrão;
- reduzir JavaScript no cliente;
- `next/image` para imagens;
- `next/font`;
- imagens dimensionadas corretamente;
- lazy loading quando adequado;
- evitar bibliotecas grandes por efeitos triviais;
- evitar vídeo de fundo;
- evitar animações pesadas;
- evitar dependências sem função clara.

---

# 25. SEO

Implementar no MVP:

- `metadata`;
- título por página;
- descrição;
- metadata específica de projeto;
- Open Graph;
- Twitter/X card quando aplicável;
- favicon;
- canonical;
- `sitemap.ts`;
- `robots.ts`.

Exemplos:

```text
Matheus Felix — Desenvolvedor Full Stack
GET DOC — Matheus Felix
Deixa na Conta — Matheus Felix
Currículo — Matheus Felix
```

---

# 26. Dark / Light / System

Oferecer:

```text
Light
Dark
System
```

`ThemeToggle` pode ser Client Component.

Requisitos:

- sem flash visual perceptível;
- preferência persistida;
- respeitar sistema por padrão;
- transição discreta;
- contraste válido nos dois temas.

---

# 27. GitHub como parte do portfólio

O repositório do portfólio deve ser apresentável em entrevista técnica.

## Repositório

Nome sugerido:

```text
portfolio
```

ou

```text
matheusfelix.dev
```

Não é obrigatório usar esses nomes.

## README

O README deve conter:

1. screenshot do projeto;
2. descrição em 2–4 linhas;
3. link de produção;
4. stack;
5. principais decisões;
6. estrutura;
7. instalação;
8. scripts;
9. arquitetura;
10. acessibilidade/performance;
11. deploy.

## Repositório fixado

Depois de publicado, fixar o portfólio entre os repositórios principais do perfil do GitHub.

Também priorizar nos pins:

- Deixa na Conta, se público;
- outros projetos públicos realmente bons.

## Qualidade visual do repositório

Adicionar:

- descrição;
- website;
- topics relevantes;
- social preview;
- README claro.

---

# 28. CI

Criar workflow simples com GitHub Actions.

Em pull request e push principal:

```text
install
  ↓
lint
  ↓
typecheck
  ↓
test (quando houver)
  ↓
build
```

Não criar pipeline complexo.

---

# 29. Testes

O portfólio não precisa buscar cobertura artificial.

## MVP

Prioridade:

- funções utilitárias relevantes;
- regressões de lógica;
- build;
- typecheck;
- lint.

## Opcional

E2E para:

```text
Home → projeto
Home → currículo
Home → contato
Theme toggle
Menu mobile
```

Não atrasar publicação por testes pouco relevantes.

---

# 30. README como demonstração técnica

O README deve explicar brevemente:

## Por que Next.js?

Porque o projeto pode aproveitar:

- App Router;
- Server Components;
- metadata;
- otimização de imagens;
- geração de páginas;
- roteamento;
- deploy simples.

## Por que não há backend separado?

Porque o MVP não possui regra de negócio que justifique outro serviço.

## Por que não há banco de dados?

Porque o conteúdo é pequeno, versionado e controlado pelo próprio desenvolvedor.

## Por que Server Components?

Para manter páginas essencialmente de conteúdo no servidor e reduzir JavaScript enviado ao navegador.

## Quando usar Client Components?

Somente nas interações que realmente dependem do browser.

Essas decisões devem demonstrar critério técnico, não limitação.

---

# 31. Critérios visuais

O site deve passar sensação de projeto autoral.

## Evitar

- excesso de cards;
- glassmorphism em toda parte;
- gradientes aleatórios;
- neon;
- partículas;
- cursor customizado;
- terminal gigante;
- animação de digitação;
- 3D sem função;
- scroll hijacking;
- carrossel automático;
- badges demais;
- ícones sem necessidade;
- loading artificial;
- textos gerados com tom genérico.

## Buscar

- boa hierarquia;
- grid consistente;
- tipografia forte;
- espaço negativo;
- contraste;
- leitura confortável;
- detalhes pequenos e precisos;
- transições discretas;
- projetos grandes visualmente;
- imagens de boa qualidade.

---

# 32. Conteúdo antes de efeitos

Antes de polir animações, garantir:

```text
[ ] nome
[ ] headline
[ ] resumo
[ ] email
[ ] GitHub
[ ] LinkedIn
[ ] CV
[ ] experiências
[ ] stack
[ ] GET DOC
[ ] Deixa na Conta
[ ] imagens permitidas
[ ] links públicos
```

Qualquer informação ausente deve continuar como `TODO`.

---

# 33. Milestones de implementação

O plano deve ser executado em pequenas etapas.

Cada milestone precisa terminar com o projeto executável.

---

## Milestone 1 — Bootstrap

```text
TASK-001 Criar aplicação Next.js com App Router e TypeScript
TASK-002 Ativar TypeScript strict
TASK-003 Configurar lint
TASK-004 Configurar SCSS/CSS global
TASK-005 Criar estrutura src/
TASK-006 Criar layout raiz
TASK-007 Configurar fonte
TASK-008 Criar conteúdo tipado inicial
TASK-009 Criar .env.example somente se necessário
TASK-010 Criar README inicial
```

### Definition of Done

```text
[ ] npm/pnpm install funciona
[ ] dev funciona
[ ] lint passa
[ ] typecheck passa
[ ] build passa
```

---

## Milestone 2 — Design System mínimo

```text
TASK-011 Criar tokens
TASK-012 Criar tema light
TASK-013 Criar tema dark
TASK-014 Criar modo system
TASK-015 Criar Container
TASK-016 Criar Section
TASK-017 Criar Heading
TASK-018 Criar Button
TASK-019 Criar Badge
TASK-020 Criar Header
TASK-021 Criar Footer
TASK-022 Criar ThemeToggle
```

### Definition of Done

```text
[ ] componentes acessíveis
[ ] responsivos
[ ] visual coerente
[ ] sem abstrações desnecessárias
```

---

## Milestone 3 — Home

```text
TASK-023 Implementar Hero
TASK-024 Implementar projetos selecionados
TASK-025 Implementar Sobre
TASK-026 Implementar Experiência
TASK-027 Implementar Stack
TASK-028 Implementar CTA final
TASK-029 Revisar Header/Footer
TASK-030 Validar mobile
```

### Definition of Done

```text
[ ] visitante entende quem é Matheus
[ ] posicionamento Full Stack está claro
[ ] projetos aparecem acima da dobra ou logo depois
[ ] links principais funcionam
[ ] mobile validado
```

---

## Milestone 4 — Cases

```text
TASK-031 Criar rota /projetos/[slug]
TASK-032 Criar template de case
TASK-033 Implementar GET DOC
TASK-034 Implementar Deixa na Conta
TASK-035 Criar galeria
TASK-036 Criar bloco de arquitetura
TASK-037 Revisar confidencialidade
TASK-038 Criar metadata por projeto
```

### Definition of Done

```text
[ ] GET DOC funciona como principal case
[ ] métricas são somente as confirmadas
[ ] nenhum dado confidencial exposto
[ ] links inexistentes não são exibidos
```

---

## Milestone 5 — Currículo e contato

```text
TASK-039 Criar /curriculo
TASK-040 Adicionar experiência
TASK-041 Adicionar formação
TASK-042 Adicionar stack
TASK-043 Adicionar projetos
TASK-044 Adicionar download CV
TASK-045 Criar /contato
TASK-046 Adicionar links profissionais
```

---

## Milestone 6 — SEO, acessibilidade e performance

```text
TASK-047 Criar metadata global
TASK-048 Criar Open Graph
TASK-049 Criar sitemap.ts
TASK-050 Criar robots.ts
TASK-051 Revisar semântica HTML
TASK-052 Revisar teclado/foco
TASK-053 Revisar contraste
TASK-054 Revisar imagens
TASK-055 Revisar bundle/client components
TASK-056 Revisar Core Web Vitals
```

---

## Milestone 7 — GitHub e publicação

```text
TASK-057 Criar README final
TASK-058 Adicionar screenshot do site
TASK-059 Criar GitHub Actions CI
TASK-060 Rodar lint
TASK-061 Rodar typecheck
TASK-062 Rodar build
TASK-063 Revisar links
TASK-064 Revisar TODOs
TASK-065 Configurar deploy
TASK-066 Configurar domínio se disponível
TASK-067 Smoke test em produção
TASK-068 Fixar repositório no perfil
```

---

# 34. Melhorias opcionais pós-lançamento

Somente depois do MVP estar publicado.

## Opcional A — Formulário de contato

Pode demonstrar `use server` de forma natural.

Fluxo:

```text
ContactForm
   ↓
Server Action
   ↓
Validation
   ↓
Email provider
   ↓
Success / Error
```

Não adicionar sem configurar envio real.

## Opcional B — Analytics

Medir somente:

- visualização de projeto;
- clique no GitHub;
- clique no LinkedIn;
- download do CV;
- clique em contato.

Evitar rastreamento invasivo.

## Opcional C — CMS

Só criar se existir necessidade real de atualizar conteúdo frequentemente.

Não usar CMS apenas como demonstração técnica.

## Opcional D — Backend/API

Adicionar somente se um requisito novo justificar.

Se o objetivo for demonstrar backend, é melhor que um **projeto de produto real** faça isso do que transformar o portfólio em uma API artificial.

---

# 35. Critérios de aceite

## Em 10 segundos

O visitante entende:

- nome;
- função;
- proposta profissional;
- onde ver projetos;
- onde entrar em contato.

## Em 30 segundos

O visitante identifica:

- stack principal;
- experiência;
- projetos mais fortes.

## Em 1 minuto

O visitante consegue abrir:

- GET DOC;
- Deixa na Conta;
- currículo.

## Em 3 minutos

O visitante entende ao menos um case com:

- contexto;
- problema;
- participação;
- solução;
- tecnologia;
- resultado sustentado por fatos.

## Critério principal

> O recrutador deve lembrar do profissional e dos projetos, não de um efeito visual ou de uma arquitetura desnecessária.

---

# 36. Definition of Done do projeto

```text
[ ] Home clara
[ ] Hero forte
[ ] GET DOC destacado
[ ] Deixa na Conta publicado
[ ] experiência correta
[ ] stack correta
[ ] currículo acessível
[ ] contato fácil
[ ] GitHub acessível
[ ] LinkedIn acessível
[ ] responsivo
[ ] light/dark/system
[ ] acessível por teclado
[ ] metadata
[ ] sitemap
[ ] robots
[ ] Open Graph
[ ] imagens otimizadas
[ ] lint passa
[ ] typecheck passa
[ ] build passa
[ ] CI passa
[ ] README completo
[ ] deploy funcionando
[ ] nenhum link falso
[ ] nenhuma tecnologia inventada
[ ] nenhuma métrica inventada
[ ] nenhum dado confidencial exposto
```

---

# 37. Regras obrigatórias para o agente de código

Ao usar IA para implementar este projeto:

1. Ler este arquivo antes de alterar código.
2. Não implementar todos os milestones de uma vez.
3. Inspecionar o repositório antes de modificar.
4. Preservar código correto já existente.
5. Preferir Server Components.
6. Adicionar `"use client"` apenas quando necessário.
7. Não adicionar `"use server"` artificialmente.
8. Não inventar informações profissionais.
9. Não inventar tecnologias.
10. Não inventar métricas.
11. Não criar links falsos.
12. Não criar abstrações sem necessidade.
13. Não instalar dependências sem justificar.
14. Não criar backend separado no MVP.
15. Não criar banco no MVP.
16. Não criar CMS no MVP.
17. Não expor dados confidenciais do GET DOC.
18. Usar `TODO` quando faltar informação.
19. Manter TypeScript strict.
20. Evitar `any`.
21. Manter componentes pequenos e legíveis.
22. Garantir responsividade.
23. Garantir acessibilidade.
24. Depois de cada milestone executar:
    - lint;
    - typecheck;
    - testes existentes;
    - build quando aplicável.
25. Corrigir erros antes de avançar.
26. Manter o projeto executável após cada etapa.
27. Informar arquivos criados e alterados.
28. Informar decisões técnicas relevantes.
29. Não afirmar que algo funciona antes de validar.
30. Não avançar para melhorias opcionais antes do MVP estar funcional.

---

# 38. Prompt inicial recomendado para a IA

```text
Leia o arquivo PLAN.md inteiro antes de alterar qualquer arquivo.

Objetivo:
construir um portfólio profissional de Desenvolvedor Full Stack
com Next.js App Router + TypeScript, simples, visualmente forte,
responsivo, acessível e apresentável em uma entrevista técnica.

Regras:
- não implemente o projeto inteiro de uma vez;
- não invente conteúdo;
- não invente métricas;
- não invente tecnologias;
- não crie backend separado;
- não crie banco de dados;
- não crie CMS;
- prefira Server Components;
- use "use client" somente onde houver interação real;
- não use "use server" apenas para demonstrar conhecimento;
- preserve qualquer código existente que já esteja correto.

Primeiro:
1. inspecione o repositório;
2. descreva brevemente o estado atual;
3. informe quais arquivos pretende criar ou alterar;
4. implemente somente o Milestone 1 — Bootstrap.

Depois:
- rode lint;
- rode typecheck;
- rode testes existentes;
- rode build;
- corrija os erros encontrados;
- informe os arquivos criados/alterados;
- informe o próximo milestone sem implementá-lo.
```

---

# 39. Prompt para cada milestone seguinte

```text
Leia PLAN.md e o estado atual do projeto.

Implemente somente o próximo milestone ainda não concluído.

Antes de editar:
- verifique o que já existe;
- preserve o que estiver correto;
- não aumente o escopo;
- não instale dependências sem necessidade.

Durante a implementação:
- mantenha TypeScript strict;
- prefira Server Components;
- limite Client Components às interações reais;
- mantenha design responsivo e acessível;
- não invente dados profissionais.

Ao terminar:
- rode lint;
- rode typecheck;
- rode testes existentes;
- rode build;
- corrija os erros;
- resuma alterações;
- liste TODOs restantes;
- pare antes do milestone seguinte.
```

---

# 40. Prioridade se o tempo ficar curto

Preservar nesta ordem:

1. Hero
2. Projetos selecionados
3. GET DOC
4. Deixa na Conta
5. Experiência
6. Stack
7. Currículo
8. Contato
9. Responsividade
10. Acessibilidade
11. SEO
12. README
13. CI
14. Analytics
15. Formulário
16. CMS
17. Backend separado

**O portfólio pode e deve ser publicado sem os últimos itens.**

---

# 41. Resultado esperado

O projeto final deve demonstrar que Matheus consegue:

- estruturar uma aplicação Next.js;
- trabalhar com TypeScript;
- entender a divisão entre servidor e cliente;
- componentizar interfaces;
- criar uma experiência responsiva;
- organizar conteúdo;
- documentar decisões;
- pensar em acessibilidade;
- pensar em SEO;
- pensar em performance;
- trabalhar com Git e CI;
- apresentar problemas reais que já resolveu.

Sem transformar o portfólio em uma demonstração artificial de infraestrutura.

> **A melhor evidência de maturidade técnica neste projeto não será a quantidade de ferramentas utilizadas. Será a qualidade das decisões.**
