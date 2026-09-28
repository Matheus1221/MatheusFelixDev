# Relatório de animações GSAP

Portfólio de Matheus Felix | Revisão de 27/09/2026 | Milestone 8

## 1. Resultado e critério de escolha

O portfólio recebeu entradas pontuais no Hero, projetos, apresentação pessoal, experiência, categorias da stack e contato. O refinamento com SplitText concentra o tratamento de texto no título inicial e nas marcas decorativas das capas dos projetos. A leitura, as ações e o conteúdo renderizado no servidor continuam disponíveis imediatamente.

Foram consultados os catálogos oficiais SplitText e Explore/All Demos e examinados exemplos específicos de restauração do texto, divisão responsiva por linhas, máscaras e coordenação de interface. Isso forneceu repertório para adaptar poucos padrões ao projeto. Não houve implementação de todos os efeitos do catálogo nem inspeção individual de todos os demos existentes.

A análise priorizou hierarquia visual, naturalidade e custo. O Hero usa uma sequência curta para coordenar título e descrição. Nos projetos, uma Timeline reúne entrada do card, revelação da marca e desenho da linha. ScrollTrigger é utilizado somente nos blocos selecionados que entram na viewport. Interações simples de hover e foco continuam em CSS.

Header, footer, navegação, botões, textos dos cases e página de currículo permanecem estáticos em relação a GSAP. Não foram adicionados caracteres girando, texto contínuo, parallax, cursores especiais, botões magnéticos, pin, scrub, scroll hijacking ou novas bibliotecas para efeitos.

