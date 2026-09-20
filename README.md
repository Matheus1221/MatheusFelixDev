# Matheus Felix — Portfólio

Portfólio profissional com projetos reais, experiência, currículo e contato.
Uma aplicação Next.js com conteúdo local tipado, Server Components e temas
claro, escuro e sistema.

![Home no desktop, em tema claro](docs/screenshots/home-desktop.png)

<details>
<summary>Visualização mobile em tema escuro</summary>

<img src="docs/screenshots/home-mobile.png" alt="Home em tela de 375 pixels, com navegação e botões adaptados ao celular" width="375" />

</details>

Capturas reais do build de produção local em 1440 × 900 e 375 × 900px.
**Publicação em andamento:** projeto `matheus-felix-portfolio` configurado na
Vercel, no workspace MatheusDev (Hobby). A URL atribuída é
`https://matheus-felix-portfolio.vercel.app`; o primeiro deploy ainda precisa
ser confirmado. Consulte o [guia de publicação](docs/deployment.md).

## Estado do projeto

- Milestones 1 a 5 implementados: base, design system, Home, cases, currículo e contato.
- Milestone 6: SEO, layout, teclado, temas e medição de performance em laboratório revisados; limites da validação descritos abaixo.
- Milestone 7: README, screenshots e workflow de CI preparados; execução no GitHub, deploy e validação pública pendentes.
- Perfil em `src/data/profile.ts`, com os contatos fornecidos por Matheus.
- Experiências em andamento usam `endDate: null` ou omitem a propriedade.
- PDF e detalhes ainda não confirmados dos cases permanecem como TODO.

O [plans.md](plans.md) define o escopo e a arquitetura. Informações posteriormente
atualizadas por Matheus nos dados devem ser preservadas. As orientações de
manutenção estão em [AGENTS.md](AGENTS.md).

## Executar localmente

Requisitos: Node.js 22.x, a partir de 22.13, e npm. CI e Vercel usam Node.js 22.

```sh
npm ci
npm run dev
```

Acesse http://localhost:3000. O desenvolvimento funciona sem variáveis de ambiente.
A fonte Geist usa `next/font/google`: o build precisa acessar o Google Fonts;
as fontes são servidas pela aplicação ao visitante.

Para testar o build de produção:

```sh
npm run build
npm start
```

Em outro terminal, execute `npm run audit:site`. Para outra porta:

```sh
node scripts/audit-site.mjs http://localhost:3100
```

## Scripts e CI

| Comando | Função |
| --- | --- |
| `npm run dev` | Desenvolvimento com atualização automática |
| `npm run lint` | ESLint sem tolerar avisos |
| `npm run typecheck` | Tipos de rotas e TypeScript strict |
| `npm test` | Testes de tema, SEO e experiências em andamento |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção após o build |
| `npm run audit:site` | Auditoria HTTP local; aceita origem HTTPS com `--remote` |

O [workflow de CI](.github/workflows/ci.yml) executa `npm ci`, lint, typecheck,
testes, build e auditoria HTTP. É acionado em pushes na `main`, pull requests
para `main` e manualmente pelo GitHub Actions. Usa cache do npm, permissão
somente de leitura e encerra o servidor temporário após a auditoria.
Não requer secrets nem realiza deploy. O resultado remoto só pode ser confirmado
depois que o workflow estiver no GitHub e terminar uma execução.

## Stack e arquitetura

Next.js 16, React 19, TypeScript strict, CSS e Geist. O App Router organiza as
rotas. Server Components mantêm o conteúdo no servidor. Apenas `ThemeToggle`
precisa de um ponto de entrada de Client Components para preferências e armazenamento local.

```text
Navegador → Next.js App Router
             ├── Páginas e layouts no servidor
             ├── Conteúdo TypeScript local
             ├── ThemeToggle no cliente
             └── Metadata, sitemap, robots e imagem social
```

O conteúdo é pequeno e versionado junto ao código: não há necessidade de banco
ou CMS. O MVP não tem regras de negócio que justifiquem backend separado,
API própria ou Server Actions. CSS com tokens atende ao design sem biblioteca visual.

```text
.github/workflows/  Validação no GitHub Actions
docs/              Publicação e screenshots do portfólio
src/app/           Rotas, layout, CSS, SEO e imagem social
src/components/    Layout, UI, projetos e timeline
src/data/          Perfil e contatos
src/content/       Experiências, stack e projetos
src/lib/           Tema, projetos, origem pública e metadata
src/types/         Contratos do conteúdo
scripts/           Auditoria HTTP
tests/             Regressões de tema, SEO e timeline
```

As dependências de desenvolvimento são ESLint, configuração Next.js, TypeScript
e definições de tipos. ESLint 9 permanece por compatibilidade com os plugins
instalados; revisar essa restrição antes de atualizar a versão principal.

## Rotas e manutenção dos dados

| Rota | Conteúdo |
| --- | --- |
| `/` | Apresentação, projetos, sobre, experiência, stack e contato |
| `/projetos/get-doc` | Case proprietário e escala confirmada |
| `/projetos/deixa-na-conta` | Case de cobranças e gargalo de UPDATEs no MySQL |
| `/curriculo` | Currículo HTML e PDF quando disponível |
| `/contato` | Canais profissionais confirmados |

