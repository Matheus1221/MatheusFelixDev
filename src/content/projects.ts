import type { Project } from "@/types/portfolio";

export const projects = [
  {
    slug: "get-doc",
    title: "GET DOC",
    shortDescription:
      "Sistema de registro e tabulação de atendimentos utilizado em contexto profissional real.",
    role: "Participação em frontend, backend, dados e deploy.",
    featured: true,
    // TODO: confirmar informação com Matheus. Tecnologias divulgáveis do GET DOC.
    technologies: [],
    highlights: [
      "90 atendentes",
      "Mais de 3.000 atendimentos registrados diariamente",
    ],
    proprietary: true,
    confidentialityNotice:
      "Projeto proprietário. O código não está disponível publicamente por política da empresa.",
    caseStudy: {
      context: ["Sistema de registro e tabulação de atendimentos utilizado em contexto profissional real."],
      problem: ["Registrar e tabular os atendimentos de uma operação com 90 atendentes e mais de 3.000 atendimentos registrados diariamente."],
      solution: [
        "O GET DOC permite registrar e tabular os atendimentos dessa operação.",
        // TODO: confirmar informação com Matheus. Fluxos e decisões técnicas divulgáveis.
      ],
      participation: ["Participei do desenvolvimento da solução de ponta a ponta, atuando desde a modelagem dos dados até o desenvolvimento do frontend, backend e processo de deploy."],
      metrics: [
        { value: "90", label: "atendentes" },
        { value: "3.000+", label: "atendimentos registrados diariamente" },
      ],
    },
  },
  {
    slug: "deixa-na-conta",
    title: "Deixa na Conta",
    shortDescription: "Aplicação para controle de cobranças e pagamentos.",
    role: "Participação da modelagem ao deploy.",
    featured: true,
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Auth0"],
    highlights: [
      "Implementação da autenticação e controle de acesso com Auth0.",
      "Desenvolvimento e evolução da área de configurações de conta e perfil.",
      "Implementação do fluxo de criação de assinaturas.",
      "Criação de funcionalidades de compartilhamento de cobranças com clientes.",
      "Refatoração de fluxos para separar interface, regras de negócio, actions e acesso aos dados.",
      "Atualização e manutenção da aplicação em Next.js.",
    ],
    caseStudy: {
      context: ["Aplicação para controle de cobranças e pagamentos, com participação da modelagem ao deploy."],
      problem: ["Controlar cobranças e pagamentos. Durante o desenvolvimento, também foi identificado um gargalo em operações UPDATE no MySQL."],
      solution: [
        "A aplicação foi estruturada para centralizar autenticação, gerenciamento de conta, clientes, assinaturas e compartilhamento de cobranças.",
        "Os fluxos foram desenvolvidos com separação entre interface, regras de negócio, acesso aos dados e operações executadas no servidor.",
        "Durante a evolução do projeto, também foram adicionadas validações, tratamento de operações assíncronas e feedbacks para tornar os fluxos mais consistentes para o usuário.",
      ],
      participation: ["Participei da construção da aplicação da modelagem ao deploy, incluindo a identificação e correção de um gargalo envolvendo operações UPDATE mal otimizadas no MySQL."],
      performance: {
        problem: "Gargalo relacionado a operações UPDATE mal otimizadas no MySQL.",
        investigation: "TODO: confirmar informação com Matheus. Como o gargalo foi identificado e investigado.",
        correction: "TODO: confirmar informação com Matheus. Como a consulta ou operação foi corrigida.",
        result: "O gargalo foi corrigido. TODO: confirmar informação com Matheus. Evidências da validação e resultados mensurados, se existirem.",
      },
    },
    // images:[assets]
  },
] satisfies readonly Project[];

// TODO: confirmar informação com Matheus. Arquiteturas reais e imagens permitidas.
