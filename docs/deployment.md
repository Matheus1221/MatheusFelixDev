matheus do nascimento felix2# Publicação

O projeto está vinculado à Vercel, no workspace **MatheusDev** (`matheus-dev11`),
plano **Hobby**, com o nome **matheus-felix-portfolio**. O repositório privado
`Matheus1221/MatheusFelixDev` foi conectado sem alterar sua visibilidade.
A URL pública é [matheus-felix-portfolio.vercel.app](https://matheus-felix-portfolio.vercel.app).
O primeiro deploy está **Ready** e o CI passou no commit `2a6e057` em 19/09/2026.

## Preparar o repositório

O remoto atual é `Matheus1221/MatheusFelixDev`, com branch principal `main`.
Os arquivos do projeto, incluindo `package-lock.json`, o workflow de CI
e as capturas em `docs/screenshots/`, estão versionados. Não envie `.env.local`, `.next/` ou
`node_modules/`; esses caminhos estão no `.gitignore`.

O repositório foi encontrado como privado. A hospedagem pode receber acesso
ao repositório privado sem alterar sua visibilidade. Torná-lo público para
apresentação profissional é uma decisão separada.

Confirme uma execução verde do workflow **CI** na revisão que será publicada.
Ele testa o build local e não publica automaticamente.

## Vercel

A Vercel oferece integração com Next.js sem arquivo de configuração adicional.
Referência: [Next.js na Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

Configuração já aplicada:

| Opção | Valor |
| --- | --- |
| Framework e raiz | Next.js, `.` |
| Node.js | `22.x` |
| Instalação | `npm ci` |
| Build | `npm run build` |
| Saída | Padrão do Next.js |
| `SITE_URL` em Production | `https://matheus-felix-portfolio.vercel.app` |

Após validar as alterações, envie um commit para `main` e acompanhe o deploy
na Vercel e o workflow CI no GitHub. A integração da Vercel publica os pushes;
o workflow de CI somente valida. Confira ambos na revisão enviada.

Não é necessário comprar um domínio. Se futuramente vincular um domínio
próprio, siga os registros DNS indicados pela Vercel, atualize `SITE_URL` e
refaça o build. Mantenha o plano Hobby; nenhum recurso pago foi configurado.

Não substitua a URL definitiva por URLs temporárias de previews. O código
reconhece `VERCEL_ENV=preview` e mantém os previews não indexáveis. Em outra
plataforma, configure uma política equivalente para seus ambientes de preview.

## Hospedagem Node.js equivalente

Use Node.js compatível com `package.json` e execute:

```sh
npm ci
npm run build
npm start
```

Defina `SITE_URL` antes do build. O provedor deve oferecer HTTPS e encaminhar
tráfego para a porta do servidor Next.js. O build precisa de acesso ao Google
Fonts. Não use GitHub Pages diretamente: este projeto mantém o modo Next.js
padrão, sem configuração de exportação estática.

## Conferir o site publicado

Ao atualizar o site, abra a URL real e verifique:

- Home, currículo, contato e os dois cases, incluindo recarregamento direto de cada rota.
- Um slug de projeto inexistente retornando 404.
- Links, âncoras, seletor de tema, navegação por teclado e layout no celular.
- Email, GitHub, LinkedIn e PDF, quando os dados finais estiverem disponíveis.
- Metadata e URLs canônicas apontando para a origem escolhida.
- `/robots.txt` permitindo indexação em produção e anunciando `/sitemap.xml`.
- `/sitemap.xml` contendo as cinco páginas com a origem correta.
- `/icon.svg` e `/og` abrindo normalmente.

Execute a auditoria HTTP pública com a origem HTTPS e a opção explícita:

```sh
node scripts/audit-site.mjs https://matheus-felix-portfolio.vercel.app --remote
```

Ela também verifica canônicas, indexação e as cinco URLs do sitemap.
Registre a revisão efetivamente publicada. Meça também performance e
acessibilidade no navegador; não deduza Core Web Vitals do build.

Na primeira publicação, a auditoria HTTP passou para as cinco páginas e todos
os recursos listados. O Chrome também verificou teclado, foco, temas e refluxo
nas cinco páginas de produção. O resultado do CI está nesta
[execução](https://github.com/Matheus1221/MatheusFelixDev/actions/runs/35479899825).

A URL já está no README. O campo Website, os topics e a apresentação pública
do repositório podem ser preenchidos no GitHub quando ele for usado como
material público. Fixá-lo no perfil depende dessa decisão de visibilidade.