Edite `src/data/profile.ts` para nome, cargo, resumo, formação e contatos.
Home, currículo, cabeçalho, rodapé, metadata e imagem social reutilizam o perfil.
Email, GitHub, LinkedIn, localização e disponibilidade são opcionais; campos
ausentes não geram links fictícios. Não há formulário ou serviço de envio no MVP.

As experiências ficam em `src/content/experience.ts`. Use datas `YYYY-MM`:
uma data em `endDate` representa um vínculo encerrado; `null` ou propriedade
omitida representa vínculo atual. A interface mostra “Atual” como texto comum,
mantendo `<time dateTime>` apenas nas datas reais. Home e currículo compartilham
a timeline. A lista usa `readonly Experience[]`, inclusive quando todos os
vínculos não têm data de término.

A formação técnica é opcional, em `profile.technicalEducation`. O início do
curso em 2019 foi confirmado por Matheus e aparece na Home e no currículo,
sem presumir conclusão. `professionalSince` é independente da formação:
permanece em 2023 conforme o perfil editado, embora a timeline comece em 2022;
essa diferença ainda precisa de confirmação.

O download do currículo só aparece quando `public/documents/cv.pdf` existe
no build. Adicione o PDF final nesse caminho e gere outro build para habilitá-lo.
Os projetos em `src/content/projects.ts` compartilham um template;
slugs desconhecidos retornam 404.

GET DOC mantém o aviso de código proprietário. A stack do Deixa na Conta foi
atualizada por Matheus em `src/content/projects.ts`. A stack geral do perfil não deve ser atribuída
automaticamente aos projetos. Imagens só devem ser incluídas com divulgação
autorizada, dimensões e legendas; as capas atuais são tipográficas.

## SEO e configuração

Copie `.env.example` para `.env.local` e configure `SITE_URL` com a origem HTTPS
definitiva, sem caminho, query, fragmento ou credenciais. No deploy, configure
essa variável antes do build. Não publique `.env.local`.

Sem `SITE_URL`, o site usa `noindex`, robots com `Disallow: /` e sitemap vazio.
Com uma origem válida em produção, as cinco páginas ganham URLs canônicas,
imagem de compartilhamento e entradas no sitemap. Desenvolvimento e previews
da Vercel permanecem não indexáveis. Alterar a URL exige um novo build.
Valor inválido interrompe o build. O favicon é `/icon.svg`; `/og` gera o PNG social.

## Validações e limites

Lint, typecheck, 13 testes, build e auditoria HTTP passaram localmente após as
alterações de perfil e formação. O HTML da Home e do currículo foi conferido
com o curso iniciado em 2019, o vínculo atual e somente datas reais em `time`.
O workflow teve a sintaxe YAML validada; ainda não houve execução no GitHub.

O layout foi medido no Chrome em 320, 375, 425, 768, 1024, 1440 e 1920px:
cinco páginas × sete larguras × dois temas, sem transbordamento horizontal.
Capturas desktop/mobile foram inspecionadas. Há foco visível, link para pular ao
conteúdo, controles nativos com altura mínima de 44px e movimento reduzido.
Contrastes calculados dos textos verificados são ≥ 4,5:1.

A auditoria HTTP verifica páginas, links internos, âncoras, títulos, semântica
básica, 404, recursos SEO e CSS compilado. Rejeita BOM no CSS para prevenir a
regressão que desativava os tokens de layout; `.editorconfig` define UTF-8 sem BOM.
Os testes cobrem temas, SEO e renderização de experiências atuais e encerradas.

A navegação por Tab foi verificada no Chrome em cinco páginas, a 320 e 1440px,
incluindo ordem, foco visível, nomes acessíveis, link de pular conteúdo e
controles nativos. Os três temas foram acionados pelo teclado, com persistência
entre páginas, resposta ao tema do sistema e movimento reduzido.

Na medição local de 19/09/2026, após a revisão final, o Lighthouse 12.8.2 registrou
98 em performance e 100 em acessibilidade, boas práticas e SEO, com LCP de 2,23s,
CLS 0 e TBT de 106ms. Esses resultados são de laboratório, não dados de visitantes.
Não foi medido INP. Refluxo foi testado por emulação de viewport equivalente a
200% e 400%; isso não substitui zoom real ou avaliação humana com leitor de tela.
O tema salvo foi conferido no DOMContentLoaded, sem uma análise visual quadro a
quadro do primeiro carregamento. O site publicado ainda precisa ser validado.

## Pendências para publicação

- Adicionar o currículo PDF final.
- Confirmar o ano inicial da experiência profissional e a instituição/conclusão do curso técnico.
- Confirmar atribuições profissionais, status, arquiteturas, stack divulgável e imagens dos cases.
- Detalhar a investigação e a correção dos UPDATEs sem inventar métricas.
- Executar o CI remoto e validar o primeiro deploy; Vercel e `SITE_URL` já estão configurados.
- Adicionar o link público ao README e fixar o repositório no perfil quando apropriado.

O próximo passo continua sendo concluir o Milestone 7. Melhorias opcionais como
analytics, formulário, CMS ou backend ficam para depois da publicação.
