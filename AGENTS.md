# Diretrizes do portfólio

- Leia `plans.md` inteiro antes de alterar código. É a fonte de verdade do projeto.
- Confira o progresso no `README.md` e inspecione o repositório antes de editar.
- Para toda tarefa (correção, melhoria, funcionalidade ou documentação), crie ou reutilize uma issue no GitHub antes de implementar; siga o fluxo obrigatório da seção 0.1 de `plans.md`.
- Trabalhe em branch e entregue por PR com `Closes #N` ou `Refs #N` na descrição. Não faça push direto na `main`, merge ou deploy de produção sem autorização explícita para publicar a revisão.
- Para motion, siga a seção 24.1 de `plans.md`: analise o ganho, prefira estático/CSS e limite GSAP ao componente que precisa dele.
- Implemente somente o próximo milestone pendente; valide e pare antes do seguinte.
- Preserve alterações existentes e mantenha a aplicação executável.
- Prefira Server Components, TypeScript strict e dependências justificadas.
- Não invente conteúdo profissional, métricas, tecnologias ou links. Use TODOs.
- Não crie backend separado, banco, CMS ou Server Actions artificiais no MVP.
- Ao concluir, execute lint, typecheck, testes existentes e build quando aplicável.
- Informe arquivos alterados, validações, pendências e o próximo milestone.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