O trabalho está vinculado à [issue #6](https://github.com/Matheus1221/MatheusFelixDev/issues/6) e ao [PR #4](https://github.com/Matheus1221/MatheusFelixDev/pull/4), que também reúne as issues #1, #2, #3 e #5. Este relatório descreve a implementação validada localmente; o resultado remoto de CI e o preview da revisão são registrados no PR. A publicação em produção depende de revisão e autorização para merge.

## 2. Inventário e parâmetros

Os valores abaixo são os limites configurados. A duração efetiva de um texto com uma única linha pode ser menor que o máximo com stagger. O breakpoint usado no código é `max-width: 48rem`. O easing das animações é `power3.out`.

| Elemento | Desktop | Mobile |
| --- | --- | --- |
| Título do Hero | Linhas de `y: 20` para 0; 0,55 s; stagger total de até 0,10 s | `y: 8`; 0,35 s; stagger total de até 0,04 s |
| Descrição do Hero | `y: 12`; 0,45 s; início em 0,12 s | `y: 6`; 0,30 s; início em 0,06 s |
| Card de projeto | Bloco completo de `y: 24` para 0; 0,60 s | `y: 10`; 0,40 s |
| Marca decorativa da capa | Linhas de `yPercent: 100` para 0 dentro de máscara; 0,55 s; stagger total de até 0,10 s; início em 0,06 s | `yPercent: 30`; 0,30 s; stagger total de até 0,04 s; início em 0,04 s |
| Linha decorativa da capa | `scaleX: 0` para 1, origem à esquerda; 0,45 s; início em 0,10 s | Mesmo efeito; 0,30 s; início em 0,08 s |
| Bloco sobre mim | `y: 18`; 0,60 s | `y: 10`; 0,40 s |
| Experiência na Home | Cada emprego como bloco: `y: 18`; 0,60 s | Cada emprego como bloco: `y: 10`; 0,40 s |
| Categorias da stack | `y: 16`; 0,60 s; stagger total de 0,18 s | Bloco único: `y: 10`; 0,40 s |
| CTA final e página de contato | Bloco principal: `y: 18`; 0,60 s | `y: 10`; 0,40 s |

A sequência completa do Hero dura no máximo 0,65 s no desktop e 0,39 s no mobile. A dos projetos termina em até 0,71 s e 0,40 s, respectivamente. A stack tem orçamento total de 0,78 s no desktop, independentemente da quantidade de categorias, pois usa `stagger.amount` em vez de atraso fixo por item.

O deslocamento percentual da marca é uma exceção restrita ao texto decorativo recortado pela máscara. Ele não move o projeto pela tela nem oculta seu título semântico, que permanece visível no conteúdo do card. O restante dos blocos tem deslocamento de até 24 px no desktop e 10 px no mobile.

Todas as entradas por scroll usam `start: "top 85%"` e `once: true`. Com os dados atuais, há no máximo nove ScrollTriggers na Home: dois projetos, um bloco sobre mim, quatro experiências, uma stack e um CTA. A página de contato tem um. SplitText reutiliza a Timeline do respectivo projeto; não acrescenta outro trigger por linha ou caractere.

## 3. Arquitetura e ciclo de vida

As páginas e os componentes de conteúdo mantêm a arquitetura existente de Server Components. `HeroMotion` e `ScrollReveal` são limites locais de animação que recebem os filhos já renderizados. Apenas esses componentes precisam de `"use client"` para controlar o movimento. Não foi criado um controlador global nem foram alterados os dados profissionais, a estrutura de rotas, a tipografia, as cores ou os espaçamentos para acomodar os efeitos.

| Arquivo | Responsabilidade |
| --- | --- |
| `src/components/hero-motion.tsx` | Divide o título por linhas, coordena sua entrada com a descrição e restaura o DOM original ao terminar. |
| `src/components/scroll-reveal.tsx` | Mantém as variantes block, project, timeline e stagger; controla disparos locais, máscara das capas, preferências e cleanup. |
| `src/app/globals.css` | Dá `display: block` apenas aos spans temporários de linhas e máscaras, para transformações e recorte funcionarem corretamente. |
| `src/app/page.tsx`, `src/components/project/project-card.tsx` e `src/app/contato/page.tsx` | Mantêm os pontos de integração dos blocos animados já existentes na ampliação anterior. |
| `plans.md`, `README.md` e `docs/animations.md` | Registram decisões, limites, progresso e manutenção. |

Em cada montagem, `useGSAP` limita os seletores ao container. `gsap.matchMedia` só habilita movimento em tela e quando o usuário não solicita movimento reduzido. O Hero não inicia uma introdução ao restaurar uma página já rolada.

SplitText utiliza `type: "lines"`, `autoSplit: true` e `onSplit`. A callback devolve a Timeline para que o plugin acompanhe mudanças de largura e carregamento de fontes durante a animação. Não são criadas divisões por palavra ou caractere. Ao terminar, `revert()` remove spans temporários e restaura o texto original. O CSS auxiliar afeta somente essas classes temporárias.

No Hero, as linhas e a descrição são coordenadas por uma Timeline com a label `title`. No projeto, a Timeline usa as labels `enter` e `cover` para coordenar bloco, marca e linha. Para sobre, experiência e contato, a mesma fronteira local executa apenas a entrada do bloco, sem efeitos em cada campo.

Os blocos abaixo da viewport não recebem transformação antecipada: as entradas por scroll usam `immediateRender: false`. Um `WeakSet` registra os blocos já apresentados; eles não repetem a entrada ao trocar tema, voltar no scroll ou alterar o breakpoint. A rolagem rápida que ultrapassa um bloco conclui sua animação.

Quando um `details` de projeto é aberto ou fechado, o listener local solicita `ScrollTrigger.refresh()`, atualizando a posição dos disparos abaixo dele. Na desmontagem, esse listener é removido e `media.revert()` desfaz o contexto. `useGSAP` também trata a reversão no ciclo de vida do React e quando a variante muda. Os projetos removem a divisão temporária após completar a entrada; por isso, o número de triggers vivos pode diminuir durante a navegação.

## 4. Acessibilidade, responsividade e desempenho

O conteúdo essencial não depende de opacity, autoAlpha ou visibility para aparecer. Sem JavaScript, com scripts bloqueados ou com movimento reduzido, os textos e links continuam disponíveis em HTML. O Hero não usa máscara: seu título permanece legível durante todo o movimento.

No título do Hero, `aria: "auto"` mantém o nome acessível do texto enquanto as linhas temporárias existem. Ao concluir, a restauração remove os atributos e wrappers transitórios. As capas dos projetos já são decorativas e possuem `aria-hidden="true"`; nelas, SplitText usa `aria: "none"`. O título semântico do projeto continua fora da máscara. Isso foi verificado no DOM; não equivale a uma auditoria completa com leitores de tela.

No mobile, os deslocamentos, durações e stagger são reduzidos; a stack entra como um bloco. Alterar a preferência de movimento durante uma animação reverte os efeitos. A impressão também apresenta conteúdo estático. Hover, foco, sublinhados e interações de navegação permanecem sob responsabilidade do CSS existente.

As animações usam transformações: `y`, `yPercent` e `scaleX`. Não há animação contínua de width, height, top ou left, nem criação de tweens em eventos frequentes de mouse. SplitText e ScrollTrigger pertencem ao pacote GSAP já instalado; este refinamento não adiciona outra dependência ao aplicativo.

A auditoria HTTP do build identificou 10 recursos JavaScript únicos, somando aproximadamente 699,5 KiB sem compressão e 226,3 KiB com gzip estimado, considerando as cinco rotas verificadas. A revisão anterior estimava 223,1 KiB gzip: a diferença aproximada é 3,2 KiB. Esses valores agregam recursos entre páginas, não representam o download inicial de uma visita e não medem Core Web Vitals. Não foram medidos LCP, INP ou desempenho em aparelhos físicos de baixo desempenho nesta revisão.

## 5. Validação realizada

| Verificação | Resultado e alcance |
| --- | --- |
| Lint e TypeScript | Aprovados; sem erros ou avisos do lint. |
| Testes existentes | 13 testes aprovados. |
| Build de produção | Compilação concluída. |
| Auditoria HTTP | Cinco rotas verificadas, metadados, landmarks, headings, labels e imagem social 1200 x 630. |
| Larguras de tela | 320, 375, 768, 1024, 1440 e 1920 px verificadas para SplitText, geometria e restauração. |
| Conteúdo de contingência | Chrome em 375 e 1440 px com movimento reduzido, JavaScript desativado e scripts bloqueados: conteúdo disponível e sem overflow horizontal. |
| Execução do movimento | Transformações das linhas, recorte das máscaras e linha decorativa observados; estilos temporários removidos ao concluir. |
| Mudanças durante a entrada | Fontes atrasadas, resize do Hero, preferência de movimento alterada e desmontagem testados. |
| Navegação e estado | Details, teclado, âncoras, rolagem rápida, impressão, troca de tema e três ciclos Home/contato sem erros de execução. |
| Currículo | Conferência adicional nas larguras 320, 768, 1024 e 1920 px com movimento reduzido; timeline permanece estática. |

A geometria do título e das marcas foi comparada durante a divisão e após a restauração, com as fontes prontas. Nas larguras verificadas e com o conteúdo atual, não houve alteração nas dimensões finais nem overflow horizontal. Os spans temporários usam caixas de bloco para que os transforms realmente produzam movimento.

As verificações de navegador foram executadas pontualmente em Chrome/Chromium no Windows, com viewports emuladas, sem adicionar Playwright às dependências do repositório. Não cobrem todos os dispositivos, Safari, Firefox, leitores de tela reais ou toda alteração futura de conteúdo. A revisão visual do preview pelo responsável pelo portfólio continua sendo a etapa anterior à integração.

## 6. Referências, manutenção e entrega

### Referências adaptadas

- [Catálogo SplitText](https://demos.gsap.com/plugin/splittext/): seleção dos exemplos de tratamento de texto.
- [Explore / All Demos](https://demos.gsap.com/explore/): comparação do repertório com o nível de movimento adequado ao portfólio.
- [Revert after animation](https://demos.gsap.com/demo/revert-after-animation): restauração do DOM após a entrada.
- [Responsive line splits on scroll](https://demos.gsap.com/demo/responsive-line-splits-on-scroll): divisão por linhas, autoSplit e coordenação com scroll.
- [Text masking](https://demos.gsap.com/demo/text-masking): recorte aplicado somente à marca decorativa dos projetos.
- [Orchestrated easeReverse](https://demos.gsap.com/demo/orchestrated-easereverse): referência consultada de coordenação de interface; o recurso easeReverse não foi aplicado.
- [Documentação oficial SplitText](https://gsap.com/docs/v3/Plugins/SplitText/): onSplit, acessibilidade, autoSplit e revert.

Foram utilizadas as instruções oficiais de seis skills do repositório GSAP, na revisão `aed9cfd3277740755f6bfc1155c7aa645403b760`: [gsap-core](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-core/SKILL.md), [gsap-timeline](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-timeline/SKILL.md), [gsap-scrolltrigger](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-scrolltrigger/SKILL.md), [gsap-react](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-react/SKILL.md), [gsap-plugins](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-plugins/SKILL.md) e [gsap-performance](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-performance/SKILL.md). Elas orientaram scope, cleanup, matchMedia, timelines, divisão responsiva e propriedades de animação. A consulta não instalou skills globalmente nem modificou a stack do aplicativo.

### Manutenção recomendada

Ao mudar o texto do Hero ou das capas, conferir quebras de linha e restauração em telas estreitas e largas. Manter links, botões e conteúdo interativo fora dos alvos de SplitText: o tratamento atual foi validado para os títulos simples existentes. Se o markup ficar mais complexo, a acessibilidade precisa ser reavaliada.

Ao acrescentar projetos ou experiências, revisar a quantidade de ScrollTriggers e confirmar que o movimento ainda agrega valor. O orçamento de stagger da stack permanece constante; não precisa aumentar proporcionalmente à quantidade de categorias. Evitar incluir automaticamente uma animação em toda nova seção.

Para ajustar intensidade, editar os valores locais de `HeroMotion` e das variantes de `ScrollReveal`. Preservar as condições de movimento reduzido, o retorno da Timeline em onSplit, a restauração do DOM e o cleanup. Manter os estilos de layout separados das classes temporárias de SplitText.

O fluxo obrigatório continua sendo issue, branch, PR com `Closes #N` ou `Refs #N`, validação e revisão. O arquivo `plans.md` é a fonte de verdade. Este trabalho conclui a implementação e documentação do milestone 8 para revisão; não inicia outro milestone. O próximo passo é revisar o preview do PR #4 e, quando desejado, autorizar sua integração à main para publicar a revisão.
